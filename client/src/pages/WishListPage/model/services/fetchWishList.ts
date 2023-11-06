import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ErrorInterface.ts';
import {AxiosError, isAxiosError} from "axios";

export const fetchWishList = createAsyncThunk<
    Product[],
    void,
    ThunkConfig<ErrorInterface>
>('WishListPage/fetchWishList', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<Product[]>("/wishlist");
        return response.data;
    } catch (e) {
        if (isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({message: 'Произошла непредвиденная ошибка'});
    }
});
