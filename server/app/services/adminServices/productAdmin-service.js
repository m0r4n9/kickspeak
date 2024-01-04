const fs = require('fs');
const path = require('path');
const { Brand, Product, Size, Image } = require('../../models/product');
const ApiError = require('../../exceptions/api-error');

class ProductAdminService {
    async getProducts(limit, page) {
        const products = await Product.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ['id', 'name', 'code', 'price'],
            order: [['id', 'DESC']],
        });

        const totalCount = await Product.count();

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
                },
            ],
            attributes: {
                exclude: ['BrandId'],
            },
        });
    }

    async updateProduct(id, data, deleteImagesIds, newImages) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw ApiError.BadRequest('Продукт не найден');
        }

        const updatedProduct = await product.update(data);

        if (deleteImagesIds) {
            if (Array.isArray(deleteImagesIds)) {
                for (let i = 0; i < deleteImagesIds.length; i++) {
                    const imageToDelete = await Image.findByPk(
                        deleteImagesIds[i],
                    );
                    if (imageToDelete) {
                        const serverRoot = path.join(__dirname, '../../../');
                        const imagePath = path.join(
                            serverRoot,
                            imageToDelete.url.replace(/^\//, ''),
                        );

                        console.log(imagePath);
                        if (fs.existsSync(imagePath)) {
                            fs.unlinkSync(imagePath);
                        } else {
                            console.log('Файл не найден:', imagePath);
                        }

                        await imageToDelete.destroy();
                    }
                }
            } else {
                const imageToDelete = await Image.findByPk(deleteImagesIds);
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
            }
        }

        for (const image of newImages) {
            await Image.create({
                url: `/${image.path}`,
                productId: id,
            });
        }

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
