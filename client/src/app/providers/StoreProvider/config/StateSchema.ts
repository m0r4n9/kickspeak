import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ScrollSaveSchema } from '@/features/scrollSave';
import { ProductsPageSchema } from '@/pages/ProductsPage';
import { ProductDetailsSchema } from '@/entities/Product';
import { BrandsPageSchema } from '@/pages/BrandsPage';
import { UserSchema } from '@/entities/User';
import { ProfileSchema } from '@/features/EditProfileCards';
import { CartSchema } from '@/entities/Cart';
import { LoginSchema } from '@/features/Auth/AuthUser';
import { SearchSchema } from '@/features/Search';
import { AdminProductsSchema } from '@/pages/AdminPages/AdminProductsPage';
import { AdminBrandsSchema } from '../../../../pages/AdminPages/Brands/AdminBrandsPage';
import { AdminUsersSchema } from '../../../../pages/AdminPages/Users/AdminUsersPage';
import { AdminUserDetailsSchema } from '@/features/Admin/AdminEdit/EditUser';
import { BrandDetailsSchema } from '@/pages/BrandDetailsPage';
import { WishListSchema } from '@/pages/WishListPage';
import { BrandCreateSchema } from '@/pages/AdminPages/Brands/AdminBrandCreatePage';
import {AdminBrandDetailsSchema} from "@/features/Admin/AdminEdit/EditBrand";

export interface StateSchema {
    scroll: ScrollSaveSchema;
    search: SearchSchema;
    user: UserSchema;
    cart: CartSchema;

    // Optional
    productsPage?: ProductsPageSchema;
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    productDetails?: ProductDetailsSchema;
    brandsPage?: BrandsPageSchema;
    brandsDetails?: BrandDetailsSchema;
    wishList?: WishListSchema;

    // Admin
    adminProducts?: AdminProductsSchema;
    adminBrands?: AdminBrandsSchema;
    adminBrandCreate?: BrandCreateSchema;
    adminBrandDetails?: AdminBrandDetailsSchema;
    adminUsers?: AdminUsersSchema;
    adminUserDetails?: AdminUserDetailsSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
