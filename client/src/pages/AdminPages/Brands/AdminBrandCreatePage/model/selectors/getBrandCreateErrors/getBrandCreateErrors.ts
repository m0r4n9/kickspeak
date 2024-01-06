import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandCreateErrors = (state: StateSchema) => state.adminBrandCreate?.error;