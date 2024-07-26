import { createSlice } from '@reduxjs/toolkit';
import { login, register, verify } from '../thunks/auth.thunk';
import { AuthActions, Status } from '@/models/index.model';
import { useNavigate } from 'react-router-dom';
import { boolean } from 'yup';
const accessToken = localStorage.getItem("accessToken");

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
                console.log('====================================');
                console.log(state.isLogin);
                console.log('====================================');
            })
            .addCase(login.rejected, (state, { payload }) => {
                console.log('🚀 ~ .addCase ~ state, { payload }:', state, { payload });
                console.log('Rejected');
            });
        builder
            .addCase(register.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(register.fulfilled, (state) => {
                state.status = Status.FULFILLED;
            })
            .addCase(register.rejected, (state, { payload }) => {});
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
    },
});
