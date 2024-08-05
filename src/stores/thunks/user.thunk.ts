import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { IThunkPayload } from '@/models/shared/api.model';
const prefix = '/auth';

export const getAllUser = createAsyncThunk('getAllUser', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.get(`/users`, payload);
        return data; // Ensure 'data' here is what you expect
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const updateRole = createAsyncThunk('updateRole', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.post(`${prefix}/update-role`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
