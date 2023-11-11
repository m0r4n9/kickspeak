import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getBrandsAdminPage } from '../selectors/adminBrandsSelectors.ts';
import { BrandsData } from '../types/AdminBrandsSchema.ts';

export const fetchBrandsAdmin = createAsyncThunk<
    BrandsData,
    void,
    ThunkConfig<string>
>('AdminPage/fetchBrandsAdmin', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;
    const page = getBrandsAdminPage(getState());

    try {
        const response = await extra.api.get<BrandsData>('/admin/brands', {
            params: {
                _limit: 15,
                _page: page,
            },
        });
        return response.data;
    } catch (e) {
        return rejectWithValue('Произошла ошибка при получении брендов');
    }
});
