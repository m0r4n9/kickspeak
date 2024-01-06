import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, isAxiosError } from 'axios';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const createSize = createAsyncThunk<
    void,
    { name: string; quantity: number; productId: string },
    ThunkConfig<ErrorInterface>
>('AdminProductEditPage/createSize', async (data, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;

    try {
        await extra.api.post('/admin/size/create', {
            data,
        });
    } catch (e) {
        if (isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({
            message: 'Произошла непредвиденная ошибка',
        });
    }
});
