import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandCreateName = (state: StateSchema) => state.adminBrandCreate?.name;