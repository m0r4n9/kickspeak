import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema.ts';
import { AxiosError, isAxiosError } from 'axios';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import type { BrandsFilter } from '../../types/productsPageSchema.ts';

export const fetchListBrands = createAsyncThunk<
    BrandsFilter[],
    string | undefined,
    ThunkConfig<ErrorInterface>
>('productsPage/fetchListBrands', async (query, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get('/catalog/brands', {
            params: {
                query,
            },
        });
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
