const ApiError = require("../exceptions/api-error");
const {Product, Size, Image, Brand} = require("../models/product");
const {User, Cart} = require("../models/user");
const {Op} = require("sequelize");

class CartService {
  async getCarts(userId) {
    if (!userId) {
      throw ApiError.UnauthorizedError();
    }
    const carts = await Cart.findAll({ where: { userId } });

    const productIds = [];
    const sizeIds = [];
    carts.map((item) => {
      if (!productIds.includes(item.productId)) {
        productIds.push(item.productId);
      }

      if (!sizeIds.includes(item.sizeId)) {
        sizeIds.push(item.sizeId);
      }
    });

    const sizes = await Size.findAll({
      where: {
        id: {
          [Op.in]: sizeIds,
        },
      },
      attributes: {
        exclude: ["quantity"],
      },
      raw: true,
    });

    const products = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
      include: [
        {
          model: Image,
          limit: 1,
          attributes: {
            include: ["url"],
            exclude: ["productId"],
          },
        },
        {
          model: Brand,
          attributes: {
            exclude: ["foundation", "country", "logo", "data"],
          },
        },
      ],
      attributes: {
        exclude: ["sex", "code", "colors", "BrandId"],
      },
    });

    const uniqueProducts = [];
    for (const size of sizes) {
      const productData = products
        .find((product) => product.id === size.productId)
        .toJSON();

      const product = {
        ...productData,
        Sizes: size,
      };

      uniqueProducts.push(product);
    }

    return uniqueProducts;
  }

  async addProductCart(productId, sizeId, userId) {
    if (!userId) {
      throw ApiError.UnauthorizedError();
    }

    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Size,
          where: {
            id: sizeId,
          },
        },
        {
          model: Image,
          limit: 1,
          attributes: {
            include: ["url"],
            exclude: ["productId"],
          },
        },
        {
          model: Brand,
          attributes: {
            exclude: ["foundation", "country", "logo", "data"],
          },
        },
      ],
      attributes: {
        exclude: ["sex", "code", "colors", "BrandId"],
      },
    });
    const user = await User.findByPk(userId);
    if (!product || !user || !sizeId) {
      throw ApiError.BadRequest(
        "Произошла ошибка при добавление товара в корзину. Повторите попытку позже",
      );
    }

    const cart = await Cart.create({
      userId,
      productId,
      sizeId,
      quantity: 1,
    });


    // return {...product};
    return product;
  }

  async removeProductCart(productId, sizeId) {
    const cart = await Cart.findOne({
      where: {
        productId,
        sizeId,
      },
    });
    if (!cart) {
      throw ApiError.BadRequest("Данной корзины не существует");
    }
    await cart.destroy();
    return `${productId}-${sizeId}`
  }

  async updateProductCart(cartId) {
    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      throw ApiError.BadRequest("Данной корзины не существует");
    }
    cart.quantity = 2;
    await cart.save();
  }
}

module.exports = new CartService();
