import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandsAdminData = (state: StateSchema) => state.adminBrands?.data?.brands;
export const getBrandsCount = (state: StateSchema) => state.adminBrands?.data?.totalBrands;
export const getBrandsAdminQuery = (state: StateSchema) => state.adminBrands?.query;
export const getBrandsAdminPage = (state: StateSchema) => state.adminBrands?.page;
export const getBrandsAdminLimit = (state: StateSchema) => state.adminBrands?.limit;
export const getBrandsAdminSortParams = (state: StateSchema) => state.adminBrands?.sort;