import { RefObject } from 'react';
import { Status } from '../index.model';
import { FormikProps } from 'formik';

export type methodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type FormikRefType<T> = RefObject<FormikProps<T>>;

export interface IFetchHeaders {
    'Content-Type'?: string;
    Authorization?: string;
}

export interface IFetchOptions extends IFetchHeaders {
    method: methodType;
    body?: any;
}

export interface IThunkPayload {
    id?: string;
    body?: any;
    query?: object;
    headers?: IFetchHeaders;
    param?: string;
}

export interface IInitialState {
    status: Status;
    message: string;
    filter: ISearchParams;
    totalRecords: number;
    [key: string]: unknown;
}
export interface ISearchParams {
    _page?: number;
    _size?: number;
    [key: string]: unknown;
}
