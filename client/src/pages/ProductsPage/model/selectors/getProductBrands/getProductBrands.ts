import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductBrands = (state: StateSchema) =>
    state.productsPage?.brands;
export const getProductFilterBrands = (state: StateSchema) =>
    state.productsPage?.filters.brands;
