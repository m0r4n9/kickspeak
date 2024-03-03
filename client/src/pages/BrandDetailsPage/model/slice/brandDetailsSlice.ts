import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrandDetailsSchema } from '../types/brandDetailsSchema.ts';
import { fetchBrandDetails } from '@/pages/BrandDetailsPage/model/services/fetchBrandDetails.ts';
import { ProductSexField, SortOrder } from '@/entities/Product';

const initialState: BrandDetailsSchema = {
    isLoading: false,
    order: '',
    page: 1,
    limit: 10,
    totalPage: 1,
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
        setColor: (state, action: PayloadAction<string>) => {
            state.color.push(action.payload);
        },
        removeColor: (state, action: PayloadAction<string>) => {
            if (state.color.includes(action.payload)) {
                state.color = state.color.reduce(
                    (acc, color) => {
                        if (color !== action.payload) acc.push(color);
                        return acc;
                    },
                    [] as string[],
                );
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
                state.brand = action.payload.brandDetails;
                state.products = action.payload.products;
                state.totalPage = action.payload.totalPage;
            })
            .addCase(fetchBrandDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }),
});

export const { actions: brandDetailsActions, reducer: brandDetailsReducer } =
    brandDetailsSlice;
