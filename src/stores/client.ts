import { interceptor } from '@/config/interceptor';
import { IFetchOptions, IThunkPayload, methodType } from '@/models/shared/api.model';
export interface ClientReturnType<ReturnDataType> {
    response: Response;
    data: ReturnDataType;
}
export interface IResponse<MetaDataType> {
    statusCode: number;
    message: string | { [key: string]: string };
    errors?: { [key: string]: string };
    metaData: MetaDataType;
    limit?: number;
    page?: number;
    totalDocs?: number;
    totalPages?: number;
}
export const client = {
    SERVER_URL: 'https://be-studyhub.onrender.com',
    tokens: {
        accessToken: () => localStorage.getItem('accessToken') || '',
        refreshToken: () => localStorage.getItem('refreshToken') || '',
    },
    async send<MetaDataType>(path: string, method: methodType = 'GET', payload: IThunkPayload = {}): Promise<ClientReturnType<IResponse<MetaDataType>>> {
        const { headers = {}, body, query = {} } = payload;

        let queryParams = new URLSearchParams(query as Record<string, string>).toString();
        if (queryParams) queryParams = `?${queryParams}`;

        const options: IFetchOptions = {
            method,
        };
        if (this.tokens.accessToken()) {
            const token = this.tokens.accessToken();
            if (token && token.trim() !== '') {
                headers.Authorization = `Bearer ${token}`;
            }
        }

        if (body) {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
        Object.assign(options, {
            headers,
        });

        const response = await fetch(`${this.SERVER_URL}${path}${queryParams}`, options);
        const data: IResponse<MetaDataType> = await response.json();
        if (!response.ok) {
            return await interceptor<MetaDataType>({
                client: this,
                data,
                response,
                sendOptions: {
                    path,
                    method,
                    payload,
                },
            });
        }
        return { response, data };
    },
    get<MetaDataType>(path: string, payload: IThunkPayload = {}) {
        return this.send<MetaDataType>(path, 'GET', payload);
    },
    post<MetaDataType>(path: string, payload: IThunkPayload = {}) {
        return this.send<MetaDataType>(path, 'POST', payload);
    },
    put<MetaDataType>(path: string, payload: IThunkPayload = {}) {
        return this.send<MetaDataType>(path, 'PUT', payload);
    },
    patch<MetaDataType>(path: string, payload: IThunkPayload = {}) {
        return this.send<MetaDataType>(path, 'PATCH', payload);
    },
    delete<MetaDataType>(path: string, payload: IThunkPayload = {}) {
        return this.send<MetaDataType>(path, 'DELETE', payload);
    },
};

export type ClientType = typeof client;
