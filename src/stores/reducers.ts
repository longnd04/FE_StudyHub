import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth.slice';
import { courseSlice } from './slices/course.slice';

export const reducers = combineReducers({
    auth: authSlice.reducer,
    course: courseSlice.reducer,
});
export type RootStateType = ReturnType<typeof reducers>;
