import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import {
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
        hasMore: true,
        _inited: false,
        order: '',
        color: [],
        sex: [],
        priceStart: 0,
        priceEnd: 0,
    }),
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
                state.hasMore = action.payload.hasMore;

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
