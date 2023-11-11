const Router = require('express');
const ProductAdminController = require('../controllers/adminControllers/productAdmin-controller');
const BrandAdminController = require('../controllers/adminControllers/brandAdmin-controller');
const UserAdminController = require('../controllers/adminControllers/userAdmin-controller');

const adminRouter = new Router();
const upload = require('../middlewares/uploadImg');

// Brands
adminRouter.get('/brands', BrandAdminController.getBrands);
adminRouter.get('/brand/:id', BrandAdminController.getBrandDetails);
adminRouter.put('/brand/update/:id', BrandAdminController.updateBrand);
adminRouter.post('/brand/create', upload.single("logo"), BrandAdminController.createBrand);
adminRouter.delete('/brand/delete/:id', BrandAdminController.deleteBrand);

// Products
adminRouter.get('/products', ProductAdminController.getProducts);
adminRouter.get('/product/:id', ProductAdminController.getProductDetails);
adminRouter.put('/product/update/:id', ProductAdminController.updateProduct);
adminRouter.post('/product/create', ProductAdminController.createProduct);
adminRouter.delete('/product/delete/:id', ProductAdminController.deleteProduct);

// Images
/*
 - create
 - update
 - delete
* */

// Sizes
/*
 - create
 - update
 - delete
* */

// Users
adminRouter.get('/users', UserAdminController.getUsers);
adminRouter.get('/users/:id', UserAdminController.getDetailsUser);
adminRouter.get('/search/users', UserAdminController.searchUsers);
adminRouter.put('/users/:id', UserAdminController.updateUser);
adminRouter.delete('/users/:id', UserAdminController.deleteUser);

module.exports = adminRouter;
