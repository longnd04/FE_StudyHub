import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, verify } from '../thunks/auth.thunk';
import { AuthActions, Status } from '@/models/index.model';
const accessToken = localStorage.getItem('accessToken');
const initialState = {
    isLogin: !!accessToken,
    user: null,
    status: Status.IDLE,
    message: '',
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
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = Status.FULFILLED;
                localStorage.setItem('accessToken', JSON.stringify(payload.metaData?.access_token));
                localStorage.setItem('refreshToken', JSON.stringify(payload.metaData?.refresh_token));
                state.isLogin = true;
                state.user = payload.metaData;
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
            })
            .addCase(register.rejected, (state) => {
                state.status = Status.REJECTED;
            });
        builder
            .addCase(verify.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(verify.fulfilled, (state, { payload }) => {
                state.status = Status.FULFILLED;
                state.user = payload.metaData;
            })
            .addCase(verify.rejected, (state) => {
                state.status = Status.REJECTED;
            });
        builder
            .addCase(logout.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = Status.FULFILLED;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                state.isLogin = false;
            })
            .addCase(logout.rejected, (state) => {
                state.status = Status.REJECTED;
            });
    },
});
