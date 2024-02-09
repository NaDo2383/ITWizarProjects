import { useEffect, useState } from 'react'
import { useCrud } from './useCrud'

function useAxiosData<T>(url: string) {
    const { getData } = useCrud()
    const [data, setData] = useState<unknown | null>(null)

    useEffect(() => {
        getData<T>(url).then((res: any) => {
            if (res.success) {
                setData(res)
            }
        })
    }, [url])

    return data
}

export default useAxiosData
