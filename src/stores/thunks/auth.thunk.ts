import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { IThunkPayload } from '@/models/shared/api.model';

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

export const logout = createAsyncThunk('logout', async (__payload, thunkAPI) => {
    try {
        const { data } = await client.post(`${prefix}/logout`);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const refreshToken = createAsyncThunk('refreshToken', async (_, { rejectWithValue }) => {
    try {
        const response = await client.post(`${prefix}/refresh-token`, {
            body: { refreshToken: client.tokens.refreshToken },
        });
        if (response.data.success) {
            return response.data.metaData;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});
