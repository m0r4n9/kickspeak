import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminBrandDetailsErrors = (state: StateSchema) => state.adminBrandDetails?.error;