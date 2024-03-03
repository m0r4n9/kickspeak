import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsPageIsLoading = (state: StateSchema) =>
    state.productsPage?.isLoading || false;
export const getProductsPageError = (state: StateSchema) =>
    state.productsPage?.error;
export const getProductsPageNumber = (state: StateSchema) =>
    state.productsPage?.page;
export const getProductTotalPage = (state: StateSchema) =>
    state.productsPage?.totalPage;
export const getProductstInited = (state: StateSchema) =>
    state.productsPage?._inited;
export const getProductsLimit = (state: StateSchema) =>
    state.productsPage?.limit || 10;
export const getProductsOrder = (state: StateSchema) =>
    state.productsPage?.filters?.order || '';

export const getProductSex = (state: StateSchema) =>
    state.productsPage?.filters?.sex;
