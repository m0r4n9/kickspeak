import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminUserDetailsSchema } from '../types/adminUserDetailsSchema.ts';
import { fetchUserById } from '../services/fetchUserById.ts';
import { updateUser } from '../services/updateUser.ts';
import { deleteUser } from '../services/deleteUser.ts';
import { Profile } from '@/entities/Profile';
import { UserRole } from '@/entities/User';

const initialState: AdminUserDetailsSchema = {
    isLoading: false,
    data: undefined,
    form: undefined,
};

const adminUserDetailsSlice = createSlice({
    name: 'adminUserDetailsSlice',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.form = state.data?.user;
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        setRole: (state, { payload }: PayloadAction<UserRole>) => {
            if (
                !state.form ||
                !state?.form.role ||
                state.form.role.includes(payload)
            )
                return;
            state.form.role.push(payload);
        },
        removeRole: (state, { payload }: PayloadAction<UserRole>) => {
            if (state?.form?.role?.includes(payload)) {
                state.form.role = state.form.role.reduce(
                    (acc, currentValue) => {
                        if (currentValue !== payload) {
                            acc.push(currentValue);
                        }
                        return acc;
                    },
                    [] as UserRole[],
                );
            }
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload.user;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.data) {
                    state.data.user = action.payload;
                    state.form = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.payload;
            }),
});

export const {
    actions: adminUserDetailsActions,
    reducer: adminUserDetailsReducer,
} = adminUserDetailsSlice;
