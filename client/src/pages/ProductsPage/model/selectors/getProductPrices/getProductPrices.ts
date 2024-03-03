import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsMinPrice = (state: StateSchema) =>
    state.productsPage?.filters?.minPrice;
export const getProductsMaxPrice = (state: StateSchema) =>
    state.productsPage?.filters?.maxPrice;

export const getProductsMinPriceDB = (state: StateSchema) =>
    state.productsPage?.minPriceDB;
export const getProductsMaxPriceDB = (state: StateSchema) =>
    state.productsPage?.maxPriceDB;
