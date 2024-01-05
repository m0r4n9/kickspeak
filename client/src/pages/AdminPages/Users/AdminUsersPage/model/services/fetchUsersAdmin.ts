import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UsersData } from '../types/AdminUsersSchema.ts';
import { getUsersAdminPage } from '../selectors/getUsersAdminPage/getUsersAdminPage.ts';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { getUsersAdminLimit } from '../selectors/getUsersAdminLimit/getUsersAdminLimit.ts';
import {
    getUsersAdminQuery
} from "../selectors/getUsersAdminQuery/getUsersAdminQuery.ts";

export const fetchUsersAdmin = createAsyncThunk<
    UsersData,
    void,
    ThunkConfig<ErrorInterface>
>('AdminPage/fetchBrandsAdmin', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const limit = getUsersAdminLimit(getState());
    const page = getUsersAdminPage(getState());
    const query = getUsersAdminQuery(getState());

    try {
        const response = await extra.api.get<UsersData>('/admin/users', {
            params: {
                _limit: limit,
                _page: page,
                _query: query
            },
        });
        return response.data;
    } catch (e) {
        return rejectWithValue({
            message: 'Произошла ошибка при получении пользователей',
        });
    }
});
