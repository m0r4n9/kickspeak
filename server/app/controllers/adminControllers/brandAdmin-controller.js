const BrandAdminService = require("../../services/adminServices/brandAdmin-service");

class BrandAdminController {
  async getBrands(req, res, next) {
    try {
      const limit = req.query._limit;
      const page = req.query._page || 1;


      const brands = await BrandAdminService.getBrands(limit, page);
      return res.json(brands);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new BrandAdminController();
