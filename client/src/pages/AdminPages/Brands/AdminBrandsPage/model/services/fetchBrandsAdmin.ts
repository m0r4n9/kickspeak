import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {getBrandsAdminLimit, getBrandsAdminPage, getBrandsAdminSortParams} from '../selectors/adminBrandsSelectors.ts';
import { BrandsData } from '../types/AdminBrandsSchema.ts';
import { AxiosError, isAxiosError } from 'axios';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import {json} from "react-router-dom";

export const fetchBrandsAdmin = createAsyncThunk<
    BrandsData,
    void,
    ThunkConfig<ErrorInterface>
>('AdminPage/fetchBrandsAdmin', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const page = getBrandsAdminPage(getState());
    const limit = getBrandsAdminLimit(getState());

    try {
        const response = await extra.api.get<BrandsData>('/admin/brands', {
            params: {
                _limit: limit,
                _page: page,
            },
        });
        return response.data;
    } catch (e) {
        if (isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError.response && serverError) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({ message: 'Произошла непредвиденная ошибка' });
    }
});
