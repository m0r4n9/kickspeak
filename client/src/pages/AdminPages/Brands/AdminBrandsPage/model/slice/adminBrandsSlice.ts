import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { fetchBrandsAdmin } from '../services/fetchBrandsAdmin.ts';
import {AdminBrandsSchema} from "../types/AdminBrandsSchema.ts";
import {searchBrands} from "@/pages/AdminPages/Brands/AdminBrandsPage/model/services/searchBrands.ts";

const initialState: AdminBrandsSchema = {
    isLoading: false,
    page: 1,
    data: undefined,
    query: ''
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

            .addCase(searchBrands.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(searchBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.page = 1;
            })
            .addCase(searchBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
});

export const {
    actions: adminBrandActions,
    reducer: adminBrandReducer
} = adminBrandSlice;
