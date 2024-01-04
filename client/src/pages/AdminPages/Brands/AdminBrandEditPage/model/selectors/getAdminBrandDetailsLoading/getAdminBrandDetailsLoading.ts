import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminBrandDetailsLoading = (state: StateSchema) => state.adminBrandDetails?.isLoading;