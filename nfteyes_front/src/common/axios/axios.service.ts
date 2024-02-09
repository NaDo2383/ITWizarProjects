import { AxiosError, AxiosResponse } from 'axios'
import { IRes } from './useCrud'
import axios from './http'

export async function getData<T>(restUrl: string): Promise<IRes<T>> {
    const response: AxiosResponse<any> = await axios({
        method: 'get',
        url: restUrl,
    })
    console.log('bbbb', response)

    return {
        success: true,
        result: response.data.result as T,
        ...(response.data.paginate && { paginate: response.data.paginate }),
    }
}

export async function postData<T>(restUrl: string, data: unknown): Promise<IRes<T>> {
    const response: AxiosResponse<T> = await axios({
        method: 'post',
        data,
        url: restUrl,
        withCredentials: true,
    })
    return { success: true, result: response.data }
}

export async function putData<T>(restUrl: string, editedModel: T): Promise<IRes<T>> {
    const response = await axios({
        method: 'put',
        data: editedModel,
        url: restUrl,
    })
    const val = { success: true, result: response.data }
    return val
}

export async function patchData<T>(restUrl: string, data: T): Promise<IRes<T>> {
    const response = await axios({
        method: 'patch',
        data,
        url: restUrl,
    })
    const val = { success: true, result: response.data }
    return val
}

export async function deleteData(restUrl: string) {
    const response = await axios({
        method: 'delete',
        url: restUrl,
    })
    return response.data
}

export function httpErrorHandler<T>(e: any) {
    console.error(e)
    if (axios.isAxiosError(e)) {
        const error = e as AxiosError<T>
        return {
            success: false,
            reason: 'Request failed',
            error: error.message,
            message: (error.response?.data as { message?: string })?.message,
            statusCode: error.response?.status,
        }
    }
    return {
        success: false,
        reason: 'Unexpected error',
    }
}
