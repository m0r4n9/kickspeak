const {
    Brand,
    Product,
    Size,
    Image,
    UserFavoriteProduct,
} = require('../models/models');
const {
    typeOrder,
    colorsFilter,
    priceFilter,
    sexFilter,
} = require('../utils/productsQueryFilter');
const { Op, fn, col, Sequelize } = require('sequelize');

class ProductService {
    async getProducts(page, limit, order, colors, price, sex) {
        // Сортиврока по полям
        const orderType = typeOrder(order);
        // Фильтрация по цвету
        const colorsType = colorsFilter(colors);
        // Фильтрация по цене
        const priceType = priceFilter(price);
        // Фильтрация по полу
        const sexType = sexFilter(sex);

        const products = await Product.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            order: [orderType],
            where: {
                ...colorsType,
                ...priceType,
                ...sexType,
            },
            include: [
                {
                    model: Brand,
                    attributes: ['id', 'name'],
                },
                {
                    model: Size,
                    where: {
                        quantity: {
                            [Op.ne]: 0,
                        },
                    },
                    required: false,
                    order: [['id', 'ASC']],
                },
                {
                    model: Image,
                    limit: 1,
                    order: [['id', 'ASC']],
                },
                {
                    model: UserFavoriteProduct,
                    where: {
                        UserId: 1,
                    },

                    required: false,
                },
            ],
            attributes: {
                exclude: ['BrandId', 'code', 'UserFavoriteProductUserId'],
            },
        });

        const amount = await Product.count({
            where: {
                ...colorsType,
                ...priceType,
                ...sexType,
            },
        });
        const hasMore = page * limit < amount;
        const maxPriceDB = await Product.max('price', {
            where: {
                ...colorsType,
                ...priceType,
                ...sexType,
            },
        });
        const minPriceDB = await Product.min('price', {
            where: {
                ...colorsType,
                ...priceType,
                ...sexType,
            },
        });

        return { products, hasMore, maxPriceDB, minPriceDB };
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
        const favoriteProducts = Product.findAll({
            include: [
                {
                    model: UserFavoriteProduct,
                    where: {
                        UserId,
                    },
                },
                {
                    model: Image,
                    limit: 1,
                    order: [['id', 'ASC']],
                },
            ],
        });
        return favoriteProducts;
    }

    async addToWishList(UserId, ProductId) {
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
}

module.exports = new ProductService();
