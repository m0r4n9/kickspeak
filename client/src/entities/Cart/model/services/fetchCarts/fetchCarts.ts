import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductData } from '../../types/Cart.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';

export const fetchCarts = createAsyncThunk<
    ProductData[],
    void,
    ThunkConfig<string>
>('Cart/fetchCarts', async (_, thunkAPI) => {
    const { extra, getState, rejectWithValue } = thunkAPI;
    const userData = getUserAuthData(getState());

    if (!userData) {
        return rejectWithValue('Пользователь не автрризован.');
    }

    try {
        const response = await extra.api.get<ProductData[]>(`/checkout`, {
            params: {
                userId: userData?.id,
            },
        });
        return response.data;
    } catch (e) {
        return rejectWithValue('Проиошла ошибка');
    }
});
