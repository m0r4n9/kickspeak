import { StateSchema } from '@/app/providers/StoreProvider';

export const getBrandsPageError = (state: StateSchema) =>
    state.brandsPage?.error || '';
