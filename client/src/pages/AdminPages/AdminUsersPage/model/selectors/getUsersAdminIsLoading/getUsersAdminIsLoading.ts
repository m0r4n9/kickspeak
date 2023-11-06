import {StateSchema} from "@/app/providers/StoreProvider";

export const getUsersAdminIsLoading = (state: StateSchema) => state.adminUsers?.isLoading;
