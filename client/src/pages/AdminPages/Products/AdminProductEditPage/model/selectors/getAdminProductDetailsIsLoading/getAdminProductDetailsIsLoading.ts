import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProductDetailsIsLoading = (state: StateSchema) => state.adminProductDetails?.isLoading;