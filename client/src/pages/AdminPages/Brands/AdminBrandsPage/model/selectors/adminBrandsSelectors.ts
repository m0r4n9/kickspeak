import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandsAdminPage = (state: StateSchema) => state.adminBrands?.page;
export const getBrandsAdminData = (state: StateSchema) => state.adminBrands?.data?.brands;
export const getBrandsAdminHasMore = (state: StateSchema) => state.adminBrands?.data?.hasMore;
