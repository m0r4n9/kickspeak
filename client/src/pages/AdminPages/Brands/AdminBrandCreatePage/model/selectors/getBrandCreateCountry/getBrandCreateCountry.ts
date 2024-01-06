import {StateSchema} from "@/app/providers/StoreProvider";

export const getBrandCreateCountry = (state: StateSchema) => state.adminBrandCreate?.country;