import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsPageIsLoading = (state: StateSchema) =>
    state.productsPage?.isLoading || false;
export const getProductsPageError = (state: StateSchema) =>
    state.productsPage?.error;
export const getProductsPageNumber = (state: StateSchema) =>
    state.productsPage?.page;
export const getProductPageHasMore = (state: StateSchema) =>
    state.productsPage?.hasMore;
export const getProductsMinPrice = (state: StateSchema) =>
    state.productsPage?.filters?.minPrice;
export const getProductsMaxPrice = (state: StateSchema) =>
    state.productsPage?.filters?.maxPrice;
export const getProductstInited = (state: StateSchema) =>
    state.productsPage?._inited;
export const getProductsColor = (state: StateSchema) =>
    state.productsPage?.filters?.color;

export const getProductsLimit = (state: StateSchema) =>
    state.productsPage?.limit || 10;
export const getProductsHasMore = (state: StateSchema) =>
    state.productsPage?.hasMore;
export const getProductsOrder = (state: StateSchema) =>
    state.productsPage?.filters?.order || '';

export const getProductSex = (state: StateSchema) =>
    state.productsPage?.filters?.sex;

export const getProductOptionPrice = (state: StateSchema) => ({
    min: state.productsPage?.filters?.minPrice,
    max: state.productsPage?.filters?.maxPrice,
});

export const getProductsMinPriceDB = (state: StateSchema) =>
    state.productsPage?.minPriceDB;
export const getProductsMaxPriceDB = (state: StateSchema) =>
    state.productsPage?.maxPriceDB;
