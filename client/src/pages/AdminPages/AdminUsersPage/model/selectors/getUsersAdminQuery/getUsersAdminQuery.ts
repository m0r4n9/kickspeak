import {StateSchema} from "@/app/providers/StoreProvider";

export const getUsersAdminQuery = (state: StateSchema) => state.adminUsers?.query;
