import axios from './http'
import { AxiosResponse } from 'axios'
import { getToken } from '../token/token'
import { httpErrorHandler } from './axios.service'

export interface IPaginate {
    start: number
    end: number
    limit: number
    prevPage: number
    nextPage: number
    pageCount: number
    total: number
}
export interface IRes<T> {
    success: boolean
    result?: T
    reason?: string
    error?: unknown
    message?: string
    statusCode?: number
    pagination?: IPaginate
    data?: T
}

export function useCrud() {
    const token = typeof window !== 'undefined' && getToken()

    async function getData<T>(restUrl: string): Promise<IRes<T>> {
        try {
            const response: AxiosResponse<any> = await axios({
                method: 'get',
                url: restUrl,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            return {
                success: true,
                result: response.data.result,
            }
        } catch (e: unknown) {
            return httpErrorHandler<T>(e)
        }
    }

    async function postData<T>(restUrl: string, data: unknown, isFormData: boolean = false): Promise<IRes<T>> {
        try {
            const response: AxiosResponse<T> = await axios({
                method: 'post',
                data,
                url: restUrl,
                withCredentials: true,
                headers: {
                    'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
            })
            return { success: true, result: response.data }
        } catch (e: unknown) {
            return httpErrorHandler<T>(e)
        }
    }

    async function putData<T>(restUrl: string, editedModel: T, isFormData: boolean = false): Promise<IRes<T>> {
        try {
            const response: AxiosResponse<T> = await axios({
                method: 'put',
                data: editedModel,
                url: restUrl,
                headers: {
                    'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
                },
            })
            const val = { success: true, result: response.data }
            return val
        } catch (e: unknown) {
            return httpErrorHandler<T>(e)
        }
    }

    async function deleteData(restUrl: string) {
        const response = await axios({
            method: 'delete',
            url: restUrl,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    }

    return { getData, postData, putData, deleteData }
}
