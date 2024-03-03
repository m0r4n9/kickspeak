import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductstInited } from '../../selectors/productsPageSelector.ts';
import { productsPageActions } from '../../slice/productsPageSlice.ts';
import { fetchProductsList } from '../fetchProductsList/fetchProductsList.ts';
import { ProductSexField, SortOrder } from '@/entities/Product';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchColors } from '../fetchColors/fetchColors.ts';
import { fetchListBrands } from '@/pages/ProductsPage/model/services/fetchListBrands/fetchListBrands.ts';

export const initProductsPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('productsPage/initProductsPage', async (searchParams, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const inited = getProductstInited(getState());

    if (!inited) {
        const orderFromURL = searchParams.get('order') as SortOrder;
        const sexFromURL = searchParams
            .get('sex')
            ?.split(',') as ProductSexField[];
        const colorsFromURL = searchParams.get('colors')?.split(',');
        const optionPrices = searchParams.get('price')?.split(',') as string[];
        const brandsFromURL = searchParams.get('brands')?.split(',');

        if (orderFromURL) dispatch(productsPageActions.setOrder(orderFromURL));
        if (sexFromURL)
            sexFromURL.map((sex) => dispatch(productsPageActions.setSex(sex)));

        if (colorsFromURL?.length) {
            colorsFromURL.map((color) =>
                dispatch(productsPageActions.setColor(color)),
            );
        }
        if (brandsFromURL?.length) {
            brandsFromURL.map((brand) =>
                dispatch(productsPageActions.setBrand(brand)),
            );
        }

        if (optionPrices) {
            const priceStart = Number(optionPrices[0]);
            const priceEnd = Number(optionPrices[1]);
            dispatch(productsPageActions.setPriceStart(priceStart));
            dispatch(productsPageActions.setPriceEnd(priceEnd));
        }

        dispatch(productsPageActions.initState());
        dispatch(fetchProductsList({}));
        dispatch(fetchColors());
        dispatch(fetchListBrands());
    }
});
