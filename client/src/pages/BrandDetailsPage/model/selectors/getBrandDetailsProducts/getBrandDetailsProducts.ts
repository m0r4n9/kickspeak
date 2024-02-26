import { StateSchema } from '@/app/providers/StoreProvider';

export const getBrandDetailsProducts = (state: StateSchema) =>
    state.brandsDetails?.products;
