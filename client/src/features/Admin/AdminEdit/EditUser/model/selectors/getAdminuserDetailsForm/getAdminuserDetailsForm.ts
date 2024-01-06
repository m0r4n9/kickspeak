import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminUserDetailsForm = (state: StateSchema) => state.adminUserDetails?.form;
