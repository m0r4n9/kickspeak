import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrandCreateSchema } from '../types/BrandCreateSchema.ts';
import { createBrand } from '@/pages/AdminPages/Brands/AdminBrandCreatePage/model/services/createBrand.ts';

const initialState: BrandCreateSchema = {
    isLoading: false,
    name: '',
    foundation: '',
    country: '',
};

const brandCreateSlice = createSlice({
    name: 'brandCreateSlice',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setFoundation: (state, action: PayloadAction<string>) => {
            state.foundation = action.payload;
        },
        setCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
        },
        clearFields: (state) => {
            state.name = state.country = state.foundation = '';
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createBrand.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.payload;
            }),
});

export const { actions: brandCreateActions, reducer: brandCreateReducer } =
    brandCreateSlice;
