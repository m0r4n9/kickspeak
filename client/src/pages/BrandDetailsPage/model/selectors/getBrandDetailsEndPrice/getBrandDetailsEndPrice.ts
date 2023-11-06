import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandDetailsEndPrice = (state: StateSchema) => state.brandsDetails?.priceEnd || 0;
