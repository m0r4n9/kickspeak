import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandCreateLogo = (state: StateSchema) => state.adminBrandCreate?.logo;