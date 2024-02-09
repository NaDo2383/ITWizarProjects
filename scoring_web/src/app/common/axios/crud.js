"use client"
import axios from "./http"
import { getCookie } from "../storage/cookieStorage"
import { useRouter } from "next/navigation"

export function useCrud() {
    const cookieToken = typeof window !== "undefined" && getCookie("scoringCoookie")
    const { push } = useRouter()

    async function getData(restUrl, isProtected = false) {
        try {
            const response = await axios({
                method: "get",
                url: restUrl,
                headers: {
                    "Access-Control-Allow-Origin": true,
                    Authorization: isProtected ? `Bearer ${cookieToken}` : undefined,
                    "Cache-Control": "no-store, no-cache",
                },
            })
            return response
        } catch (e) {
            if (e.response.status === 401) {
                push("/login")
            }
            return e.response
        }
    }

    async function postData(restUrl, data, isProtected = false) {
        try {
            const response = await axios({
                method: "post",
                data,
                url: restUrl,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': '*',
                    Authorization: isProtected ? `Bearer ${cookieToken}` : undefined,
                    "Cache-Control": "no-store, no-cache",
                },
            })
            return response
        } catch (e) {
            if (e.response.status === 401) {
                push("/login")
            }
            return e.response
        }
    }

    async function putData(restUrl, editedModel, isProtected = false) {
        try {
            const response = await axios({
                method: "put",
                data: editedModel,
                url: restUrl,
                headers: {
                    "Access-Control-Allow-Origin": true,
                    Authorization: isProtected ? `Bearer ${cookieToken}` : undefined,
                },
            })
            return response
        } catch (e) {
            if (e.response.status === 401) {
                push("/login")
            }
            return e.response
        }
    }

    async function deleteData(restUrl) {
        try {
            const response = await axios({
                method: "delete",
                url: restUrl,
                headers: {
                    "Access-Control-Allow-Origin": true,
                    Authorization: `Bearer ${cookieToken}`,
                },
            })
            return response
        } catch (e) {
            if (e.response.status === 401) {
                push("/login")
            }
            return err.response
        }
    }
    return { getData, postData, putData, deleteData }
}

export async function getPreRenderModel(restUrl, isProtected = false) {
    try {
        const response = await axios({
            method: "get",
            url: restUrl,
            headers: {
                Authorization: isProtected ? `Bearer ${cookieToken}` : null,
                "Cache-Control": "no-store, no-cache",
            },
        })
        return response.data
    } catch (e) {
        console.error(e)
    }
}
