import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminBrandDetails } from '../types/adminBrandDetailsSchema.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import axios, { AxiosError } from 'axios';
import { getAdminBrandDetailsForm } from '../../model/selectors/getAdminBrandDetailsForm/getAdminBrandDetailsForm.ts';
import { Brand } from '@/entities/Brand';

export const updateBrand = createAsyncThunk<
    AdminBrandDetails,
    { logo?: File },
    ThunkConfig<ErrorInterface>
>('AdminBrandDetailsPage/updateBrand', async (data, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI;

    const formData = new FormData();
    const brandForm = getAdminBrandDetailsForm(getState()) || {};

    if (data.logo) formData.append('logo', data.logo);

    Object.keys(brandForm).forEach((key) => {
        const brandKey = key as keyof Brand;
        if (brandKey !== 'productCount') {
            formData.append(`brand[${brandKey}]`, brandForm[brandKey] || '');
        }
    });

    try {
        const response = await extra.api.put<AdminBrandDetails>(
            `/admin/brand/update/${brandForm?.id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
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
