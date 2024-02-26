import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import type {
    Product,
    ProductColor,
    ProductSexField,
    SortOrder,
} from '@/entities/Product';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ProductsPageSchema } from '../types/productsPageSchema.ts';
import { fetchProductsList } from '../services/fetchProductsList/fetchProductsList.ts';

const productsAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.id,
});

export const getProducts = productsAdapter.getSelectors<StateSchema>(
    (state: StateSchema) =>
        state.productsPage || productsAdapter.getInitialState(),
);

const productsPageSlice = createSlice({
    name: 'productsPageSlice',
    initialState: productsAdapter.getInitialState<ProductsPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        page: 1,
        limit: 10,
        totalPage: 1,
        maxPriceDB: undefined,
        minPriceDB: undefined,
        _inited: false,
        filters: {
            order: '',
            color: [],
            sex: [],
            minPrice: 0,
            maxPrice: 0,
        },
    }),
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setPriceStart: (state, action: PayloadAction<number>) => {
            state.filters.minPrice = action.payload;
        },
        setPriceEnd: (state, action: PayloadAction<number>) => {
            state.filters.maxPrice = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.filters.order = action.payload;
        },
        setColor: (state, action: PayloadAction<typeof ProductColor>) => {
            state.filters.color.push(action.payload);
        },
        removeColor: (state, action: PayloadAction<typeof ProductColor>) => {
            if (state.filters.color.includes(action.payload)) {
                state.filters.color = state.filters.color.reduce(
                    (acc, color) => {
                        if (color !== action.payload) acc.push(color);
                        return acc;
                    },
                    [] as (typeof ProductColor)[],
                );
            }
        },
        setSex: (state, action: PayloadAction<ProductSexField>) => {
            state.filters.sex.push(action.payload);
        },
        removeSex: (state, action: PayloadAction<ProductSexField>) => {
            if (state.filters.sex.includes(action.payload)) {
                state.filters.sex = state.filters.sex.reduce((acc, sex) => {
                    if (sex !== action.payload) acc.push(sex);
                    return acc;
                }, [] as ProductSexField[]);
            }
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        clearFilters: (state) => {
            state.filters.color = [];
            state.filters.maxPrice = state.maxPriceDB || 50000;
            state.filters.minPrice = 0;
            state.filters.sex = [];
        },
        initState: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                if (action.meta.arg.replace) {
                    productsAdapter.removeAll(state);
                }
            })
            .addCase(fetchProductsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalPage = action.payload.totalPage;
                if (!state.maxPriceDB) {
                    state.maxPriceDB = state.filters.maxPrice =
                        action.payload.maxPriceDB;
                    state.minPriceDB = action.payload.minPriceDB;
                }

                if (action.meta.arg.replace) {
                    productsAdapter.setAll(state, action.payload.products);
                } else {
                    productsAdapter.addMany(state, action.payload.products);
                }
            })
            .addCase(fetchProductsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productsPageActions, reducer: productsPageReducer } =
    productsPageSlice;
