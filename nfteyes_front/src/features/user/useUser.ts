// import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'
// import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { useCrud } from 'common/axios/useCrud'

function useUser() {
    const { getData, putData, postData } = useCrud()
    // const { showGlobalPopup } = useGlobalPopupCtx()

    async function saveAsset(data: any) {
        try {
            const res: any = await putData('/asset', data)
            return res
        } catch (e: any) {
            const msg = e?.response?.statusCode
            return msg
        }
    }

    async function getUserInfo(token: string) {
        console.log('getUserInfo', token)
        try {
            const res = await getData('/user')
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function updateUserInfo(payload: any) {
        try {
            const res = await putData('/user', payload)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function updateNickName(nickname: string) {
        const res = await putData<any>('/user', { nickname })
        return res
    }

    async function updatePassword(password: string, newPassword: string) {
        const res = await postData<unknown>('/user/password', { password, newPassword })
        return res
    }

    return {
        getUserInfo,
        updateUserInfo,
        saveAsset,
        updateNickName,
        updatePassword,
    }
}

export default useUser
