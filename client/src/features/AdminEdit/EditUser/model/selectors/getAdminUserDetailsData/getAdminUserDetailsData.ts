import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminUserDetailsData = (state: StateSchema) => state.adminUserDetails?.data?.user;
