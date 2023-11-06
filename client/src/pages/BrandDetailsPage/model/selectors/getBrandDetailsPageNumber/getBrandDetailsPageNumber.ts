import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandDetailsPageNumber = (state: StateSchema) => state.brandsDetails?.page;
