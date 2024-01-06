import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, isAxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';

export const deleteSize = createAsyncThunk<
    void,
    string,
    ThunkConfig<ErrorInterface>
>('AdminProductEditPage/deleteSize', async (id, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;

    try {
        await extra.api.delete(`/admin/size/${id}`);
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
