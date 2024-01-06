const { Brand, Product } = require('../../models/product');
const { Op } = require('sequelize');
const ApiError = require('../../exceptions/api-error');

class BrandAdminService {
    async getBrands(limit, page, query) {
        const queryRequest = query ? {
            name: {
                [Op.iLike]: `%${query}%`
            }
        } : {};

        const brands = await Brand.findAll({
            where: {
                ...queryRequest
            },
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ['id', 'name', 'country', 'foundation'],
            order: [
                ['id', 'DESC']
            ]
        });

        const totalBrands = await Brand.count({
            where: {
                ...queryRequest
            }
        });

        return {
            brands: brands,
            totalBrands,
        };
    }

    async getListName() {
        const brands = await Brand.findAll({
            attributes: [
                ['id', 'value'],
                ['name', 'label']
            ],
            order: [
                ['name', 'ASC']
            ]
        });
        return brands;
    }

    async getBrandDetails(id) {
        const brand = await Brand.findByPk(id, {
            include: {
                model: Product,
                attributes: {
                    exclude: ['BrandId', 'colors', 'sex'],
                },
            },
        });
        return brand;
    }

    async updateBrand(id, data, pathLogo) {
        const brand = await Brand.findByPk(id);
        const newData = {
            ...data,
            logo: pathLogo,
        };
        await brand?.update(newData);
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
            logo: `/${pathLogo}`,
        });

        await brand.save();
        return brand;
    }

    async deleteBrand(id) {
        const brand = await Brand.findByPk(id);
        await brand.destroy();
        return brand;
    }

    async searchBrands(query, _limit) {
        const brands = await Brand.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: '%' + query + '%' } },
                    { country: { [Op.iLike]: '%' + query + '%' } },
                ],
            },
        });

        const amount = await Brand.count({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: '%' + query + '%' } },
                    { country: { [Op.iLike]: '%' + query + '%' } },
                ],
            },
        });

        const hasMore = _limit < amount;
        return {
            brands,
            hasMore,
        };
    }
}

module.exports = new BrandAdminService();
