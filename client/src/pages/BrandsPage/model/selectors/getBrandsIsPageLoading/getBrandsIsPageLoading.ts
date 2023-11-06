import { StateSchema } from '@/app/providers/StoreProvider';

export const getBrandsIsPageLoading = (state: StateSchema) =>
    state.brandsPage?.isLoading || false;
