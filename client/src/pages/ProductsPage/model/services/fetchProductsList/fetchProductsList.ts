import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema.ts';
import {
    getProductSex,
    getProductsLimit,
    getProductsOrder,
    getProductsPageNumber,
} from '../../selectors/productsPageSelector.ts';
import { getProductsFilterColors } from '../../selectors/getProductsColors/getProductsColors.ts';
import { addQueryParams } from '@/shared/lib/url/addQueryParams';
import { FetchProductsData } from '../../types/productsPageSchema.ts';
import {
    getProductsMaxPrice,
    getProductsMinPrice,
} from '@/pages/ProductsPage/model/selectors/getProductPrices/getProductPrices.ts';
import { getProductFilterBrands } from '@/pages/ProductsPage/model/selectors/getProductBrands/getProductBrands.ts';

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
    const colors = getProductsFilterColors(getState())?.join(',');
    const brands = getProductFilterBrands(getState())?.join(',');
    const sex = getProductSex(getState())?.join(',');

    const min = getProductsMinPrice(getState());
    const max = getProductsMaxPrice(getState());

    try {
        addQueryParams({
            sex,
            colors,
            brands,
            order,
        });
        const response = await extra.api.get<FetchProductsData>('/catalog', {
            params: {
                _order: order,
                _limit: limit,
                _page: page,
                _price: `${min},${max}`,
                _color: colors,
                _sex: sex,
                _brands: brands,
            },
        });
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Error');
    }
});
