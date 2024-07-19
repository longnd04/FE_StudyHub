import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
const prefix = '/api/v1/auth';

export const login = createAsyncThunk('login', async (payload: IThunkPayload, thunkAPI) => {
    try {
        const { data } = await client.post(`${prefix}/login`, payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
