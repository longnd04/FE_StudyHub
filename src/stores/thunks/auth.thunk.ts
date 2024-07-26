import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
const prefix = '/auth';

export const login = createAsyncThunk('login', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.post(`${prefix}/login`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const register = createAsyncThunk('register', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.post(`${prefix}/register`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const verify = createAsyncThunk('verify', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.post(`${prefix}/verify`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
