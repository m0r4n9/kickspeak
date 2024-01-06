const fs = require('fs');
const path = require('path');
const { Op, fn, col } = require('sequelize');
const { Brand, Product, Size, Image } = require('../../models/product');
const ApiError = require('../../exceptions/api-error');

class ProductAdminService {
    async getProducts(limit, page, query) {
        let queryProducts = query
            ? {
                  name: {
                      [Op.iLike]: `%${query}%`,
                  },
              }
            : {};

        const products = await Product.findAll({
            where: {
                ...queryProducts,
            },
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ['id', 'name', 'code', 'price'],
            order: [['id', 'DESC']],
        });

        const totalCount = await Product.count({
            where: {
                ...queryProducts,
            },
        });

        return { products, totalCount };
    }

    async getProductDetails(id) {
        return await Product.findByPk(id, {
            include: [
                {
                    model: Brand,
                    attributes: ['id', 'name'],
                },
                {
                    model: Image,
                },
                {
                    model: Size,
                    order: [
                        [fn('CAST', col('"Size"."name"'), 'DECIMAL'), 'ASC']
                    ]
                },
            ],
            attributes: {
                exclude: ['BrandId'],
            },
        });
    }

    async updateProduct(id, data, deleteImagesIds, newImages) {
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
                    model: Size,
                },
            ],
            attributes: {
                exclude: ['BrandId'],
            },
        });

        if (!product) {
            throw ApiError.BadRequest('Продукт не найден');
        }

        const deletePromises = (
            (deleteImagesIds instanceof Array
                ? deleteImagesIds
                : [deleteImagesIds]) || []
        ).map(async (imageId) => {
            const imageToDelete = await Image.findByPk(imageId);
            if (imageToDelete) {
                const serverRoot = path.join(__dirname, '../../../');
                const imagePath = path.join(
                    serverRoot,
                    imageToDelete.url.replace(/^\//, ''),
                );

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } else {
                    console.log('Файл не найден:', imagePath);
                }

                await imageToDelete.destroy();
            }
        });

        const createPromises = newImages.map(async (image) => {
            await Image.create({
                url: `/${image.path}`,
                productId: id,
            });
        });

        // Дождаться завершения всех асинхронных операций по добавлению
        await Promise.all([...deletePromises, ...createPromises]);

        await product.update(data);

        return await Product.findByPk(id, {
            include: [
                {
                    model: Brand,
                    attributes: ['id', 'name'],
                },
                {
                    model: Image,
                },
                {
                    model: Size,
                },
            ],
            attributes: {
                exclude: ['BrandId'],
            },
        });
    }

    async deleteProduct(id) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw ApiError.BadRequest('Продукт не найден');
        }
        await product.destroy();
        return product;
    }

    async createProduct(data, images) {
        if (!data || !data.BrandId) {
            throw ApiError.BadRequest('Данные пусты');
        }

        const product = await Product.create(data);
        const productId = product.id;

        for (const image of images) {
            await Image.create({
                url: `/${image.path}`,
                productId,
            });
        }

        return product;
    }
}

module.exports = new ProductAdminService();
