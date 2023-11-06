import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {fetchCarts} from "@/entities/Cart";

interface RemoveProductCartProps {
    productId: number;
    sizeId: number;
}

export const removeProductCart = createAsyncThunk<
    string,
    RemoveProductCartProps,
    ThunkConfig<string>>("Cart/removeProudctCart", async (data, thunkAPI) => {
    const {extra, dispatch, rejectWithValue} = thunkAPI;

    try {
        const response = await extra.api.delete('/remove-from-cart', {
            params: {
                productId: data.productId,
                sizeId: data.sizeId
            }
        });
        dispatch(fetchCarts());
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("Невозможно удалить продукт из корзины!")
    }
});
