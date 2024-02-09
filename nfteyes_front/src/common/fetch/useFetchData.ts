import { useEffect, useState } from 'react'
import { ApiClient } from './fetchCrud'

function useFetchData<T>(url: string) {
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        const fetchApi = new ApiClient()
        fetchApi.fetchItems<T>(url).then((res: T) => {
            setData(res)
        })
    }, [url])

    return data
}

export default useFetchData
