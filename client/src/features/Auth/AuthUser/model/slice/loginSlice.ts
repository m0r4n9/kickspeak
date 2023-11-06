import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginSchema} from "../types/LoginSchema.ts";
import {loginByEmail} from "../services/loginByEmail.ts";
import {registrationUser} from "../services/registrationUser.ts";

const initialState: LoginSchema = {
    isLoading: false,
    email: '',
    password: '',
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(loginByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(registrationUser.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(registrationUser.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(registrationUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
})

export const {
    actions: loginActions,
    reducer: loginReducer
} = loginSlice;
