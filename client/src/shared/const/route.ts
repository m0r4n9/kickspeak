export enum AppRoutes {
    MAIN = 'main',
    CATALOG = 'catalog',
    BRANDS = 'brands',
    PROFILE = 'profile',
    BRANDS_DETAILS = 'brands_details',
    PRODUCT_DETAILS = 'product_details',
    WISH_LIST = 'wish_list',

    ADMIN_AUTH = 'admin_auth',
    ADMIN_BRANDS = 'admin_brands',
    ADMIN_BRAND_DETAILS = 'admin_brand_details',
    ADMIN_PRODUCTS = 'admin_products',
    ADMIN_USERS = 'admin_users',
    ADMIN_USER_DETAILS = 'admin_user_details',

    // Last element
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteCatalog = () => '/catalog';
export const getRouteBrands = () => '/brands';
export const getRouteProfile = () => '/profile';
export const getRouteBrandsDetails = (id: string) => `/brands/${id}`;
export const getRouteProductDetails = (id: string) => `/goods/${id}`;
export const getRouteWishList = () => '/wishlist';


export const getRouteAdminAuth = () => '/admin/auth';
export const getRouteAdminBrands = () => '/admin/brands';
export const getRouteAdminBrandDetails = (id: string) => `/admin/brands/${id}`;
export const getRouteAdminProducts = () => '/admin/products';
export const getRouteAdminUsers = () => '/admin/users';
export const getRouteAdminUserDetails = (id: string) => `/admin/users/${id}`;

export const AppRouteByPathPatters: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
};
