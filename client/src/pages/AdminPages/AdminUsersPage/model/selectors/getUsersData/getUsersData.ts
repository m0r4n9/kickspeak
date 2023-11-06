import {StateSchema} from "@/app/providers/StoreProvider";

export const getUsersData = (state: StateSchema) => state.adminUsers?.data?.users;
