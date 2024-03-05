import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema.ts';
import { AxiosError, isAxiosError } from 'axios';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import type { ColorsFilter } from '../../types/productsPageSchema.ts';

export const fetchSizes = createAsyncThunk<
    ColorsFilter[],
    string | undefined,
    ThunkConfig<ErrorInterface>
>('productsPage/fetchSizes', async (query, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get('/catalog/sizes', {
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
