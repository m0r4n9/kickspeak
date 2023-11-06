import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductDetailsData = (state: StateSchema) =>
    state.productDetails?.data?.product;
export const getProductAdditionalProductsData = (state: StateSchema) =>
    state.productDetails?.data?.additionalProducts;
export const getProductRecentData = (state: StateSchema) =>
    state.productDetails?.data?.recentProducts;
export const getProductDetailsIsLoading = (state: StateSchema) =>
    state.productDetails?.isLoading ?? false;
export const getProductDetailsError = (state: StateSchema) =>
    state.productDetails?.error;
