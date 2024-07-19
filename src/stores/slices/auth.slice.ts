import { createSlice } from '@reduxjs/toolkit';
import { login } from '../thunks/auth.thunk';
import { AuthActions, Status } from '@/models/index.model';

const initialState = {
    isLogin: true,
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
            .addCase(login.pending, (state, { payload }) => {
                console.log('🚀 ~ .addCase ~ state, { payload }:', state, { payload });
                console.log('Pending');
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                console.log('🚀 ~ .addCase ~ state, { payload }:', state, { payload });
                console.log('fulfilled');
            })
            .addCase(login.rejected, (state, { payload }) => {
                console.log('🚀 ~ .addCase ~ state, { payload }:', state, { payload });
                console.log('Rejected');
            });
    },
});
