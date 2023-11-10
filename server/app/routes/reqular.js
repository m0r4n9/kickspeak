const Router = require('express');
const ProductController = require('../controllers/product-controller');
const CartController = require('../controllers/cart-controller');
const BrandController = require('../controllers/brand-controller');
const UserController = require('../controllers/user-controller');
const FillDataBaseController = require('../controllers/filldb-controller');

const router = new Router();
const upload = require('../middlewares/uploadImg');

// User
router.put('/profile/:id', UserController.updateProfileData);
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/profile/:id', UserController.getProfileData);
router.get('/refresh', UserController.refresh);

// Shopping cart
router.get('/checkout', CartController.getCarts);
router.post('/add-to-cart', CartController.addProductCart);
router.delete('/remove-from-cart', CartController.removeProductCart);
router.put('/update-cart', CartController.updateProductCart);

// Brands routes
router.post(
    '/create/brand',
    upload.single('file'),
    BrandController.createBrand,
);
router.get('/brands', BrandController.getBrands);
router.get('/brand/:id', BrandController.getBrandDetails);

// Products
router.post('/images', upload.single('test'), ProductController.uploadImage);
router.get('/products', ProductController.getProducts);
router.get('/goods/:id', ProductController.getProductDetails);
router.get('/search', ProductController.searchProducts);
router.get('/wishlist', ProductController.getWishList);

// fil
router.get('/fill-database', FillDataBaseController.fillDataBase);

module.exports = router;
