import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminUserDetailsErrors = (state: StateSchema) => state.adminUserDetails?.error;
