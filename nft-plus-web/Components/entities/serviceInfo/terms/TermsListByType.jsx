import React, { useEffect } from 'react'
import useServiceInfo from '../useServiceInfo'
import { useRouter } from 'next/router'

function TermsListByType() {
    const { getTermsByType, termsByType } = useServiceInfo()
    const { locale, push } = useRouter()
    
    function handleClick(id) {
        push('/serviceInfo/terms-of-use/'+ id)
    }
    
    useEffect(() => {
        getTermsByType()
    },[locale])

  return (
    <ul>
        {
            termsByType?.result?.length > 0 && termsByType.result.map( (termByType, idx) => (
                <li 
                    key={'termByType' + idx} 
                    className='pb-2 cursor-pointer'           
                    onClick={() => handleClick(termByType.id)}
                >
                    { termByType.startDate } - { termByType.endDate }
                </li>
            ))
        }
    </ul>
  )
}

export default TermsListByType