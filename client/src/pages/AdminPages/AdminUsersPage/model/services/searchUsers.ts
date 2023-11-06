import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ErrorInterface.ts';
import axios, { AxiosError } from 'axios';
import { UsersData } from '../types/AdminUsersSchema.ts';
import { getUsersAdminQuery } from '../selectors/getUsersAdminQuery/getUsersAdminQuery.ts';
import { adminUsersActions } from '../slice/adminUsersSlice.ts';

export const searchUsers = createAsyncThunk<
    UsersData,
    { query: string },
    ThunkConfig<ErrorInterface>
>('AdminUsersPage/searchUsers', async (data, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    const query = getUsersAdminQuery(getState());
    dispatch(adminUsersActions.setPage(1));

    try {
        const response = await extra.api.get<UsersData>('/admin/search/users', {
            params: { query, _limit: 15 },
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
