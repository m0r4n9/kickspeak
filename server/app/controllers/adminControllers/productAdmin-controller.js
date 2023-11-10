const ProductAdminService = require('../../services/adminServices/productAdmin-service');

class ProductAdminController {
    async getProducts(req, res, next) {
        try {
            const limit = req.query._limit || 10;
            const page = req.query._page || 1;

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
            const { data } = req.body;
            const updatedProduct = await ProductAdminService.updateProduct(
                id,
                data,
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
            const { data } = req.body;
            const createdProduct =
                await ProductAdminService.createProduct(data);
            return res.json(createdProduct);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductAdminController();
