import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema.ts';
import {
    getProductsColor,
    getProductsEndPrice,
    getProductSex,
    getProductsLimit,
    getProductsOrder,
    getProductsPageNumber,
    getProductsStartPrice,
} from '../../selectors/productsPageSelector.ts';
import { Product } from '@/entities/Product';
import { addQueryParams } from '@/shared/lib/url/addQueryParams';

interface FetchProductsListProps {
    replace?: boolean;
}

interface ReturnedData {
    products: Product[];
    hasMore: boolean;
}

export const fetchProductsList = createAsyncThunk<
    ReturnedData,
    FetchProductsListProps,
    ThunkConfig<string>
>('productsPage/fetchProductsList', async (props, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;
    const limit = getProductsLimit(getState());
    const page = getProductsPageNumber(getState());
    const order = getProductsOrder(getState());
    const colors = getProductsColor(getState())?.join(',');
    const priceStart = getProductsStartPrice(getState());
    const priceEnd = getProductsEndPrice(getState());
    const sex = getProductSex(getState())?.join(',');

    try {
        addQueryParams({
            sex,
            colors,
            order,
        });
        const response = await extra.api.get<ReturnedData>('/products', {
            params: {
                _order: order,
                _limit: limit,
                _page: page,
                _price: `${priceStart},${priceEnd}`,
                _color: colors,
                _sex: sex,
            },
        });
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Error');
    }
});
