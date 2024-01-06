import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProductsIsLoading = (state: StateSchema) => state.adminProducts?.isLoading;