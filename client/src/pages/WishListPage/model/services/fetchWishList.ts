import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { AxiosError, isAxiosError } from 'axios';
import { getUserAuthData } from '@/entities/User';

export const fetchWishList = createAsyncThunk<
    Product[],
    void,
    ThunkConfig<ErrorInterface>
>('WishListPage/fetchWishList', async (_, thunkAPI) => {
    const { extra, getState, rejectWithValue } = thunkAPI;
    const user = getUserAuthData(getState());

    if (!user) {
        return rejectWithValue({ message: 'Пользователь не авторизован' });
    }

    try {
        const response = await extra.api.get<Product[]>(
            `/wishlist?userId=${user.id}`,
        );
        return response.data;
    } catch (e) {
        if (isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({ message: 'Произошла непредвиденная ошибка' });
    }
});
