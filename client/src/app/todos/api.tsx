import axios, { AxiosPromise } from 'axios';
import config from '../../config/config';

export type CreateTodoPayload = {
    text: string
};

export const getTodosApi = async (): AxiosPromise<any | null> => {
    return axios.request({
        url: config.domain + '/todos',
        method: 'GET'
    });
};

export const createTodosApi = (data: CreateTodoPayload): AxiosPromise<any | null> => {
    return axios.request({
        url: config.domain + '/todos',
        data,
        method: 'POST'

    });
};

export const updateTodoApi = (todoId: string, data: CreateTodoPayload): AxiosPromise<unknown | any> => {
    return axios.request({
        url: `${config.domain}/todos/${todoId}`,
        method: 'PUT',
        data
    });
};

export const deleteTodoApi = (todoId: string): AxiosPromise<unknown | any> => {
    return axios.request({
        url: `${config.domain}/todos/${todoId}`,
        method: 'DELETE'
    });
};