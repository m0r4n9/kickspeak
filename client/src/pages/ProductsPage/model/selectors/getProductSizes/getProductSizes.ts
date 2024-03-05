import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductSizes = (state: StateSchema) =>
    state.productsPage?.sizes;
export const getProductFilterSizes = (state: StateSchema) =>
    state.productsPage?.filters.sizes;
