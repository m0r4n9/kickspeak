import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminBrandDetails } from '../types/adminBrandDetailsSchema.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { getAdminBrandDetailsForm } from '../../model/selectors/getAdminBrandDetailsForm/getAdminBrandDetailsForm.ts';
import { AxiosError, isAxiosError } from 'axios';

export const updateBrand = createAsyncThunk<
    AdminBrandDetails,
    { logo?: File },
    ThunkConfig<ErrorInterface>
>('AdminBrandEditPage/updateBrand', async (data, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI;

    console.log(data.logo);

    const formData = new FormData();
    const brandForm = getAdminBrandDetailsForm(getState());

    // fix
    if (!brandForm) {
        return rejectWithValue({
            message: 'Произошла ошибка при обновление бренда',
        });
    }

    if (data.logo) formData.append('logo', data.logo);
    if (brandForm.name) formData.append('name', brandForm.name);
    if (brandForm.foundation) formData.append('foundation', brandForm.foundation);
    if (brandForm.country) formData.append('country', brandForm.country);

    try {
        const response = await extra.api.put<AdminBrandDetails>(
            `/admin/brand/update/${brandForm.id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return response.data;
    } catch (e) {
        if (isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({
            message: 'Произошла ошибка при обновление бренда',
        });
    }
});
