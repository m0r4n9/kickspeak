import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminBrandDetailsSchema } from '../types/adminBrandDetailsSchema.ts';
import { fetchBrandById } from '../services/fetchBrandById.ts';
import { Brand } from '@/entities/Brand';
import { updateBrand } from '../services/updateBrand.ts';

const initialState: AdminBrandDetailsSchema = {
    isLoading: false,
    data: undefined,
    form: undefined,
};

const adminBrandDetailsSlice = createSlice({
    name: 'adminBrandDetails',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.form = {
                id: state.data?.id || '',
                name: state.data?.name || '',
                foundation: state.data?.foundation,
                country: state.data?.country,
                logo: state.data?.logo,
            };
        },
        updateBrand: (state, action: PayloadAction<Brand>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        updateName: (state, action: PayloadAction<string>) => {
            if (state.form) state.form.name = action.payload;
        },
        updateFoundation: (state, action: PayloadAction<string>) => {
            if (state.form) state.form.foundation = action.payload;
        },
        updateCountry: (state, action: PayloadAction<string>) => {
            if (state.form) state.form.country = action.payload;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchBrandById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchBrandById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = {
                    id: action.payload.id,
                    name: action.payload.name,
                    foundation: action.payload.foundation,
                    country: action.payload.country,
                    logo: action.payload.logo,
                };
            })
            .addCase(fetchBrandById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateBrand.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = {
                    id: action.payload.id,
                    name: action.payload.name,
                    foundation: action.payload.foundation,
                    country: action.payload.country,
                    logo: action.payload.logo,
                };
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});

export const {
    actions: adminBrandDetailsActions,
    reducer: adminBrandDetailsReducer,
} = adminBrandDetailsSlice;
