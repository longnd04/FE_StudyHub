import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth.slice';

export const reducers = combineReducers({
    auth: authSlice.reducer,
});
