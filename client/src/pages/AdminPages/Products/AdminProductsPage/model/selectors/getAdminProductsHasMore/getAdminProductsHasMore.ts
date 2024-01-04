import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProductsTotal = (state: StateSchema) => state.adminProducts?.totalCount;