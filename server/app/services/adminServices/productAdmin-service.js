const { Brand, Product, Size, Image } = require("../../models/product");
const ApiError = require("../../exceptions/api-error");

class ProductAdminService {
  async getProducts(limit, page) {
    const products = await Product.findAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", "name", "code", "price"]
    });

    return products;
  }
}

module.exports = new ProductAdminService();
