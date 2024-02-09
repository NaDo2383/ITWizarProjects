import React, { useEffect, useState } from 'react'
import PaginationReal from '../pagination/PaginationReal'

// энэ хэсэгт props state нь undefined орж ирээд байгаа тул үүнийг болилоо.
function TableMain(props) {
    const { data, children } = props
    const [ pagination, setPagination ] = useState({
        page: data.page,
        size: 3,
        totalPage: data.totalPage
    })

    function handlePage(e, value) {
        setPagination((prev) => ({ ...prev, page: value }))
    }
    
    useEffect(() => {
        setPagination((prev) => ( 
            {...prev, 
                page: data.page, 
                size: data.size || 10, 
                totalPage: data.totalPage
            }))
    },[])
    
  return (
    <div>
        <table> { children } </table>
        <div className='flex w-full justify-center pt-[100px]'>
            <PaginationReal 
                page={pagination.page} 
                totalPage={pagination.totalPage} 
                onChange={handlePage} 
            />
        </div>
    </div>
  )
}

export default TableMain