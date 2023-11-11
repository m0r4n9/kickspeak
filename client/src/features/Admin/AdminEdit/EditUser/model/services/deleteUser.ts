import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getAdminUserDetailsData } from '../selectors/getAdminUserDetailsData/getAdminUserDetailsData.ts';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import axios, { AxiosError } from 'axios';

export const deleteUser = createAsyncThunk<
    void,
    void,
    ThunkConfig<ErrorInterface>
>('AdminUserDetailsPage/deleteUser', async (_, thunkAPI) => {
    const { extra, getState, rejectWithValue } = thunkAPI;

    const userId = getAdminUserDetailsData(getState())?.id;

    try {
        const response = await extra.api.delete(`/admin/users/${userId}`);
        return response.data;
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
