import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AdminProductDetailsSchema } from '../types/adminProductDetailsSchema.ts';
import { fetchProductById } from '../services/fetchProductById.ts';

const initialState: AdminProductDetailsSchema = {
    isLoading: false,
    data: undefined,
    form: undefined
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
                state.data = state.form = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});

export const {
    actions: adminProductDetailsActions,
    reducer: adminProductDetailsReducer,
} = adminProductDetailsSlice;
