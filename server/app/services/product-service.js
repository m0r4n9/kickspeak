const {
    Brand,
    Product,
    Size,
    Image,
    UserFavoriteProduct,
    Color,
} = require('../models/models');
const {
    typeOrder,
    colorsFilter,
    priceFilter,
    sexFilter,
    brandsFilter,
    sizesFilter,
} = require('../utils/productsQueryFilter');
const { Op, fn, col, literal, cast, Sequelize } = require('sequelize');
const ApiError = require('../exceptions/api-error');

class ProductService {
    async getProducts(page, limit, order, colors, price, sex, brands, sizes) {
        // Сортиврока по полям
        const orderType = typeOrder(order);
        // Фильтрация по цвету
        const filterColors = colorsFilter(colors);
        // Фильтрация по бренду
        const filterBrands = brandsFilter(brands);
        const filterSizes = sizesFilter(sizes);
        // Фильтрация по цене
        const priceType = priceFilter(price);
        // Фильтрация по полу
        const sexType = sexFilter(sex);

        const products = await Product.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            order: [orderType, [Size, 'name', 'ASC']],
            where: {
                ...priceType,
                ...sexType,
            },
            include: [
                {
                    model: Brand,
                    ...filterBrands,
                    attributes: ['id', 'name'],
                },
                ...filterSizes,
                {
                    model: Color,
                    ...filterColors,
                },
                {
                    model: Image,
                    limit: 1,
                    order: [['id', 'ASC']],
                },
            ],
            attributes: {
                exclude: ['BrandId', 'code'],
            },
        });

        const amount = await Product.count({
            where: {
                ...priceType,
                ...sexType,
            },
            include: [
                {
                    model: Color,
                    ...filterColors,
                },
            ],
        });

        const totalPage = Math.ceil(amount / limit);
        const maxPriceDB = await Product.max('price', {
            where: {
                ...priceType,
                ...sexType,
            },
        });
        const minPriceDB = await Product.min('price', {
            where: {
                ...priceType,
                ...sexType,
            },
        });

        return {
            products,
            totalPage,
            maxPriceDB,
            minPriceDB,
        };
    }

    async searchColors(query) {
        if (!query || !query.length) return await Color.findAll();

        return await Color.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`,
                },
            },
        });
    }

    async searchBrands(query) {
        if (!query || !query.length)
            return await Brand.findAll({
                attributes: ['id', 'name'],
            });

        return await Brand.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`,
                },
            },
            attributes: ['id', 'name'],
        });
    }

    async searchSizes(query) {
        if (!query || !query.length) {
            return await Size.findAll({
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],
                ],
                order: [['name', 'ASC']],
            });
        }

        return await Size.findAll({
            where: Sequelize.where(
                Sequelize.cast(Sequelize.col('name'), 'varchar'),
                { [Op.iLike]: `%${query}%` },
            ),
            order: [['name', 'ASC']],
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],
                // 'id',
            ],
        });
    }

    async getProductDetails(id, idRecentProducts) {
        const product = await Product.findByPk(id, {
            include: [
                { model: Image },
                { model: Brand },
                {
                    model: Size,
                    required: false,
                    where: {
                        quantity: {
                            [Op.ne]: 0,
                        },
                    },
                },
            ],
        });

        const additionalProducts = await Product.findAll({
            where: {
                // id: {[Op.ne]: product.id},
                name: product.name,
            },
            attributes: {
                exclude: ['BrandId', 'colors', 'price', 'code'],
            },
            include: [
                {
                    model: Image,
                    limit: 1,
                    order: [['id', 'ASC']],
                },
            ],
        });

        let recentProducts = [];
        if (idRecentProducts.length) {
            recentProducts = await Product.findAll({
                where: {
                    id: idRecentProducts.split(',').slice(0, 4),
                },
                include: [
                    {
                        model: Image,
                        limit: 1,
                        order: [['id', 'ASC']],
                    },
                    {
                        model: Size,
                        required: false,
                        where: {
                            quantity: {
                                [Op.ne]: 0,
                            },
                        },
                    },
                ],
            });
        }

        return {
            product,
            additionalProducts: additionalProducts,
            recentProducts,
        };
    }

    async searchProducts(query) {
        if (!query.length) {
            return {
                brands: [],
                products: [],
            };
        }
        const products = await Product.findAll({
            attributes: {
                exclude: ['colors', 'code', 'sex', 'BrandId'],
            },
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            Sequelize.where(
                                fn('similarity', col('Product.name'), query),
                                {
                                    [Op.gt]: 0.1,
                                },
                            ),
                            {
                                name: {
                                    [Op.ne]: query,
                                },
                            },
                        ],
                    },
                    {
                        [Op.and]: [
                            Sequelize.where(
                                fn('similarity', col('Brand.name'), query),
                                {
                                    [Op.gt]: 0.1,
                                },
                            ),
                            {
                                name: {
                                    [Op.ne]: query,
                                },
                            },
                        ],
                    },
                ],
            },
            limit: 4,
            include: [
                {
                    model: Brand,
                    attributes: ['id', 'name'],
                },
                {
                    model: Image,
                    limit: 1,
                    order: [['id', 'ASC']],
                },
            ],
        });

        const brandsId = [];
        const brands = products.reduce((acc, product) => {
            if (!brandsId.includes(product.Brand.id)) {
                acc.push(product.Brand);
                brandsId.push(product.Brand.id);
                return acc;
            }
            return acc;
        }, []);

        return {
            brands: brands,
            products: products,
        };
    }

    async getWishList(UserId) {
        if (!UserId) throw ApiError.UnauthorizedError();

        const favoriteProducts = await UserFavoriteProduct.findAll({
            where: {
                UserId: 2,
            },
            attributes: [
                [literal('array_agg("ProductId")'), 'arrayProductIds'],
            ],
            raw: true,
        });

        const arrayProductsId = favoriteProducts[0]?.arrayProductIds ?? [];

        return Product.findAll({
            where: {
                id: arrayProductsId,
            },
            include: [
                {
                    model: Image,
                    limit: 1,
                    order: [['id', 'ASC']],
                },
            ],
        });
    }

    async addToWishList(UserId, ProductId) {
        if (!UserId) throw ApiError.UnauthorizedError();
        if (!ProductId) throw ApiError.BadRequest('Продукт не найден.');

        const existsWish = await UserFavoriteProduct.findOne({
            where: {
                UserId,
                ProductId,
            },
        });

        if (existsWish) {
            existsWish.destroy();
            return 'delete';
        }

        await UserFavoriteProduct.create({
            UserId,
            ProductId,
        });

        return 'add';
    }

    async test() {
        const result = await Product.findAll({
            include: [
                {
                    model: Color,
                    where: {
                        name: 'Красный',
                    },
                },
            ],
        });
        return result;
    }
}

module.exports = new ProductService();
