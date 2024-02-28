const Router = require('express');
const ProductAdminController = require('../controllers/adminControllers/productAdmin-controller');
const BrandAdminController = require('../controllers/adminControllers/brandAdmin-controller');
const UserAdminController = require('../controllers/adminControllers/userAdmin-controller');
const SizeAdminController = require('../controllers/adminControllers/sizeAdmin-controller');

const adminRouter = new Router();
const upload = require('../middlewares/uploadImg');

// Brands
adminRouter.get('/brands', BrandAdminController.getBrands);
adminRouter.get('/brands-name', BrandAdminController.getListName);
adminRouter.get('/brand/:id', BrandAdminController.getBrandDetails);
adminRouter.get('/brands/search', BrandAdminController.searchBrands);
adminRouter.put(
    '/brand/update/:id',
    upload.single('logo'),
    BrandAdminController.updateBrand,
);
adminRouter.post(
    '/brand/create',
    upload.single('logo'),
    BrandAdminController.createBrand,
);
adminRouter.delete('/brand/delete/:id', BrandAdminController.deleteBrand);

// Products
adminRouter.get('/products', ProductAdminController.getProducts);
adminRouter.get('/product/:id', ProductAdminController.getProductDetails);
adminRouter.put(
    '/product/update/:id',
    upload.array('images'),
    ProductAdminController.updateProduct,
);
adminRouter.post(
    '/product/create',
    upload.array('images'),
    ProductAdminController.createProduct,
);
adminRouter.delete('/product/delete/:id', ProductAdminController.deleteProduct);

// Colors

adminRouter.post(
    '/product-remove-color',
    ProductAdminController.removeColorFromProduct,
);
adminRouter.post(
    '/product-add-color',
    ProductAdminController.addColorToProduct,
);

// Images
/*
 - create
 - update
 - delete
* */

adminRouter.post('/size/create', SizeAdminController.create);
adminRouter.delete('/size/:id', SizeAdminController.delete);
adminRouter.put('/size/update/:id', SizeAdminController.update);
// Sizes
/*

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
