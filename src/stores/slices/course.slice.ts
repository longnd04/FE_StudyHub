import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '@/models/index.model';
import { createCourse, deleteCourse, getAllCourse, getCourseById, updateCourse } from '../thunks/course.thunk';
import { IInitialState } from '@/models/shared/api.model';
import { ICourse } from '../module';
import { IResponse } from '../client';

export interface ICourseInitialState extends IInitialState {
    courses: ICourse[];
    activeCourse: ICourse | undefined;
}

const initialState: ICourseInitialState = {
    courses: [],
    status: Status.IDLE,
    activeCourse: undefined,
    message: '',
    totalRecords: 0,
    filter: {
        size: 10,
        page: 1,
    },
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllCourse.fulfilled, (state, { payload }: PayloadAction<IResponse<any>>) => {
            state.status = Status.FULFILLED;
            state.courses = payload.metaData; // Fix: Update the courses field
        });
        builder.addCase(getCourseById.fulfilled, (state, { payload }: PayloadAction<IResponse<any>>) => {
            state.status = Status.FULFILLED;
            state.activeCourse = payload.metaData; // Update the activeCourse field
        });
        builder.addCase(createCourse.pending, (state) => {
            state.status = Status.PENDING;
        });
        builder.addCase(createCourse.fulfilled, (state) => {
            state.status = Status.FULFILLED;
            state.message = 'Created successfully';
        });
        builder.addCase(createCourse.rejected, (state, { payload }: any) => {
            state.status = Status.REJECTED;
            state.message = payload.errors;
        });
        builder.addCase(updateCourse.pending, (state) => {
            state.status = Status.PENDING;
        });
        builder.addCase(updateCourse.fulfilled, (state) => {
            state.status = Status.FULFILLED;
            state.message = 'Updated successfully';
        });
        builder.addCase(updateCourse.rejected, (state) => {
            state.status = Status.REJECTED;
        });
        builder.addCase(deleteCourse.pending, (state) => {
            state.status = Status.PENDING;
        });
        builder.addCase(deleteCourse.fulfilled, (state, { payload }: any) => {
            state.status = Status.FULFILLED;
            state.message = 'Delete successfully';
            state.courses = state.courses.filter((course) => course.id !== payload);
        });
        builder.addCase(deleteCourse.rejected, (state) => {
            state.status = Status.REJECTED;
        });
    },
});

export default courseSlice.reducer;
