import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import axios, { AxiosError } from 'axios';
import { getBrandCreateName } from '@/pages/AdminPages/Brands/AdminBrandCreatePage/model/selectors/getBrandCreateName/getBrandCreateName.ts';
import { getBrandCreateFoundation } from '@/pages/AdminPages/Brands/AdminBrandCreatePage/model/selectors/getBrandCreateFoundation/getBrandCreateFoundation.ts';
import { getBrandCreateCountry } from '@/pages/AdminPages/Brands/AdminBrandCreatePage/model/selectors/getBrandCreateCountry/getBrandCreateCountry.ts';
import { getBrandCreateLogo } from '@/pages/AdminPages/Brands/AdminBrandCreatePage/model/selectors/getBrandCreateLogo/getBrandCreateLogo.ts';


export const createBrand = createAsyncThunk<
    string,
    { logo: File | undefined },
    ThunkConfig<ErrorInterface>
>('AdminBrandCreate/createBrand', async (data, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const name = getBrandCreateName(getState()) || '';
    const foundation = getBrandCreateFoundation(getState())?.toString() || '';
    const country = getBrandCreateCountry(getState()) || '';

    const formData = new FormData();

    if (data.logo) formData.append('logo', data.logo);

    formData.append('name', name);
    formData.append('foundation', foundation);
    formData.append('country', country);

    try {
        const response = await extra.api.post<string>('/admin/brand/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
