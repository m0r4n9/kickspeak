import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';

type request = 'add' | 'delete';

export const addToWishlist = createAsyncThunk<
    request,
    { productId: string },
    ThunkConfig<string>
>('wishlist/addToWishlist', async ({ productId }, thunkAPI) => {
    const { extra, getState, rejectWithValue } = thunkAPI;
    const user = getUserAuthData(getState());

    if (!user) {
        return rejectWithValue('Пользователь не авторизован.');
    }

    try {
        const response = await extra.api.post<request>('/wishlist', {
            userId: user.id,
            productId,
        });
        return response.data;
    } catch (e) {
        console.log('@ - Error wishlist:', e);
        return rejectWithValue('Error wishlist');
    }
});
