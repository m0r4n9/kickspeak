const { User, Cart } = require('../../models/user');
const { Op } = require('sequelize');
const ApiError = require('../../exceptions/api-error');
const bcrypt = require('bcrypt');
const { Product, Size } = require('../../models/product');

class UserAdminService {
    async getUsers(limit, page, query) {
        const queryRequest = query
            ? {
                  name: {
                      [Op.iLike]: `%${query}%`,
                  },
              }
            : {};

        const users = await User.findAll({
            where: {
                ...queryRequest,
            },
            limit: limit,
            offset: (page - 1) * limit,
            attributes: ['id', 'email', 'name', 'phoneNumber'],
        });

        const totalUsers = await User.count({ where: { ...queryRequest } });

        return {
            users,
            totalUsers
        };
    }

    async getDetailsUser(userId) {
        const userData = await User.findByPk(userId);

        if (!userData) {
            throw ApiError.BadRequest('Пользователь не найден');
        }

        const userCart = await Cart.findAll({
            where: {
                userId,
            },
        });

        let sizesId = [];
        userCart.map((cart) => sizesId.push(cart.sizeId));
        //
        const products = await Product.findAll({
            include: {
                model: Size,
                where: {
                    id: sizesId,
                },
            },
            attributes: ['id', 'name'],
        });

        return { user: userData, cart: products };
    }

    async updateUser(formData, userId) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw ApiError.BadRequest(
                'Пользователь не найден, произошла ошибка',
            );
        }

        const password = await bcrypt.hash(formData.password, 10);
        const changedPassword = await bcrypt.compare(
            user.getDataValue('password'),
            password,
        );

        if (!changedPassword) {
            await user.update({ ...formData, password: password });
            return user;
        }

        await user.update({ ...formData });
        return user;
    }

    async deleteUser(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.BadRequest(
                'Пользователь не найден, произошла ошибка',
            );
        }
        if (user.getDataValue('role').includes('admin')) {
            throw ApiError.BadRequest(
                'Вы не можете удалить другого администратора!',
            );
        }
        await user.destroy();
        return `Пользователь удален`;
    }

    async searchUsers(query, limit) {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: '%' + query + '%' } },
                    { surname: { [Op.iLike]: '%' + query + '%' } },
                    { email: { [Op.iLike]: '%' + query + '%' } },
                    { phoneNumber: { [Op.iLike]: '%' + query + '%' } },
                ],
            },
        });

        const amount = await User.count({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: '%' + query + '%' } },
                    { surname: { [Op.iLike]: '%' + query + '%' } },
                    { email: { [Op.iLike]: '%' + query + '%' } },
                    { phoneNumber: { [Op.iLike]: '%' + query + '%' } },
                ],
            },
        });

        const hasMore = limit < amount;
        return {
            users,
            hasMore,
        };
    }
}

module.exports = new UserAdminService();
