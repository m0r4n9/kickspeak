import { StateSchema } from '@/app/providers/StoreProvider';

export const getBrandDetails = (state: StateSchema) =>
    state.brandsDetails?.brand;
