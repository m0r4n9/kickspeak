const BrandAdminService = require('../../services/adminServices/brandAdmin-service');
const fs = require('fs');

class BrandAdminController {
    async getBrands(req, res, next) {
        try {
            const limit = req.query._limit ?? 10;
            const page = req.query._page || 1;
            const query = req.query._query || '';

            const brands = await BrandAdminService.getBrands(
                limit,
                page,
                query,
            );
            return res.json(brands);
        } catch (e) {
            next(e);
        }
    }

    async getListName(req, res, next) {
        try {
            const brandsList = await BrandAdminService.getListName();
            return res.json(brandsList);
        } catch (e) {
            next(e);
        }
    }

    async getBrandDetails(req, res, next) {
        try {
            const { id } = req.params;
            const brandData = await BrandAdminService.getBrandDetails(id);
            return res.json(brandData);
        } catch (e) {
            next(e);
        }
    }

    async updateBrand(req, res, next) {
        try {
            const { id } = req.params;
            const { name, foundation, country } = req.body;
            const pathLogo = req.file?.path;
            const updatedBrand = await BrandAdminService.updateBrand(
                id,
                { name, foundation, country },
                pathLogo,
            );
            return res.json(updatedBrand);
        } catch (e) {
            next(e);
        }
    }

    async createBrand(req, res, next) {
        try {
            const { name, foundation, country } = req.body;
            let pathLogo = req.file?.path;

            const createdBrand = await BrandAdminService.createBrand(
                name,
                foundation,
                country,
                pathLogo,
            );
            return res.json(createdBrand?.id);
        } catch (e) {
            if (e.errors[0] === 'cancel' && fs.existsSync(e.errors[1])) {
                fs.unlink(e.errors[1], (err) => {
                    console.log(err);
                });
            }
            next(e);
        }
    }

    async deleteBrand(req, res, next) {
        try {
            const { id } = req.params;
            const deletedBrand = await BrandAdminService.deleteBrand(id);
            return res.json(deletedBrand);
        } catch (e) {
            next(e);
        }
    }

    async searchBrands(req, res, next) {
        try {
            const { query, _limit } = req.query;
            const brands = await BrandAdminService.searchBrands(query, _limit);
            return res.json(brands);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BrandAdminController();
