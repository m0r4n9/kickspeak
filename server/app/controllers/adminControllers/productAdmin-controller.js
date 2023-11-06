const ProductAdminService = require("../../services/adminServices/productAdmin-service");

class ProductAdminController {
  async getProducts(req, res, next) {
    try {
      const limit = req.query._limit;
      const page = req.query._page || 1;

      const products = await ProductAdminService.getProducts(limit, page);
      return res.json(products);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProductAdminController();
