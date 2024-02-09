/**
 * @createdBy Phill Anderson 2022/3/30
 */
import { useState } from 'react'
function useTable() {
    const [ pagination, setPagination ] = useState({
        page: 1,
        size: 3,
        totalPage: 3
    })

    function handlePage(e, value) {
        setPagination((prev) => ({ ...prev, page: value }))
    }
    return {
        pagination, 
        setPagination,
        handlePage
    }
}

export default useTable