import { useEffect, useState } from 'react'
import { useCrud } from './useCrud'

function useAxiosData(url) {
    const { getData } = useCrud()
    const [data, setData] = useState(null)

    useEffect(() => {
        getData(url).then((res) => {
            if (res.success) {
                setData(res)
            }
        })
    }, [url])

    return data
}

export default useAxiosData
