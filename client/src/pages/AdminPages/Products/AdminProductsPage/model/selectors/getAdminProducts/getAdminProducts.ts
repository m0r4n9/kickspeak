import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProducts = (state: StateSchema) => state.adminProducts?.products;