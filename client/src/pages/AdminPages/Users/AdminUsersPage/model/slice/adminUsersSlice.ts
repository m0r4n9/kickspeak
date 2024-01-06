import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminUsersSchema } from '../types/AdminUsersSchema.ts';
import { fetchUsersAdmin } from '../services/fetchUsersAdmin.ts';

const initialState: AdminUsersSchema = {
    isLoading: false,
    page: 1,
    limit: 10,
    data: undefined,
    query: '',
};

const adminUsersSlice = createSlice({
    name: 'AdminBrandsSlice',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
            state.page = 1;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchUsersAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchUsersAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUsersAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
});

export const { actions: adminUsersActions, reducer: adminUsersReducer } =
    adminUsersSlice;
