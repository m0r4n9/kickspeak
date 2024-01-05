import { createSlice } from '@reduxjs/toolkit';
import { AdminProductDetailsSchema } from '../types/adminProductDetailsSchema.ts';
import { fetchProductById } from '../services/fetchProductById.ts';
import { updateProduct } from '@/pages/AdminPages/Products/AdminProductEditPage/model/services/updateProduct.ts';

const initialState: AdminProductDetailsSchema = {
    isLoading: false,
    data: undefined,
};

const adminProductDetailsSlice = createSlice({
    name: 'adminProductDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});

export const {
    reducer: adminProductDetailsReducer,
} = adminProductDetailsSlice;
