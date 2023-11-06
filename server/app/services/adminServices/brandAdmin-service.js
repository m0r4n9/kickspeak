const { Brand, Product, Size, Image } = require("../../models/product");

class BrandAdminService {
  async getBrands(limit, page) {
    const brands = await Brand.findAll({
      limit: limit,
      offset: (page - 1) * limit,
      attributes: ["id", "name", "country", "foundation"],
    });

    const totalCount = await Brand.count();
    const hasMore = page * limit < totalCount;

    return {
      brands: brands,
      hasMore,
    };
  }
}

module.exports = new BrandAdminService();
