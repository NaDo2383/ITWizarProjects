/**
 * @createdBy Phill Anderson 2022/02/27
 */

interface IErrMessage {
    code: number
    msg: string
}

function useMessageFactory() {
    const calcMessage = (statusCode: number): IErrMessage => {
        switch (statusCode) {
            case 400:
                return { code: statusCode, msg: 'буруу өгөгдөл' }
            case 401:
                return { code: statusCode, msg: 'нэвтрээгүй байна' }
            case 404:
                return { code: statusCode, msg: 'Ийм өгөгдөл байхгүй!' }
            case 405:
                return { code: statusCode, msg: 'aldaa' }
            case 500:
                return { code: statusCode, msg: 'сэрвэр талын алдаа' }
            default:
                return { code: statusCode, msg: 'ямар нэгэн алдаа гарлаа' }
        }
    }

    return { calcMessage }
}
export default useMessageFactory
