
const CartService = require("../services/cart-service");

class CartController {
  async getCarts(req, res, next) {
    try {
      const { userId } = req.query;
      const carts = await CartService.getCarts(userId);
      return res.json(carts);
    } catch (e) {
      next(e);
    }
  }

  async addProductCart(req, res, next) {
    try {
      const { productId, userId, sizeId } = req.body;
      const cart = await CartService.addProductCart(productId, sizeId, userId);
      return res.json(cart);
    } catch (e) {
      next(e);
    }
  }

  async removeProductCart(req, res, next) {
    try {
      const {productId, sizeId} = req.query;
      const data = await CartService.removeProductCart(productId, sizeId);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async updateProductCart(req, res, next) {
    try {
      const { cartId } = req.params;
      await CartService.updateProductCart(cartId);
      return res.json({ message: "Количество товара в коризне обновлено" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CartController();
