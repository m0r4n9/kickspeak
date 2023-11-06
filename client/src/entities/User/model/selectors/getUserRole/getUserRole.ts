import {StateSchema} from "@/app/providers/StoreProvider";

export const getUserRole = (state: StateSchema) => state.user.authData?.role;
