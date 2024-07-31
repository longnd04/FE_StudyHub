import { IFetchOptions, IThunkPayload, methodType } from '@/models/shared/api.model';
import { refreshToken } from './thunks/auth.thunk';
import { AppDispatch } from './store';

export const client = {
    SERVER_URL: 'https://be-studyhub.onrender.com',
    tokens: {
        accessToken: JSON.parse(localStorage.getItem('accessToken') as string) ?? '',
        refreshToken: JSON.parse(localStorage.getItem('refreshToken') as string) ?? '',
    },
    async send(path: string, method: methodType = 'GET', payload: IThunkPayload = {}, dispatch?: AppDispatch) {
        const { headers = {}, body, query = {} } = payload;

        let queryParams = new URLSearchParams(query as Record<string, string>).toString();
        if (queryParams) queryParams = `?${queryParams}`;

        const options: IFetchOptions = {
            method,
        };
        if (this.tokens.accessToken) {
            headers.Authorization = `Bearer ${this.tokens.accessToken}`;
        }

        if (body) {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
        Object.assign(options, {
            headers,
        });

        let response = await fetch(`${this.SERVER_URL}${path}${queryParams}`, options);

        if (!response.ok) {
            if (response.status === 401 && dispatch) {
                try {
                    const refreshResult = await dispatch(refreshToken());
                    if (refreshToken.fulfilled.match(refreshResult)) {
                        this.tokens.accessToken = refreshResult.payload.access_token;
                        this.tokens.refreshToken = refreshResult.payload.refresh_token;
                        headers.Authorization = `Bearer ${this.tokens.accessToken}`;
                        Object.assign(options, { headers });
                        response = await fetch(`${this.SERVER_URL}${path}${queryParams}`, options);
                    } else {
                        throw new Error('Failed to refresh token');
                    }
                } catch (error) {
                    console.error('Error after token refresh:', error);
                    throw error;
                }
            } else if (response.status === 403) {
                throw new Error('Forbidden');
            } else if (response.status === 500) {
                throw new Error('Server error');
            }
        }

        const data = await response.json();
        return { response, data };
    },
    get(path: string, payload: IThunkPayload = {}, dispatch?: AppDispatch) {
        return this.send(path, 'GET', payload, dispatch);
    },
    post(path: string, payload: IThunkPayload = {}, dispatch?: AppDispatch) {
        return this.send(path, 'POST', payload, dispatch);
    },
    put(path: string, payload: IThunkPayload = {}, dispatch?: AppDispatch) {
        return this.send(path, 'PUT', payload, dispatch);
    },
    patch(path: string, payload: IThunkPayload = {}, dispatch?: AppDispatch) {
        return this.send(path, 'PATCH', payload, dispatch);
    },
    delete(path: string, payload: IThunkPayload = {}, dispatch?: AppDispatch) {
        return this.send(path, 'DELETE', payload, dispatch);
    },
};
