import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, isAxiosError } from 'axios';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const updateSize = createAsyncThunk<
    void,
    { id: string, quantity: number },
    ThunkConfig<ErrorInterface>
>('AdminProductEditPage/createSize', async (data, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;

    if (!data.id) {
        return rejectWithValue({message: "Id не найден"});
    }

    try {
        await extra.api.put(`/admin/size/update/${data.id}`, {
            quantity: data.quantity
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
