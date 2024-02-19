import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import axios, { AxiosError } from 'axios';
import { ErrorInterface } from '@/shared/interfaces/ApiError';

interface registrationUserProps {
    email: string;
    password: string;
}

export const signUp = createAsyncThunk<
    void,
    registrationUserProps,
    ThunkConfig<ErrorInterface>
>('AuthUser/registrationUser', async (userData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post('/registration', userData);
        dispatch(userActions.setAuthData(response.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({ message: '' });
    }
});
