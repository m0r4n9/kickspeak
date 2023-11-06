import {createSlice} from "@reduxjs/toolkit";
import {WishListSchema} from "@/pages/WishListPage";
import {fetchWishList} from "@/pages/WishListPage/model/services/fetchWishList.ts";

const initialState: WishListSchema = {
    isLoading: false,
    products: undefined,
}

const wishListSlice = createSlice({
    name: "wishListSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchWishList.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
});

export const {
    actions: wishListActions,
    reducer: wishListReducer
} = wishListSlice;
