import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserSchema} from "../types/User.ts";
import {checkAuth} from "@/entities/User/model/services/checkAuth/checkAuth.ts";

const initialState: UserSchema = {
    isLoading: false,
    _inited: false,
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            localStorage.setItem('token', action.payload.accessToken);
            localStorage.setItem('userId', action.payload.id);
        },
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            state.authData = undefined;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.authData = undefined;
            })
})

export const {
    actions: userActions,
    reducer: userReducer
} = userSlice;
