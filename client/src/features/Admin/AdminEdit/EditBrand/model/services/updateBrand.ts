import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminBrandDetails } from '../types/adminBrandDetailsSchema.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import axios, { AxiosError } from 'axios';
import { getAdminBrandDetailsForm } from '../../model/selectors/getAdminBrandDetailsForm/getAdminBrandDetailsForm.ts';

export const updateBrand = createAsyncThunk<
    AdminBrandDetails,
    void,
    ThunkConfig<ErrorInterface>
>('AdminBrandDetailsPage/updateBrand', async (_, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI;

    const formData = getAdminBrandDetailsForm(getState());

    try {
        const response = await extra.api.put<AdminBrandDetails>(
            `/admin/brand/update/${formData?.id}`,
            formData,
        );
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({
            message: 'Произошла ошибка при обновление профиля',
        });
    }
});