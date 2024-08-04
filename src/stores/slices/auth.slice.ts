import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswpord, login, logout, register, resetPassword, verify } from '../thunks/auth.thunk';
import { AuthActions, Status } from '@/models/index.model';
import { IResponse } from '../client';
const accessToken = localStorage.getItem('accessToken');

const initialState = {
    isLogin: !!accessToken,
    user: null,
    status: Status.IDLE,
    message: '',
    loginTime: 0,
    action: AuthActions.UNSET,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(login.fulfilled, (state, { payload }: PayloadAction<IResponse<any>>) => {
                localStorage.setItem('accessToken', JSON.stringify(payload.metaData?.access_token));
                localStorage.setItem('refreshToken', JSON.stringify(payload.metaData?.refresh_token));
                state.loginTime = new Date().getTime() / 1000;
                state.status = Status.FULFILLED;
                state.action = AuthActions.LOGIN;
                state.isLogin = true;
            })
            .addCase(login.rejected, (state) => {
                state.status = Status.REJECTED;
            });

        builder
            .addCase(register.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(register.fulfilled, (state) => {
                state.status = Status.FULFILLED;
                state.action = AuthActions.REGISTER;
            })
            .addCase(register.rejected, (state) => {
                state.status = Status.REJECTED;
            });

        builder
            .addCase(verify.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(verify.fulfilled, (state, { payload }: PayloadAction<IResponse<any>>) => {
                state.status = Status.FULFILLED;
                state.user = payload.metaData;
                state.action = AuthActions.VERIFY;
            })
            .addCase(verify.rejected, (state) => {
                state.status = Status.REJECTED;
            });

        builder
            .addCase(logout.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                state.action = AuthActions.LOGOUT;
                state.isLogin = false;
                state.status = Status.FULFILLED;
            })
            .addCase(logout.rejected, (state) => {
                state.status = Status.REJECTED;
            });
        builder
            .addCase(forgotPasswpord.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(forgotPasswpord.fulfilled, (state) => {
                state.status = Status.FULFILLED;
            })
            .addCase(forgotPasswpord.rejected, (state) => {
                state.status = Status.REJECTED;
            });
        builder
            .addCase(resetPassword.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.status = Status.FULFILLED;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.status = Status.REJECTED;
            });
    },
});
