const ProductAdminService = require('../../services/adminServices/productAdmin-service');

class ProductAdminController {
    async getProducts(req, res, next) {
        try {
            const limit = req.query._limit ?? 10;
            const page = req.query._page || 1;

            console.log('limit', limit, ' page:', page);

            const products = await ProductAdminService.getProducts(limit, page);
            return res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getProductDetails(req, res, next) {
        try {
            const { id } = req.params;
            const productData = await ProductAdminService.getProductDetails(id);
            return res.json(productData);
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { name, price, code, sex, deletedImagesIds } = req.body;
            const images = req.files;
            const data = {
                name,
                price,
                code,
                sex,
            };
            const updatedProduct = await ProductAdminService.updateProduct(
                id,
                data,
                deletedImagesIds,
                images
            );
            return res.json(updatedProduct);
        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const deleteProduct = await ProductAdminService.deleteProduct(id);
            return res.json(deleteProduct);
        } catch (e) {
            next(e);
        }
    }

    // create
    async createProduct(req, res, next) {
        try {
            const { name, price, code, colors, sex, BrandId } = req.body;
            const data = {
                name,
                price,
                code,
                sex,
                colors: colors.split(','),
                BrandId,
            };
            const images = req.files;
            const createdProduct = await ProductAdminService.createProduct(
                data,
                images,
            );
            return res.json(createdProduct);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductAdminController();
