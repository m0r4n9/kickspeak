import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandDetailsDataBrand = (state: StateSchema) => state.brandsDetails?.data?.brandDetails;
export const getBrandDetailsDataProducts = (state: StateSchema) => state.brandsDetails?.data?.products;
export const getBrandDetailsDataHasMore = (state: StateSchema) => state.brandsDetails?.data?.hasMore || false;
