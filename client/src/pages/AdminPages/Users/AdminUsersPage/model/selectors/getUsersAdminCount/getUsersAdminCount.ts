import {StateSchema} from "@/app/providers/StoreProvider";

export const getUsersAdminCount = (state: StateSchema) => state.adminUsers?.data?.totalUsers;