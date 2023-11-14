import {StateSchema} from "@/app/providers/StoreProvider";

export const getAdminProductsHasMore = (state: StateSchema) => state.adminProducts?.hasMore;