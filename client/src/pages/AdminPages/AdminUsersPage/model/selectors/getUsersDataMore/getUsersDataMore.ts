import {StateSchema} from "@/app/providers/StoreProvider";

export const getUsersDataMore = (state: StateSchema) => state.adminUsers?.data?.hasMore;
