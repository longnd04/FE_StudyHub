import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth.slice';
import { courseSlice } from './slices/course.slice';
import { userSlice } from './slices/user.slice';

export const reducers = combineReducers({
    auth: authSlice.reducer,
    course: courseSlice.reducer,
    account: userSlice.reducer,
});
export type RootStateType = ReturnType<typeof reducers>;
