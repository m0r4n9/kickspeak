import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchSchema } from '../types/SearchSchema.ts';
import { searchProducts } from '@/features/Search/model/services/searchProducts.ts';

const initialState: SearchSchema = {
    isLoading: false,
    query: '',
};

const searchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        clearQuery: (state) => {
            state.query = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.result = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: searchActions, reducer: searchReducer } = searchSlice;
