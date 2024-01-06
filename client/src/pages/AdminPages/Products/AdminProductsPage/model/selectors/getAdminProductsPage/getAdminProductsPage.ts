import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProductsPage = (state: StateSchema) => state.adminProducts?.page;