import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandDetailsLimit = (state: StateSchema) => state.brandsDetails?.limit;
