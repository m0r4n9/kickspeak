import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from '@/app/providers/StoreProvider';
import axios, {AxiosError} from "axios";
import {ErrorInterface} from "@/shared/interfaces/ErrorInterface.ts";
import {AdminProfileDetails} from "../types/adminUserDetailsSchema.ts";

interface FetchUserByIdProps {
    id: string;
}

export const fetchUserById = createAsyncThunk<
    AdminProfileDetails,
    FetchUserByIdProps,
    ThunkConfig<ErrorInterface>
>('AdminUserDetailsPage/fetchUserById', async (arg, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<AdminProfileDetails>(`/admin/users/${arg.id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ErrorInterface>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({message: 'Произошла непредвиденная ошибка'});
    }
});
