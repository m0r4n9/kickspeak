import {StateSchema} from "@/app/providers/StoreProvider";

export const getUsersAdminLimit = (state: StateSchema) => state.adminUsers?.limit;