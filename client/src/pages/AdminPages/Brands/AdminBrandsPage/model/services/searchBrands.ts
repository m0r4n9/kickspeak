import { createAsyncThunk } from '@reduxjs/toolkit';
import { BrandsData } from '../types/AdminBrandsSchema.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { AxiosError, isAxiosError } from 'axios';
import { getBrandsAdminQuery } from '../selectors/adminBrandsSelectors.ts';
import { adminBrandActions } from '../slice/adminBrandsSlice.ts';

export const searchBrands = createAsyncThunk<
    BrandsData,
    void,
    ThunkConfig<ErrorInterface>
>('AdminBrandsPage/searchBrands', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const query = getBrandsAdminQuery(getState()) || '';

    try {
        const response = await extra.api.get<BrandsData>(
            '/admin/brands/search',
            {
                params: {
                    query,
                    _limit: 15,
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
        return rejectWithValue({ message: 'Произошла непредвиденная ошибка' });
    }
});
