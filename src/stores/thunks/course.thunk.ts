import { IThunkPayload } from '@/models/shared/api.model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getAllCourse = createAsyncThunk('getAllCourse', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.get(`/course`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getCourseById = createAsyncThunk('getCourseById', async (id: string, thunkAPI) => {
    try {
        const { data } = await client.get(`/course/${id}`);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const createCourse = createAsyncThunk('createCourse', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.post(`/course`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const updateCourse = createAsyncThunk('updateCourse', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.patch(`/course/${payload.param}`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const deleteCourse = createAsyncThunk('deleteCourse', async (id: string, thunkAPI) => {
    try {
        const { data } = await client.delete(`/course/${id}`);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
