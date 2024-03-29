const ProductService = require('../services/product-service');

class ProductController {
    async uploadImage(req, res, next) {
        try {
            console.log(req.file);
            return res.json('Done!');
        } catch (e) {
            next(e);
        }
    }

    async getProducts(req, res, next) {
        try {
            const page = req.query._page || 1;
            const limit = req.query._limit || 10;
            const order = req.query._order;
            const colors = req.query._color;
            const price = req.query._price || '0,50000';
            const sex = req.query._sex;

            const products = await ProductService.getProducts(
                page,
                limit,
                order,
                colors,
                price,
                sex,
            );

            return res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getProductDetails(req, res, next) {
        try {
            const { id } = req.params;
            const idRecentProducts = req.query.recentProducts;
            const product = await ProductService.getProductDetails(
                id,
                idRecentProducts,
            );
            setTimeout(() => {
                return res.json(product);
            }, 500);
        } catch (e) {
            next(e);
        }
    }

    async searchProducts(req, res, next) {
        try {
            let { query } = req.query;
            query = query.replace(/-/g, ' ');
            const result = await ProductService.searchProducts(query);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getWishList(req, res, next) {
        try {
            const { userId } = req.query;
            const favoriteProducts = await ProductService.getWishList(userId);
            return res.json(favoriteProducts);
        } catch (e) {
            next(e);
        }
    }

    async addToWishList(req, res, next) {
        try {
            const { userId, productId } = req.body;
            const result = await ProductService.addToWishList(
                userId,
                productId,
            );
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductController();
