import {StateSchema} from "@/app/providers/StoreProvider";

export const getWishListProducts = (state: StateSchema) => state.wishList?.products;
