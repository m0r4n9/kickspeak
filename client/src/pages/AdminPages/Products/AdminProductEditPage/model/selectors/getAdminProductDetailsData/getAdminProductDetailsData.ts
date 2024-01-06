import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProductDetailsData = (state: StateSchema) => state.adminProductDetails?.data;