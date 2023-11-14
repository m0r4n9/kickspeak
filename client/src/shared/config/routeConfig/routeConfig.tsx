import { RouteProps } from 'react-router-dom';
import {
    AppRoutes,
    getRouteAdminAuth,
    getRouteAdminBrandCreate,
    getRouteAdminBrandDetails,
    getRouteAdminBrands,
    getRouteAdminProducts,
    getRouteAdminUserDetails,
    getRouteAdminUsers,
    getRouteBrands,
    getRouteBrandsDetails,
    getRouteCatalog,
    getRouteMain,
    getRouteProductDetails,
    getRouteProfile,
    getRouteWishList,
} from '../../const/route.ts';
import { MainPage } from '@/pages/MainPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { BrandsPage } from '@/pages/BrandsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { UserRole } from '@/entities/User';
import { AdminLoginPage } from '@/pages/AdminPages/AdminLoginPage';
import { BrandDetailsPage } from '@/pages/BrandDetailsPage';
import { WishListPage } from '@/pages/WishListPage';
import { AdminBrandsPage } from '@/pages/AdminPages/Brands/AdminBrandsPage';
import { AdminBrandDetailsPage } from '@/pages/AdminPages/Brands/AdminBrandDetailsPage';
import { AdminUsersPage } from '@/pages/AdminPages/Users/AdminUsersPage';
import { AdminUserDetailsPage } from '@/pages/AdminPages/Users/AdminUserDetailsPage';
import { AdminBrandCreatePage } from '@/pages/AdminPages/Brands/AdminBrandCreatePage';
import {AdminProductsPage} from "@/pages/AdminPages/Products/AdminProductsPage";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    adminPanel?: boolean;
    role?: UserRole[];
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.CATALOG]: {
        path: getRouteCatalog(),
        element: <ProductsPage />,
    },
    [AppRoutes.BRANDS]: {
        path: getRouteBrands(),
        element: <BrandsPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(),
        authOnly: true,
        element: <ProfilePage />,
    },
    [AppRoutes.BRANDS_DETAILS]: {
        path: getRouteBrandsDetails(':id'),
        element: <BrandDetailsPage />,
    },
    [AppRoutes.PRODUCT_DETAILS]: {
        path: getRouteProductDetails(':id'),
        element: <ProductDetailsPage />,
    },
    [AppRoutes.WISH_LIST]: {
        path: getRouteWishList(),
        element: <WishListPage />,
    },
    [AppRoutes.ADMIN_AUTH]: {
        path: getRouteAdminAuth(),
        element: <AdminLoginPage />,
        adminPanel: true,
    },
    [AppRoutes.ADMIN_BRANDS]: {
        path: getRouteAdminBrands(),
        element: <AdminBrandsPage />,
        authOnly: true,
        adminPanel: true,
        role: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_BRAND_CREATE]: {
        path: getRouteAdminBrandCreate(),
        element: <AdminBrandCreatePage />,
        authOnly: true,
        adminPanel: true,
        role: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_BRAND_DETAILS]: {
        path: getRouteAdminBrandDetails(':id'),
        element: <AdminBrandDetailsPage />,
        authOnly: true,
        adminPanel: true,
        role: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_PRODUCTS]: {
        path: getRouteAdminProducts(),
        authOnly: true,
        adminPanel: true,
        element: <AdminProductsPage/>,
    },
    [AppRoutes.ADMIN_USERS]: {
        path: getRouteAdminUsers(),
        element: <AdminUsersPage />,
        authOnly: true,
        adminPanel: true,
        role: [UserRole.ADMIN],
    },
    [AppRoutes.ADMIN_USER_DETAILS]: {
        path: getRouteAdminUserDetails(':id'),
        element: <AdminUserDetailsPage />,
        authOnly: true,
        adminPanel: true,
        role: [UserRole.ADMIN],
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <MainPage />,
    },
};
