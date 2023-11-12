import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminBrandDetailsSchema } from '@/features/Admin/AdminEdit/EditBrand';
import { fetchBrandById } from '@/features/Admin/AdminEdit/EditBrand/model/services/fetchBrandById.ts';
import { Brand } from '@/entities/Brand';
import { updateBrand } from '@/features/Admin/AdminEdit/EditBrand/model/services/updateBrand.ts';

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
                id: state.data?.id,
                name: state.data?.name,
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
