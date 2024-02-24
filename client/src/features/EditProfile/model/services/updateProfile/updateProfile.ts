import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { validateProfile } from '../validateProfile/validateProfile.ts';
import { ValidateProfileError } from '../../consts/consts.ts';

export const updateProfile = createAsyncThunk<
    Profile,
    {
        id?: string;
        name: string;
        surname: string;
        email: string;
        phoneNumber: string;
    },
    ThunkConfig<string>
>('profile/update', async (data, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    if (!data?.id) return rejectWithValue('Пользователь не авторизован');

    try {
        const response = await extra.api.put<Profile>(
            `/profile/${data.id}`,
            data,
        );
        return response.data;
    } catch (e) {
        return rejectWithValue('');
    }
});
