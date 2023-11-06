import { createSlice } from '@reduxjs/toolkit';
import { AdminProductsSchema } from '../types/adminProductsSchema.ts';
import { fetchProductsAdmin } from '@/pages/AdminPages/AdminProductsPage/model/services/fetchProductsAdmin.ts';

const initialState: AdminProductsSchema = {
    isLoading: false,
    data: undefined,
    page: 1,
};

const adminProductsSlice = createSlice({
    name: 'AdminProductsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchProductsAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProductsAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProductsAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
});

export const { actions: adminProductsActions, reducer: adminProductsReducer } =
    adminProductsSlice;
