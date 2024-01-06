const SizeAdminService = require('../../services/adminServices/sizeAdmin-service');

class SizeAdminController {
    async create(req, res, next) {
        try {
            const { data } = req.body;
            const size = await SizeAdminService.create(data);
            return res.json(size);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const size = await SizeAdminService.delete(id);
            return res.json(size);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            console.log(id, quantity);
            const size = await SizeAdminService.update(id, quantity);
            return res.json(size);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SizeAdminController();
