import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBrandsAdmin } from '../services/fetchBrandsAdmin.ts';
import { AdminBrandsSchema } from '../types/AdminBrandsSchema.ts';

const initialState: AdminBrandsSchema = {
    isLoading: false,
    page: 1,
    limit: 10,
    data: undefined,
    query: '',
};

const adminBrandSlice = createSlice({
    name: "AdminBrandsSlice",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
            state.page = 1;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchBrandsAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchBrandsAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchBrandsAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
});

export const {
    actions: adminBrandActions,
    reducer: adminBrandReducer
} = adminBrandSlice;
