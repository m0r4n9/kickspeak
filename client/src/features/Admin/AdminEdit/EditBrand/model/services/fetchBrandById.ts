import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminBrandDetails } from '@/features/Admin/AdminEdit/EditBrand/model/types/adminBrandDetailsSchema.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import axios, { AxiosError } from 'axios';

export const fetchBrandById = createAsyncThunk<
    AdminBrandDetails,
    { id: string },
    ThunkConfig<ErrorInterface>
>('AdminBrandDetailsPage/fetchBrandById', async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<AdminBrandDetails>(
            `/admin/brand/${data.id}`,
        );
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({ message: 'Произошла непредвиденная ошибка' });
    }
});
