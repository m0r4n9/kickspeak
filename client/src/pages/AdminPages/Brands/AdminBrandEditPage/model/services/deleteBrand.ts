import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import {AxiosError, isAxiosError} from 'axios';
import {
    getAdminBrandDetailsData
} from "../selectors/getAdminBrandDetailsData/getAdminBrandDetailsData.ts";

export const deleteBrand = createAsyncThunk<
    boolean,
    void,
    ThunkConfig<ErrorInterface>
>('AdminBrandEditPage/deleteBrand', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const id = getAdminBrandDetailsData(getState())?.id;
    if (!id) {
        return rejectWithValue({message: "Бренда с таким id нет"});
    }

    try {
        await extra.api.delete(`/admin/brand/delete/${id}`);
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
