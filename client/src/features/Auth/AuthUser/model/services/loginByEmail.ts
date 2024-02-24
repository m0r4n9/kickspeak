import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import axios, { AxiosError } from 'axios';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { fetchCarts } from '@/entities/Cart';

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<
    void,
    LoginByEmailProps,
    ThunkConfig<ErrorInterface>
>('login/loginByEmail', async (authData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post('/login', authData);
        dispatch(userActions.setAuthData(response.data));
        dispatch(fetchCarts());
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({ message: 'Произошла непредвиденная ошибка' });
    }
});
