import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswpord, getProfile, login, logout, register, resetPassword, updateUser, verify } from '../thunks/auth.thunk';
import { AuthActions, Status } from '@/models/index.model';
import { IResponse } from '../client';

const accessToken = localStorage.getItem('accessToken');

interface AuthState {
    isLogin: boolean;
    user: any | null;
    status: Status;
    message: string;
    loginTime: number;
    action: AuthActions;
}

const initialState: AuthState = {
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
    reducers: {
        restoreUserState: (state) => {
            const accessToken = localStorage.getItem('accessToken');
            const user = localStorage.getItem('user');
            if (accessToken && user) {
                state.isLogin = true;
                state.user = user;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(login.fulfilled, (state, { payload }: PayloadAction<IResponse<any>>) => {
                localStorage.setItem('accessToken', payload.metaData?.access_token);
                localStorage.setItem('refreshToken', payload.metaData?.refresh_token);
                localStorage.setItem('user', payload.metaData.role);
                state.loginTime = new Date().getTime() / 1000;
                state.status = Status.FULFILLED;
                state.action = AuthActions.LOGIN;
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
                state.action = AuthActions.VERIFY;
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
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                state.isLogin = false;
                state.user = null;
                state.status = Status.FULFILLED;
                state.action = AuthActions.LOGOUT;
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
                state.action = AuthActions.FORGOTPASSWORD;
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
                state.action = AuthActions.RESETPASSWORD;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.status = Status.REJECTED;
            });
        builder
            .addCase(updateUser.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.status = Status.FULFILLED;
            })
            .addCase(updateUser.rejected, (state) => {
                state.status = Status.REJECTED;
            });
        builder
            .addCase(getProfile.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(getProfile.fulfilled, (state, { payload }) => {
                state.status = Status.FULFILLED;
                state.user = payload.metaData;
            })
            .addCase(getProfile.rejected, (state) => {
                state.status = Status.REJECTED;
            });
    },
});
export const { restoreUserState } = authSlice.actions;
