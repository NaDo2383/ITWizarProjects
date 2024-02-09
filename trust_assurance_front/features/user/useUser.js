import { useCrud } from "@/common/axios/useCrud"
import { useGlobalCtx } from "@/common/global/useGlobalCtx"
import { setTokenIntoCookie } from "@/common/token/token"

function useUser() {
    const { postData } = useCrud()
    const { setTokenIntoAuthState } = useGlobalCtx()

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

    async function updateUserInfo(payload) {
        try {
            const res = await postData("/user/update/info", payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getUserLicensePurchaseStatus(payload) {
        try {
            const res = await postData("/products/user/info/orders", payload)
            return res
        } catch (e) {
            console.error(e)
            return e.response
        }
    }

    async function getUserLicensePurchaseCount(token) {
        try {
            const res = await postData("/products/user/info/orders/total", token)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function checkRefreshToken(token) {
        try {
            const res = await postData("/user/reflashToken", token)
            if (res.data.validToken === "pass") {
                setTokenIntoCookie(res.data.accessToken)
                setTokenIntoAuthState(res.data.accessToken)
                return res.data
            }
            return res.data
        } catch (e) {
            console.error(e)
        }
    }

    return {
        getUserInfo,
        updateUserInfo,
        getUserLicensePurchaseStatus,
        getUserLicensePurchaseCount,
        checkRefreshToken,
    }
}

export default useUser
