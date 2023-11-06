const UserAdminService = require("../../services/adminServices/userAdmin-service");

class UserAdminController {
  async getUsers(req, res, next) {
    try {
      const limit = req.query._limit || 15;
      const page = req.query._page || 1;

      const users = await UserAdminService.getUsers(limit, page);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getDetailsUser(req, res, next) {
    try {
      const id = req.params.id;
      const userData = await UserAdminService.getDetailsUser(id);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const formData = req.body;

      const user = await UserAdminService.updateUser(formData, userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;

      const result = await UserAdminService.deleteUser(userId);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchUsers(req, res, next) {
    try {
      const { query, _limit } = req.query;
      const users = await UserAdminService.searchUsers(query, _limit);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserAdminController();
