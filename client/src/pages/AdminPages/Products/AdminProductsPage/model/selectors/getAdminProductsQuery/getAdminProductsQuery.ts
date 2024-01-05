import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProductsQuery = (state: StateSchema) => state.adminProducts?.query;