import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCarts } from '../fetchCarts/fetchCarts.ts';
import { getCartProducts } from '../../slice/cartSlice.ts';
import { ProductData } from '../../types/Cart.ts';
import { getUserAuthData } from '@/entities/User';

interface AddProductCartProps {
    productId: number;
    sizeId: number;
}

export const addProductCart = createAsyncThunk<
    ProductData,
    AddProductCartProps,
    ThunkConfig<string>
>('Cart/addProductCart', async (data, thunkAPI) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkAPI;

    const userData = getUserAuthData(getState());

    if (!userData) {
        return rejectWithValue('Пользователь не авторизован');
    }

    const productsInCart = getCartProducts.selectAll(getState());
    const productsByID = productsInCart.filter(
        (product) => product.Sizes.id === data.sizeId,
    );

    if (productsByID.length) {
        return rejectWithValue('Данный товар уже есть в коризне');
    }

    try {
        const response = await extra.api.post<ProductData>('/add-to-cart', {
            userId: userData?.id,
            productId: data.productId,
            sizeId: data.sizeId,
        });
        dispatch(fetchCarts());
        return response.data;
    } catch (e) {
        return rejectWithValue('Произошла ошибка');
    }
});
