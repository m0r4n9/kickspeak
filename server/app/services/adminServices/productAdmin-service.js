const { Op } = require('sequelize');
const { Brand, Product, Size, Image } = require('../../models/product');
const ApiError = require('../../exceptions/api-error');

class ProductAdminService {
    async getProducts(limit, page) {
        const products = await Product.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ['id', 'name', 'code', 'price'],
        });

        const amount = await Product.count();

        const hasMore = page * limit < amount;

        return {products, hasMore, page};
    }

    async getProductDetails(id) {
        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Brand,
                    attributes: ['id', 'name'],
                },
                {
                    model: Image,
                },
                {
                    model: Size
                }
            ],
            attributes: {
                exclude: ['BrandId'],
            },
        });
        return product;
    }

    async updateProduct(id, data) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw ApiError.BadRequest('Продукт не найден');
        }

        const updatedProduct = await product.update(data);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw ApiError.BadRequest('Продукт не найден');
        }
        await product.destroy();
        return product;
    }

    async createProduct(data) {
        if (!data || !data.BrandId) {
            throw ApiError.BadRequest('Данные пусты');
        }

        const product = await Product.build(data);
        await product.save();
        return product;
    }
}

module.exports = new ProductAdminService();
