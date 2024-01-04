import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { getAdminProductDetailsData } from '../selectors/getAdminProductDetailsData/getAdminProductDetailsData.ts';
import {AxiosError, isAxiosError} from "axios";

export const deleteProduct = createAsyncThunk<
    boolean,
    void,
    ThunkConfig<ErrorInterface>
>('AdminProductDetailsPage/deleteProduct', async (_, thunkApi) => {
    const { rejectWithValue, extra, getState } = thunkApi;
    const id = getAdminProductDetailsData(getState())?.id;
    if (!id) {
        return rejectWithValue({message: "Продукта с таким id нет"});
    }

    try {
        await extra.api.delete(`/admin/product/delete/${id}`);
        return true;
    } catch (e) {
        if (isAxiosError(e)) {
            const serverError = e as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({ message: 'Произошла непредвиденная ошибка' });
    }
});
