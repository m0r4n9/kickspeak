import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AdminProductsSchema } from '@/pages/AdminPages/Products/AdminProductsPage';
import { fetchProductsAdmin } from '@/pages/AdminPages/Products/AdminProductsPage/model/services/fetchProductsAdmin.ts';

const initialState: AdminProductsSchema = {
    isLoading: false,
    products: undefined,
    query: '',
    page: 1,
    hasMore: false,
};

const adminProductsSlice = createSlice({
    name: 'adminProductSlice',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page +=  action.payload;
}
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchProductsAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProductsAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
                state.page = action.payload.page;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchProductsAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});

export const { actions: adminProductsActions, reducer: adminproductsReducer } =
    adminProductsSlice;
