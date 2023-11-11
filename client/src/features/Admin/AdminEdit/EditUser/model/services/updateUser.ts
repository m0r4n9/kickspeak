import {createAsyncThunk} from '@reduxjs/toolkit';
import {Profile} from '@/entities/Profile';
import {ThunkConfig} from '@/app/providers/StoreProvider';
import {getAdminUserDetailsForm} from '../selectors/getAdminuserDetailsForm/getAdminuserDetailsForm.ts';
import {ErrorInterface} from '@/shared/interfaces/ApiError';
import axios, {AxiosError} from 'axios';

export const updateUser = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ErrorInterface>
>('AdminUserDetailsPage/updateUser', async (_, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI;
    const formData = getAdminUserDetailsForm(getState());

    try {
        const response = await extra.api.put<Profile>(
            `admin/users/${formData?.id}`,
            formData,
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({
            message: 'Произошла ошибка при обновление профиля',
        });
    }
});
