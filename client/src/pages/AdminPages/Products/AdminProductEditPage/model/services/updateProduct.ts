import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { AxiosError, isAxiosError } from 'axios';
import { UploadFile } from 'antd/es/upload/interface';
import { Product } from '@/entities/Product';
import { getAdminProductDetailsData } from '../selectors/getAdminProductDetailsData/getAdminProductDetailsData.ts';

export interface UpdateProductArgs {
    name?: string;
    price?: number;
    code?: string;
    sex?: string;
    colors?: string[];
    images: {
        deletedImages: string[];
        newImages: UploadFile[];
    };
}

export const updateProduct = createAsyncThunk<
    Product,
    UpdateProductArgs,
    ThunkConfig<ErrorInterface>
>('updateProduct', async (data, thunkApi) => {
    const { rejectWithValue, extra, getState } = thunkApi;

    const product = getAdminProductDetailsData(getState());
    const formData = new FormData();

    if (data.name) formData.append('name', data.name);
    if (data.price) formData.append('price', data.price.toString());
    if (data.code) formData.append('code', data.code);
    if (data.sex) formData.append('sex', data.sex);
    if (data.colors) formData.append('colors', data.colors.toString());
    data.images.deletedImages.forEach((deleteImageId) => {
        if (deleteImageId) formData.append('deletedImagesIds', deleteImageId);
    });
    data.images.newImages.forEach((newImage) => {
        if (newImage.originFileObj) formData.append('images', newImage.originFileObj);
    });


    try {
        const response = await extra.api.put<Product>(
            `/admin/product/update/${product?.id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
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
