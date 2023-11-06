import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrandDetailsSchema } from '../types/brandDetailsSchema.ts';
import { fetchBrandDetails } from '@/pages/BrandDetailsPage/model/services/fetchBrandDetails.ts';
import { ProductColor, ProductSexField, SortOrder } from '@/entities/Product';

const initialState: BrandDetailsSchema = {
    isLoading: false,
    data: undefined,
    page: 1,
    limit: 10,
    hasMore: true,
    order: '',
    color: [],
    sex: [],
    priceStart: 0,
    priceEnd: 0,
};

const brandDetailsSlice = createSlice({
    name: 'brandDetailsSlice',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setPriceStart: (state, action: PayloadAction<number>) => {
            state.priceStart = action.payload;
        },
        setPriceEnd: (state, action: PayloadAction<number>) => {
            state.priceEnd = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setColor: (state, action: PayloadAction<ProductColor>) => {
            state.color.push(action.payload);
        },
        removeColor: (state, action: PayloadAction<ProductColor>) => {
            if (state.color.includes(action.payload)) {
                let newColors: ProductColor[] = [];
                for (let variable of state.color) {
                    if (variable !== action.payload) newColors.push(variable);
                }
                state.color = newColors;
            }
        },
        setSex: (state, action: PayloadAction<ProductSexField>) => {
            state.sex.push(action.payload);
        },
        removeSex: (state, action: PayloadAction<ProductSexField>) => {
            if (state.sex.includes(action.payload)) {
                let newSex: ProductSexField[] = [];
                for (let variable of state.sex) {
                    if (variable !== action.payload) newSex.push(variable);
                }
                state.sex = newSex;
            }
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        clearFilters: (state) => {
            state.color = [];
            state.priceEnd = 50000;
            state.priceStart = 0;
            state.sex = [];
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchBrandDetails.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchBrandDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchBrandDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});

export const { actions: brandDetailsActions, reducer: brandDetailsReducer } =
    brandDetailsSlice;
