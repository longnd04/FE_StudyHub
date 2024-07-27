export type methodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IFetchHeaders {
    'Content-Type'?: string;
    Authorization?: string;
}

export interface IFetchOptions extends IFetchHeaders {
    method: methodType;
    body?: any;
}

export interface IThunkPayload {
    body?: any;
    query?: object;
    headers?: IFetchHeaders;
}
