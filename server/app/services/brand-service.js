const { Brand, Product, Size, Image } = require('../models/models');
const { Op, literal } = require('sequelize');
const {
    typeOrder,
    colorsFilter,
    priceFilter,
    sexFilter,
} = require('../utils/productsQueryFilter');

class BrandService {
    async getBrands() {
        const brands = await Brand.findAll({
            include: [
                {
                    model: Product,
                    attributes: ['id'],
                },
            ],
            attributes: {
                include: [
                    [
                        literal(
                            'CASE WHEN "Products"."id" IS NOT NULL THEN true ELSE false END',
                        ),
                        'hasProducts',
                    ],
                ],
                exclude: ['foundation', 'country', 'logo', 'data'],
            },
        });

        return brands;
    }

    async getBrandDetails(brandId, page, limit, order, colors, price, sex) {
        const orderType = typeOrder(order);
        // Фильтрация по цвету
        const colorsType = colorsFilter(colors);
        // Фильтрация по цене
        const priceType = priceFilter(price);
        // Фильтрация по полу
        const sexType = sexFilter(sex);

        const brand = await Brand.findByPk(brandId);

        const products = await Product.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            order: [orderType],
            where: {
                BrandId: brandId,
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
            ],
            attributes: {
                exclude: ['BrandId', 'code'],
            },
        });

        const amount = await Product.count({
            where: {
                BrandId: brandId,
                ...colorsType,
                ...priceType,
                ...sexType,
            },
        });

        const totalPage = Math.ceil(amount / limit);

        return { brandDetails: brand, products: products, totalPage };
    }

    async createBrand(name, foundation, country, filePath, buffer) {
        const brand = await Brand.create({
            name,
            foundation,
            country,
            logo: filePath,
            data: buffer,
        });
        return brand;
    }
}

module.exports = new BrandService();
