import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductsData} from "@/pages/AdminPages/AdminProductsPage/model/types/adminProductsSchema.ts";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {getAdminProductsPage} from "@/pages/AdminPages/AdminProductsPage/model/selectors/adminProductsSelectors.ts";

export const fetchProductsAdmin = createAsyncThunk<
ProductsData,
void,
ThunkConfig<string>>(
    "AdminProductsPage/fetchProductsAdmin", async (_, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI;
        const page = getAdminProductsPage(getState());

        try {
            const response = await extra.api.get<ProductsData>("/admin/products", {
                params: {
                    _page: page,
                    _limit: 15
                }
            });
            return response.data;
        } catch (e) {
            return rejectWithValue("Не удалось получить данные о продуктах");
        }
    }
);
