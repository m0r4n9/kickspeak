import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReturnBrandDetailsData } from '../types/brandDetailsSchema.ts';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import axios, { AxiosError } from 'axios';
import { getBrandDetailsLimit } from '../selectors/getBrandDetailsLimit/getBrandDetailsLimit.ts';
import { getBrandDetailsOrder } from '../selectors/getBrandDetailsOrder/getBrandDetailsOrder.ts';
import { getBrandDetailsColor } from '../selectors/getBrandDetailsColor/getBrandDetailsColor.ts';
import { getBrandDetailsStartPrice } from '../selectors/getBrandDetailsStartPrice/getBrandDetailsStartPrice.ts';
import { getBrandDetailsEndPrice } from '../selectors/getBrandDetailsEndPrice/getBrandDetailsEndPrice.ts';
import { getBrandDetailsSex } from '../selectors/getBrandDetailsSex/getBrandDetailsSex.ts';
import { getBrandPage } from '../selectors/getBrandPage/getBrandPage.ts';

export const fetchBrandDetails = createAsyncThunk<
    ReturnBrandDetailsData,
    string,
    ThunkConfig<ErrorInterface>
>('BrandDetailsPage/fetchBrandDetails', async (brandId, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;
    const page = getBrandPage(getState());
    const limit = getBrandDetailsLimit(getState());
    const order = getBrandDetailsOrder(getState());
    const color = getBrandDetailsColor(getState())?.join(',');
    const priceStart = getBrandDetailsStartPrice(getState());
    const priceEnd = getBrandDetailsEndPrice(getState());
    const sex = getBrandDetailsSex(getState())?.join(',');

    try {
        const response = await extra.api.get<ReturnBrandDetailsData>(
            `/brand/${brandId}`,
            {
                params: {
                    _order: order,
                    _limit: limit,
                    _page: page,
                    _price: `${priceStart},${priceEnd}`,
                    _color: color,
                    _sex: sex,
                },
            },
        );
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({ message: 'Произошла непредвиденная ошибка' });
    }
});
