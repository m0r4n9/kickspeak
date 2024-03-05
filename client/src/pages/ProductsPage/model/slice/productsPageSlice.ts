import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import type { Product, ProductSexField, SortOrder } from '@/entities/Product';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ProductsPageSchema } from '../types/productsPageSchema.ts';
import { fetchProductsList } from '../services/fetchProductsList/fetchProductsList.ts';
import { fetchColors } from '../services/fetchColors/fetchColors.ts';
import { fetchListBrands } from '@/pages/ProductsPage/model/services/fetchListBrands/fetchListBrands.ts';
import { fetchSizes } from '@/pages/ProductsPage/model/services/fetchSizes/fetchSizes.ts';

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
            brands: [],
            sex: [],
            sizes: [],
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
        setColor: (state, action: PayloadAction<string>) => {
            state.filters.color.push(action.payload);
        },
        removeColor: (state, action: PayloadAction<string>) => {
            if (state.filters.color.includes(action.payload)) {
                state.filters.color = state.filters.color.reduce(
                    (acc, color) => {
                        if (color !== action.payload) acc.push(color);
                        return acc;
                    },
                    [] as string[],
                );
            }
        },
        setSize: (state, action: PayloadAction<string>) => {
            state.filters.sizes.push(action.payload);
        },
        removeSize: (state, action: PayloadAction<string>) => {
            if (state.filters.sizes.includes(action.payload)) {
                state.filters.sizes = state.filters.sizes.reduce(
                    (acc, color) => {
                        if (color !== action.payload) acc.push(color);
                        return acc;
                    },
                    [] as string[],
                );
            }
        },
        setBrand: (state, action: PayloadAction<string>) => {
            state.filters.brands.push(action.payload);
        },
        removeBrand: (state, action: PayloadAction<string>) => {
            state.filters.brands = state.filters.brands.reduce((acc, brand) => {
                if (brand !== action.payload) acc.push(brand);
                return acc;
            }, [] as string[]);
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
            state.filters.brands = [];
            state.filters.maxPrice = state.maxPriceDB || 50000;
            state.filters.minPrice = 0;
            state.filters.sex = [];
        },
        resetColors: (state) => {
            state.filters.color = [];
        },
        resetSizes: (state) => {
            state.filters.sizes = [];
        },
        resetBrands: (state) => {
            state.filters.brands = [];
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
            })

            .addCase(fetchColors.fulfilled, (state, action) => {
                state.colors = action.payload;
            })

            .addCase(fetchListBrands.fulfilled, (state, action) => {
                state.brands = action.payload;
            })
            .addCase(fetchSizes.fulfilled, (state, action) => {
                state.sizes = action.payload;
            });
    },
});

export const { actions: productsPageActions, reducer: productsPageReducer } =
    productsPageSlice;
