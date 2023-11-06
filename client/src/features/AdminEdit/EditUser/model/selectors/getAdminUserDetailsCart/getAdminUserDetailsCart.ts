import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminUserDetailsCart = (state: StateSchema) => state.adminUserDetails?.data?.cart;
