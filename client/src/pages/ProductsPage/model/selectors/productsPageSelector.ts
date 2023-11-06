import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsPageIsLoading = (state: StateSchema) =>
    state.productsPage?.isLoading || false;
export const getProductsPageError = (state: StateSchema) =>
    state.productsPage?.error;
export const getProductsPageNumber = (state: StateSchema) =>
    state.productsPage?.page;
export const getProductPageHasMore = (state: StateSchema) =>
    state.productsPage?.hasMore;
export const getProductsStartPrice = (state: StateSchema) =>
    state.productsPage?.priceStart || 0;
export const getProductsEndPrice = (state: StateSchema) =>
    state.productsPage?.priceEnd || 45200;
export const getProductstInited = (state: StateSchema) =>
    state.productsPage?._inited;
export const getProductsColor = (state: StateSchema) =>
    state.productsPage?.color;

export const getProductsLimit = (state: StateSchema) =>
    state.productsPage?.limit || 10;
export const getProductsHasMore = (state: StateSchema) =>
    state.productsPage?.hasMore;
export const getProductsOrder = (state: StateSchema) =>
    state.productsPage?.order || '';

export const getProductSex = (state: StateSchema) =>
    state.productsPage?.sex;
