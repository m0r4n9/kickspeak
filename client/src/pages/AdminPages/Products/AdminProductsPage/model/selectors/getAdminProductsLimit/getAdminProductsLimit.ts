import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProductsLimit = (state: StateSchema) => state.adminProducts?.limit;