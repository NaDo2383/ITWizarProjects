import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { useCrud } from 'common/axios/useCrud'

function useUser() {
    const { postData, getData, putData } = useCrud()
    const { showGlobalPopup } = useGlobalPopupCtx()

    async function saveAsset(data) {
        try {
            const res = await putData('/asset', data, true)
            return res
        } catch (e) {
            const msg = e?.response?.statusCode
            return msg
        }
    }
    async function saveAssetNft(data) {
        try {
            const res = await postData('/assetnft', data, true)
            return res
        } catch (e) {
            const msg = e?.response?.statusCode
            return msg
        }
    }

    async function checkId(username) {
        try {
            const res = await postData('/check/username', { username }, true)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function checkUserIds(usersArray) {
        try {
            let result = true
            let users = []
            await Promise.all(
                usersArray.map(async (id) => {
                    if (!id) return
                    const res = await checkId(id)

                    if (res.data.message !== 'success') {
                        showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                            message:
                                '존재하지 않는 창작자 ID입니다. 창작자 ID를 확인해주세요',
                        })
                        result = false
                    } else {
                        users.push(res.data?.result)
                        result = true
                    }
                })
            )

            return { result, users }
        } catch (e) {
            console.error(e)
            return { result: false }
        }
    }

    async function getUserInfo(token) {
        try {
            const res = await getData('/user', true, token)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function updateUserInfo(payload) {
        try {
            const res = await putData('/user', payload, true)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function updateWallet(payload) {
        try {
            const res = await postData('/user/wallet', payload, true)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getUserLicensePurchaseStatus(payload) {
        try {
            const { token, userId } = payload
            const res = await postData('/products/user/info/orders', {
                accessToken: token,
                userId,
            })
            return res
        } catch (e) {
            console.error(e)
            return e.response
        }
    }

    return {
        getUserInfo,
        updateUserInfo,
        getUserLicensePurchaseStatus,
        saveAsset,
        checkId,
        saveAssetNft,
        checkUserIds,
        updateWallet,
    }
}

export default useUser
