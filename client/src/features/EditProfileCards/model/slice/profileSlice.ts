import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@/entities/Profile';
import { ProfileSchema } from '../types/editProfileCardsSchema.ts';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData.ts';
import { updateProfile } from '../services/updateProfile/updateProfile.ts';

const initialState: ProfileSchema = {
    data: undefined,
    isLoading: false,
    readonly: true,
    error: undefined,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
        },
        //updateProfile: (state, action: PayloadAction<Profile>) => {
        //    state.form = {
        //        ...state.form,
        //        ...action.payload,
        //    };
        //},
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
                state.validateError = [];
            })
            .addCase(
                updateProfile.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.readonly = true;
                },
            )
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.validateError = action.payload;
            }),
});

export const { actions: profileActions, reducer: profileReducer } =
    profileSlice;
