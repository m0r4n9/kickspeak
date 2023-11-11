import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UsersData } from '../types/AdminUsersSchema.ts';
import { getUsersAdminPage } from '../selectors/getUsersAdminPage/getUsersAdminPage.ts';
import { ErrorInterface } from '@/shared/interfaces/ApiError';

export const fetchUsersAdmin = createAsyncThunk<
    UsersData,
    void,
    ThunkConfig<ErrorInterface>
>('AdminPage/fetchBrandsAdmin', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;
    const page = getUsersAdminPage(getState());

    try {
        const response = await extra.api.get<UsersData>('/admin/users', {
            params: {
                _limit: 15,
                _page: page,
            },
        });
        return response.data;
    } catch (e) {
        return rejectWithValue({
            message: 'Произошла ошибка при получении пользователей',
        });
    }
});
