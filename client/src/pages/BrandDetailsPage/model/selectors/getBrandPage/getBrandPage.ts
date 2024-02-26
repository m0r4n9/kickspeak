import { StateSchema } from '@/app/providers/StoreProvider';

export const getBrandPage = (state: StateSchema) => state.brandsDetails?.page;
export const getBrandDetailsTotalPage = (state: StateSchema) =>
    state.brandsDetails?.totalPage;
