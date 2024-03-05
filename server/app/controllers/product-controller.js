const ProductService = require('../services/product-service');

class ProductController {
    async uploadImage(req, res, next) {
        try {
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
            const brands = req.query._brands;
            const sizes = req.query._sizes;

            const products = await ProductService.getProducts(
                page,
                limit,
                order,
                colors,
                price,
                sex,
                brands,
                sizes,
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

    async searchColors(req, res, next) {
        try {
            const { query } = req.query;
            const colors = await ProductService.searchColors(query);
            return res.json(colors);
        } catch (e) {
            next(e);
        }
    }

    async searchBrands(req, res, next) {
        try {
            const { query } = req.query;
            const brands = await ProductService.searchBrands(query);
            return res.json(brands);
        } catch (e) {
            next(e);
        }
    }

    async searchSizes(req, res, next) {
        try {
            const { query } = req.query;
            const sizes = await ProductService.searchSizes(query);
            return res.json(sizes);
        } catch (e) {
            next(e);
        }
    }

    async test(req, res, next) {
        try {
            const result = await ProductService.test();
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductController();
