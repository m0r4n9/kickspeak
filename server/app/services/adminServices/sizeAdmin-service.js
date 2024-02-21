const fs = require('fs');
const { Size } = require('../../models/models');
const ApiError = require('../../exceptions/api-error');

class SizeAdminService {
    async create(data) {
        if (!data || !data.productId) {
            throw ApiError.BadRequest('Данные пусты');
        }

        const size = await Size.create(data);
        return size;
    }

    async delete(id) {
        if (!id) {
            throw ApiError.BadRequest('Не указан id');
        }

        return await Size.destroy({
            where: {
                id,
            },
        });
    }

    async update(id, quantity) {
        if (!quantity) {
            throw ApiError.BadRequest('Данные пусты');
        }
        const size = await Size.findByPk(id);
        return await size.update({ quantity });
    }
}

module.exports = new SizeAdminService();
