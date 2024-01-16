import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { Brand } from '@/entities/Brand';
import { StateSchema } from '@/app/providers/StoreProvider';
import { BrandsPageSchema } from '../types/brandsPageSchema.ts';
import { fetchBrands } from '../services/fetchBrands.ts';

const brandsAdapter = createEntityAdapter<Brand>({
    selectId: (brand) => brand.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const getBrands = brandsAdapter.getSelectors<StateSchema>(
    (state: StateSchema) => state.brandsPage || brandsAdapter.getInitialState(),
);

const brandsPageSlice = createSlice({
    name: 'brandsPageSlice',
    initialState: brandsAdapter.getInitialState<BrandsPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchBrands.fulfilled,
                (state, action: PayloadAction<Brand[]>) => {
                    state.isLoading = false;
                    brandsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: brandsPageReducer } =
    brandsPageSlice;
