import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCarts } from '@/entities/Cart';
import { userActions } from '@/entities/User';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, isAxiosError } from 'axios';

export const signInAdmin = createAsyncThunk<
    void,
    { email: string; password: string },
    ThunkConfig<ErrorInterface>
>('AuthUser/signInAdmin', async (data, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post('/login', data);
        dispatch(userActions.setAuthData(response.data));
        dispatch(fetchCarts());
    } catch (e) {
        if (isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({ message: 'Произошла непредвиденная ошибка.' });
    }
});
