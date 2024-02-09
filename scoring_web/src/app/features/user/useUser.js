"use client"
import { useCrud } from "../../common/axios/crud"
import { useUserCtx } from "./useUserContext"

function useUser() {
    const { postData } = useCrud()
    const { setUserInfo } = useUserCtx()
    const server = process.env.SERVER

    async function getUserInfo(token) {
        try {
            const payload = {
                accessToken: token,
            }
            const res = await postData("/user/get/info", payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function loginUser(payload) {
        // setIsLoading(true)
        try {
            const res = await postData(`${server}/login`, payload)
            if (res.code === 400) {
                alert("Login failed")
                console.error(res)
                return { success: false }
            }

            if (res.code === 401) {
                alert("Login failed")
                return { success: false }
            }
            if (res.code === 404) {
                alert("not found this user!")
                return { success: false }
            }

            if (res.status === 200) {
                document.cookie = `scoringCoookie=${res?.data?.token};path=/`
                document.cookie = `userInfo=${JSON.stringify(res?.data?.result)};path=/`
                setUserInfo(res?.data?.result)
                return { success: true, userInfo: res?.data?.result }
            }
        } catch (e) {
            console.error(e)
            return { success: false }
        } finally {
            // setIsLoading(false)
        }
    }

    return {
        loginUser,
    }
}

export default useUser
