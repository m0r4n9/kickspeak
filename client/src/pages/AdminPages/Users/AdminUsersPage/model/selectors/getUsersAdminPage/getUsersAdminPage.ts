import {StateSchema} from "@/app/providers/StoreProvider";

export const getUsersAdminPage = (state: StateSchema) => state.adminUsers?.page;
