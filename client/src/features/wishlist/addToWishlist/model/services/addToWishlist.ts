import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addToWishlist = createAsyncThunk<
    void,
    { productId: string },
    ThunkConfig<string>
>('wishlist/addToWishlist', async ({ productId }, thunkAPI) => {
    const { extra, getState, rejectWithValue } = thunkAPI;
    const user = getUserAuthData(getState());

    if (!user) {
        return rejectWithValue('Пользователь не авторизован.');
    }

    try {
        await extra.api.post('/wishlist', {
            userId: user.id,
            productId,
        });
    } catch (e) {
        console.log('@ - Error wishlist:', e);
    }
});
