const Router = require("express");
const ProductAdminController = require("../controllers/adminControllers/productAdmin-controller");
const BrandAdminController = require("../controllers/adminControllers/brandAdmin-controller");
const UserAdminController = require("../controllers/adminControllers/userAdmin-controller");

const adminRouter = new Router();
// Brands
adminRouter.get("/brands", BrandAdminController.getBrands);
// Products
adminRouter.get("/products", ProductAdminController.getProducts);
// Users
adminRouter.get("/users", UserAdminController.getUsers);
adminRouter.get("/users/:id", UserAdminController.getDetailsUser);
adminRouter.get("/search/users", UserAdminController.searchUsers);
adminRouter.put("/users/:id", UserAdminController.updateUser);
adminRouter.delete("/users/:id", UserAdminController.deleteUser);

module.exports = adminRouter;
