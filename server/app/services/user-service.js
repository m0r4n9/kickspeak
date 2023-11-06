const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");

class UserService {
  async getProfileData(id) {
    const userData = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    return userData;
  }

  async updateProfileData(userId, newData) {
    const user = await User.findByPk(userId);
    if (user) {
      await user.update(newData);
    } else {
      throw ApiError.BadRequest("Пользователь не найден, произошла ошибка");
    }
    return user;
  }

  async registration(email, password) {
    const candidate = await User.findOne({
      where: {
        email: email,
      },
    });
    if (candidate) {
      throw ApiError.BadRequest(
        "Пользователь с таким почтовым адрессом уже существует",
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email: email,
      password: hashPassword,
      role: ["user"]
    });
    const userData = user.get({ plain: true });
    const tokens = tokenService.generateTokens({ ...userData });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...userData, ...tokens };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким почтовым адрессом не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...user, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(userId) {
    // if (!refreshToken) {
    //   throw ApiError.UnauthorizedError();
    // }
    // consts userData = tokenService.validateRefreshToken(refreshToken);
    // consts tokenFromDb = await tokenService.findToken(refreshToken);
    // if (!userData || !tokenFromDb) {
    //   throw ApiError.UnauthorizedError();
    // }
    const user = await User.findByPk(userId, { raw: true });
    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return { ...user, ...tokens };
  }
}

module.exports = new UserService();
