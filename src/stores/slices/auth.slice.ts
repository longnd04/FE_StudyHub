import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshToken, register, verify } from '../thunks/auth.thunk';
import { AuthActions, Status } from '@/models/index.model';

const accessToken = localStorage.getItem('accessToken');
const tokenExpiration = localStorage.getItem('tokenExpiration');
const TOKEN_EXPIRATION_TIME = 15 * 60 * 1000;

const initialState = {
    isLogin: !!accessToken && !!tokenExpiration && parseInt(tokenExpiration, 10) > Date.now(),
    user: null,
    status: Status.IDLE,
    message: '',
    action: AuthActions.UNSET,
    tokenExpiration: tokenExpiration ? parseInt(tokenExpiration, 10) : null,
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
                const accessToken = payload.metaData?.access_token;
                const refreshToken = payload.metaData?.refresh_token;
                const tokenExpiration = Date.now() + TOKEN_EXPIRATION_TIME;
                localStorage.setItem('accessToken', JSON.stringify(accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
                localStorage.setItem('tokenExpiration', tokenExpiration.toString());
                state.isLogin = true;
                state.user = payload.metaData;
                state.tokenExpiration = tokenExpiration;
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
                localStorage.removeItem('tokenExpiration');
                state.isLogin = false;
                state.user = null;
                state.tokenExpiration = null;
            })
            .addCase(logout.rejected, (state) => {
                state.status = Status.REJECTED;
            });

        builder
            .addCase(refreshToken.fulfilled, (state, { payload }) => {
                const accessToken = payload.access_token;
                const refreshToken = payload.refresh_token;
                const tokenExpiration = Date.now() + TOKEN_EXPIRATION_TIME;
                localStorage.setItem('accessToken', JSON.stringify(accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
                localStorage.setItem('tokenExpiration', tokenExpiration.toString());
                state.isLogin = true;
                state.tokenExpiration = tokenExpiration;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.isLogin = false;
                state.user = null;
                state.tokenExpiration = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('tokenExpiration');
            });
    },
});
