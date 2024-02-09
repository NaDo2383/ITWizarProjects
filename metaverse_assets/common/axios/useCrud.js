import axios from './http'
import useMessageFactory from '../message/useMessageFactory'
import { getAuthToken } from '../token/token'

export function useCrud() {
    const { apiErrorMessage } = useMessageFactory()
    const cookieToken = typeof window !== 'undefined' && getAuthToken()

    async function getData(restUrl, isProtected = false, token = null) {
        try {
            const response = await axios({
                method: 'get',
                url: restUrl,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: isProtected
                        ? `Bearer ${token || cookieToken}`
                        : undefined,
                    'Cache-Control': 'no-store, no-cache',
                },
            })

            return response
        } catch (e) {
            const err = apiErrorMessage(e)
            return err.response
        }
    }

    async function postData(restUrl, data, isProtected = false) {
        try {
            const response = await axios({
                method: 'post',
                data,
                url: restUrl,
                withCredentials: true,
                headers: {
                    Authorization: isProtected ? `Bearer ${cookieToken}` : undefined,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
            })
            return response
        } catch (e) {
            const err = apiErrorMessage(e)
            return err.response
        }
    }

    async function putData(restUrl, editedModel, isProtected = false) {
        try {
            const response = await axios({
                method: 'put',
                data: editedModel,
                url: restUrl,
                headers: {
                    Authorization: isProtected ? `Bearer ${cookieToken}` : undefined,
                },
            })
            return response
        } catch (e) {
            const err = apiErrorMessage(e)
            return err.response
        }
    }

    async function patchData(restUrl, editedModel, isProtected = false) {
        try {
            const response = await axios({
                method: 'patch',
                data: editedModel,
                url: restUrl,
                headers: {
                    Authorization: isProtected ? `Bearer ${cookieToken}` : undefined,
                },
            })
            return response
        } catch (e) {
            const err = apiErrorMessage(e)
            return err.response
        }
    }

    async function deleteData(restUrl) {
        try {
            const response = await axios({
                method: 'delete',
                url: restUrl,
                headers: {
                    Authorization: `Bearer ${cookieToken}`,
                },
            })
            return response
        } catch (e) {
            const err = apiErrorMessage(e)
            return err.response
        }
    }
    return { getData, postData, putData, deleteData, patchData }
}

export async function getPreRenderModel(restUrl, isProtected = false) {
    const cookieToken = getAuthToken()
    try {
        const response = await axios({
            method: 'get',
            url: restUrl,
            headers: {
                Authorization: isProtected ? `Bearer ${cookieToken}` : null,
                'Cache-Control': 'no-store, no-cache',
            },
        })
        return response.data
    } catch (e) {
        console.error(e)
    }
}
