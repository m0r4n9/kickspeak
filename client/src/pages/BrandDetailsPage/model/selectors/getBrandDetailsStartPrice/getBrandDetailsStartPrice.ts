import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandDetailsStartPrice = (state: StateSchema) => state.brandsDetails?.priceStart || 0;
