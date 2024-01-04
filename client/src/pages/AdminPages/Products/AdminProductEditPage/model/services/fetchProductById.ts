import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { AxiosError, isAxiosError } from 'axios';

export const fetchProductById = createAsyncThunk<
    Product,
    string,
    ThunkConfig<ErrorInterface>
>('AdminProductDetails/fetchProductById', async (id, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<Product>(`/admin/product/${id}`);
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
