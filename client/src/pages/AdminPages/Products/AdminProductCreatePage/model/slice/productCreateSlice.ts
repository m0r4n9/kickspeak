import { ProductCreateSchema } from '../types/ProductCreateSchema.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProductCreateSchema = {
    isLoading: false,

    name: '',
    price: 0,
    code: '',
    sex: 'U',
    colors: [],
    sizes: [],
    images: [],
};

const productCreateSlice = createSlice({
    name: 'productCreateSlice',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setPrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload;
        },
        setCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
        setSex: (state, action: PayloadAction<"U" | "W" | "M">) => {
            state.sex = action.payload;
        },
    },
});

export const { actions: productCreateActions, reducer: productCreateReducer } =
    productCreateSlice;
