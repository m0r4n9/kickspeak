import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    AdminProductsData,
    ResProductsAdmin
} from "@/pages/AdminPages/Products/AdminProductsPage/model/types/AdminProductsSchema.ts";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {ErrorInterface} from "@/shared/interfaces/ApiError";
import {AxiosError, isAxiosError} from "axios";

export const fetchProductsAdmin = createAsyncThunk<
    ResProductsAdmin,
    void,
    ThunkConfig<ErrorInterface>
>('AdminProducts/fetchProductsAdmin', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<ResProductsAdmin>('/admin/products');
        return response.data;
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