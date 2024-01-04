import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    AdminProductsData,
    ResProductsAdmin,
} from '@/pages/AdminPages/Products/AdminProductsPage/model/types/AdminProductsSchema.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { AxiosError, isAxiosError } from 'axios';
import { getAdminProductsPage } from '../selectors/getAdminProductsPage/getAdminProductsPage.ts';
import { getAdminProductsLimit } from '../selectors/getAdminProductsLimit/getAdminProductsLimit.ts';

export const fetchProductsAdmin = createAsyncThunk<
    ResProductsAdmin,
    void,
    ThunkConfig<ErrorInterface>
>('AdminProducts/fetchProductsAdmin', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const page = getAdminProductsPage(getState());
    const limit = getAdminProductsLimit(getState());

    try {
        const response = await extra.api.get<ResProductsAdmin>(
            '/admin/products',
            {
                params: {
                    _limit: limit,
                    _page: page,
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
