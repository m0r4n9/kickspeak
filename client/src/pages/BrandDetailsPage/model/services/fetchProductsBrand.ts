import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsBrand = createAsyncThunk<
    void,
    void,
    ThunkConfig<ErrorInterface>
>('brandDetailsPage/fetchProductsBrand', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
    } catch (e) {
        console.log('Error Fetch Products Details:', e);
    }
});
