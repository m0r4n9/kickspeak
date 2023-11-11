import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User.ts';
import { userActions } from '../../silce/userSlice.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const checkAuth = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/checkAuth',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<User>('/refresh');
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(e?.response?.data);
        }
    },
);
