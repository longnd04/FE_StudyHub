import { createSlice } from '@reduxjs/toolkit';
import { AuthActions, Status } from '@/models/index.model';
import { getAllUser, updateRole } from '../thunks/user.thunk';

interface AuthState {
    accounts: any | null;
    status: Status;
    message: string;
    action: AuthActions;
}

const initialState: AuthState = {
    accounts: null,
    status: Status.IDLE,
    message: '',
    action: AuthActions.UNSET,
};

export const userSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
            state.status = Status.FULFILLED;
            state.accounts = payload.metaData;
        });
        builder.addCase(updateRole.fulfilled, (state, { payload }) => {
            state.status = Status.FULFILLED;
            state.accounts = payload.metaData;
        });
    },
});
