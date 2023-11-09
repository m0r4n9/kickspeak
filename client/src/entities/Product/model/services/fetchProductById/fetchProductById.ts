import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDetailsInfo } from '../../types/product.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchProductById = createAsyncThunk<
    ProductDetailsInfo,
    string | undefined,
    ThunkConfig<string>
>('productDetails/fetchProductById', async (productId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    let items: string[] = JSON.parse(
        localStorage.getItem('recentProducts') || '[]',
    );

    try {
        const response = await extra.api.get<ProductDetailsInfo>(
            `/goods/${productId}`,
            {
                params: {
                    recentProducts: items.slice(-4).join(','),
                },
            },
        );
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Error');
    }
});
