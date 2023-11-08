import {
    Product,
    ProductDetailsInfo,
    ProductDetailsSchema,
} from '@/entities/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductById } from '../services/fetchProductById/fetchProductById.ts';

const initialState: ProductDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchProductById.fulfilled,
                (state, action: PayloadAction<ProductDetailsInfo>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: productDetailsActions,
    reducer: productDetailsReducer,
} = productDetailsSlice;
