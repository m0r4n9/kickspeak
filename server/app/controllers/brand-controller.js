const BrandService = require("../services/brand-service");

class BrandController {
  async getBrands(req, res, next) {
    try {
      const brands = await BrandService.getBrands();
      return res.json(brands);
    } catch (e) {
      next(e);
    }
  }

  async getBrandDetails(req, res, next) {
    try {
      const { id } = req.params;
      const page = req.query._page || 1;
      const limit = req.query._limit || 10;
      const order = req.query._order;
      const colors = req.query._color;
      const price = req.query._price || "0,50000";
      const sex = req.query._sex;

      const brandDetails = await BrandService.getBrandDetails(
        id,
        page,
        limit,
        order,
        colors,
        price,
        sex,
      );
      return res.json(brandDetails);
    } catch (e) {
      next(e);
    }
  }

  async createBrand(req, res, next) {
    try {
      const { filename, buffer } = req.file;
      const { name, foundation, country } = req.body;
      const brand = await BrandService.createBrand(
        name,
        foundation,
        country,
        filename,
        buffer,
      );
      return res.json(brand);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BrandController();
