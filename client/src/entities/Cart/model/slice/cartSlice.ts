import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { fetchCarts } from '../services/fetchCarts/fetchCarts.ts';
import { addProductCart } from '../services/addProductCart/addProductCart.ts';
import { removeProductCart } from '../services/removeProductCart/removeProductCart.ts';
import { CartSchema, ProductData } from '../types/Cart.ts';
import { StateSchema } from '@/app/providers/StoreProvider';

const cartProductsAdapter = createEntityAdapter<ProductData>({
    selectId: (cartProduct) => `${cartProduct.id}-${cartProduct.Sizes.id}`,
});

export const getCartProducts = cartProductsAdapter.getSelectors<StateSchema>(
    (state: StateSchema) => state.cart || cartProductsAdapter.getInitialState(),
);

const cartSlice = createSlice({
    name: 'Cart',
    initialState: cartProductsAdapter.getInitialState<CartSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {
        clearCart: (state) => {
            cartProductsAdapter.removeAll(state);
        },
        clearError: (state) => {
            state.error = undefined;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchCarts.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchCarts.fulfilled,
                (state, action: PayloadAction<ProductData[]>) => {
                    state.isLoading = false;
                    cartProductsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchCarts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(addProductCart.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                addProductCart.fulfilled,
                (state, action: PayloadAction<ProductData>) => {
                    state.isLoading = false;
                    cartProductsAdapter.addOne(state, action.payload);
                },
            )
            .addCase(addProductCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(removeProductCart.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(removeProductCart.fulfilled, (state, action) => {
                state.isLoading = false;
                cartProductsAdapter.removeOne(state, action.payload);
            })
            .addCase(removeProductCart.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.payload;
            }),
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
