import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandDetailsOrder = (state: StateSchema) => state.brandsDetails?.order;
