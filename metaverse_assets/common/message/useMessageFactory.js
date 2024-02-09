/**
 * @createdBy Phill Anderson 2022/02/27
 */

import { useRouter } from 'next/navigation'
import { GLOBAL_POPUP_TYPES } from '../popup/globalPopups/globalPopupRegistration'
import { useGlobalPopupCtx } from '../popup/globalPopups/useGlobalPopupCtx'

function useMessageFactory() {
    const { push } = useRouter()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const calcMessage = (statusCode) => {
        switch (statusCode) {
            case 400:
                return { code: statusCode, msg: 'буруу өгөгдөл' }
            case 401:
                return { code: statusCode, msg: 'нэвтрээгүй байна' }
            case 404:
                return {
                    code: statusCode,
                    msg: 'Ийм өгөгдөл байхгүй!',
                }
            case 405:
                return { code: statusCode, msg: 'aldaa' }
            case 500:
                return { code: statusCode, msg: 'сэрвэр талын алдаа' }
            default:
                return {
                    code: statusCode,
                    msg: 'ямар нэгэн алдаа гарлаа',
                }
        }
    }

    function apiErrorMessage(e) {
        const statusCode = e?.response?.status

        if (statusCode === 401) {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: '로그인 해주세요',
            })
            push('/login')
            return
        } else if (statusCode === 500) {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message:
                    'please check internet connection or something went wrong on the server',
            })
            return
        } else {
            console.error(e)
            return e
        }
    }

    return { calcMessage, apiErrorMessage }
}

export default useMessageFactory
