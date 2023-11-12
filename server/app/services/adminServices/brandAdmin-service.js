const { Brand, Product } = require('../../models/product');
const { Op } = require('sequelize');
const ApiError = require('../../exceptions/api-error');

class BrandAdminService {
    async getBrands(limit, page) {
        const brands = await Brand.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ['id', 'name', 'country', 'foundation'],
        });

        const totalCount = await Brand.count();
        const hasMore = page * limit < totalCount;

        return {
            brands: brands,
            hasMore,
        };
    }

    async getBrandDetails(id) {
        const brand = await Brand.findByPk(id, {
            include: {
                model: Product,
                attributes: {
                    exclude: ['BrandId', 'colors', 'sex'],
                },
            },
            attributes: {
                exclude: ['logo', 'data'],
            },
        });
        return brand;
    }

    async updateBrand(id, data) {
        const brand = await Brand.findByPk(id);
        await brand?.update(data);
        return brand;
    }

    async createBrand(name, foundation, country, pathLogo) {
        if (!name) {
            throw ApiError.BadRequest('Введите название бренда');
        }
        const candidat = await Brand.findOne({
            where: {
                name: {
                    [Op.iLike]: name,
                },
            },
        });

        if (candidat) {
            throw ApiError.BadRequest('Такая компания уже существует', [
                'cancel',
                pathLogo,
            ]);
        }

        const brand = await Brand.build({
            name,
            foundation,
            country,
            logo: pathLogo,
        });

        await brand.save();
        return brand;
    }

    async deleteBrand(id) {
        const brand = await Brand.findByPk(id);
        await brand.destroy();
        return brand;
    }
}

module.exports = new BrandAdminService();
