import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsFilterColors = (state: StateSchema) =>
    state.productsPage?.filters?.color;
export const getProductsColors = (state: StateSchema) =>
    state.productsPage?.colors;
