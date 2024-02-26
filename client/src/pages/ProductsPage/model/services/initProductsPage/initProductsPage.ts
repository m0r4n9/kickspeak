import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductstInited } from '../../selectors/productsPageSelector.ts';
import { productsPageActions } from '../../slice/productsPageSlice.ts';
import { fetchProductsList } from '../fetchProductsList/fetchProductsList.ts';
import { ProductColor, ProductSexField, SortOrder } from '@/entities/Product';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const initProductsPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('productsPage/initProductsPage', async (searchParams, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const inited = getProductstInited(getState());

    if (!inited) {
        console.log('initProductsPage service');
        const orderFromURL = searchParams.get('order') as SortOrder;
        const sexFromURL = searchParams
            .get('sex')
            ?.split(',') as ProductSexField[];
        const colorsFromURL: (typeof ProductColor)[] = searchParams
            .get('colors')
            ?.split(',') as any;
        const optionPrices = searchParams.get('price')?.split(',') as string[];

        if (orderFromURL) dispatch(productsPageActions.setOrder(orderFromURL));
        if (sexFromURL)
            sexFromURL.map((sex) => dispatch(productsPageActions.setSex(sex)));
        if (colorsFromURL) {
            colorsFromURL.map((color) =>
                dispatch(productsPageActions.setColor(color)),
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
    }
});
