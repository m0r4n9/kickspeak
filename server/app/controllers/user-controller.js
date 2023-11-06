const userService = require("../services/user-service");

class UserController {
  async getProfileData(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getProfileData(id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateProfileData(req, res, next) {
    try {
      const userId = req.params.id;
      const formData = req.body;
      const userUpdated = await userService.updateProfileData(userId, formData);
      return res.json(userUpdated);
    } catch (e) {
      next(e);
    }
  }

  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.registration(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      // consts { refreshToken } = req.cookies;
      const { userId } = req.query;
      console.log(userId);
      // consts user = await userService.refresh(refreshToken);
      const user = await userService.refresh(userId);
      // res.cookie("refreshToken", user.refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      // });
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
