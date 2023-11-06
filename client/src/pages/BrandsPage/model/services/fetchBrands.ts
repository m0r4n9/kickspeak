import {createAsyncThunk} from "@reduxjs/toolkit";
import {Brand} from "@/entities/Brand";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const fetchBrands = createAsyncThunk<
    Brand[],
    void,
    ThunkConfig<string>
>('brandsPage/fetchBrads', async (_: void, thunkAPI) => {
    const {extra, rejectWithValue} = thunkAPI;

    try {
        const response = await extra.api.get<Brand[]>('/brands', );
        return response.data;
    } catch (e) {
        return rejectWithValue("Error brands fetch");
    }
});
