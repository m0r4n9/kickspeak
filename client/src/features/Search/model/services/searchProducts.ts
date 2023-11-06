import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {ResultSearch} from "../types/SearchSchema.ts";

export const searchProducts = createAsyncThunk<
    ResultSearch,
    string,
    ThunkConfig<string>
>("Search/searchProducts", async (query, thunkApi) => {
    const {extra, rejectWithValue} = thunkApi;

    try {
        const response = await extra.api.get<ResultSearch>('/search', {
            params: {
                query: query,
            }
        });
        return response.data;
    } catch (e) {
        console.error(e);
        return rejectWithValue("Произошла ошибка в поиске");
    }
});
