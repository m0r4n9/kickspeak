import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema.ts';
import {
    getProductOptionPrice,
    getProductsColor,
    getProductSex,
    getProductsLimit,
    getProductsOrder,
    getProductsPageNumber,
} from '../../selectors/productsPageSelector.ts';
import { addQueryParams } from '@/shared/lib/url/addQueryParams';
import { FetchProductsData } from '../../types/productsPageSchema.ts';

interface FetchProductsListProps {
    replace?: boolean;
}

export const fetchProductsList = createAsyncThunk<
    FetchProductsData,
    FetchProductsListProps,
    ThunkConfig<string>
>('productsPage/fetchProductsList', async (props, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;
    const limit = getProductsLimit(getState());
    const page = getProductsPageNumber(getState());
    const order = getProductsOrder(getState());
    const colors = getProductsColor(getState())?.join(',');
    const sex = getProductSex(getState())?.join(',');

    const { min, max } = getProductOptionPrice(getState());

    try {
        addQueryParams({
            sex,
            colors,
            order,
        });
        const response = await extra.api.get<FetchProductsData>('/products', {
            params: {
                _order: order,
                _limit: limit,
                _page: page,
                _price: `${min},${max}`,
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
