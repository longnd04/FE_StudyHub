import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { IThunkPayload } from '@/models/shared/api.model';

const prefix = '/auth';

export const login = createAsyncThunk('auth/login', async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
        const { response, data } = await client.post<any>(`${prefix}/login`, payload);
        return response.status >= 400 ? rejectWithValue(data) : data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
export const register = createAsyncThunk('auth/register', async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
        const { response, data } = await client.post<any>(`${prefix}/register`, payload);
        return response.status >= 400 ? rejectWithValue(data) : data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
export const forgotPasswpord = createAsyncThunk('auth/forgotPasswpord', async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
        const { response, data } = await client.post<any>(`${prefix}/forgot-password`, payload);
        return response.status >= 400 ? rejectWithValue(data) : data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
export const resetPassword = createAsyncThunk('auth/reset-password', async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
        const { response, data } = await client.post<any>(`${prefix}/reset-password`, payload);
        return response.status >= 400 ? rejectWithValue(data) : data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
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

export const logout = createAsyncThunk('logout', async (__payload, thunkAPI) => {
    try {
        const { data } = await client.post(`${prefix}/logout`);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const getProfile = createAsyncThunk('getProfile', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.post(`${prefix}/profile`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const updateUser = createAsyncThunk('updateUser', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.patch(`/users/${payload.param}`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
