import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ErrorInterface } from '@/shared/interfaces/ApiError';
import { AxiosError } from 'axios';
import { isAxiosError } from 'axios';
import { UploadFile } from 'antd/es/upload/interface';

interface CreateProduct {
    name: string;
    brandId: string;
    price: number;
    sex: string;
    code: string;
    colors: string[];
    images: UploadFile[];
}

export const createProduct = createAsyncThunk<
    { id: string },
    CreateProduct,
    ThunkConfig<ErrorInterface>
>('AdminProductCreate/createProduct', async (data, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('BrandId', data.brandId);
    formData.append('price', data.price.toString());
    formData.append('code', data.code);
    formData.append('sex', data.sex);
    formData.append('ColorId', data.colors[0]);
    data.images.forEach((image) => {
        if (image.originFileObj) formData.append(`images`, image.originFileObj);
    });

    try {
        const response = await extra.api.post<{ id: string }>(
            '/admin/product/create',
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
