import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminBrandDetailsForm = (state: StateSchema) => state.adminBrandDetails?.form;