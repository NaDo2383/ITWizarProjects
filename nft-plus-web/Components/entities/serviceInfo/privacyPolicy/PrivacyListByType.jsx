import React, { useEffect, useState } from 'react'
import useServiceInfo from '../useServiceInfo'
import { useRouter } from 'next/router'

function PrivacyListByType() {
    const { push } = useRouter()
    const { getPrivacyPolicyByType } = useServiceInfo()
    const [privacyPolicyByType, setPrivacyPolicyByType] = useState(null)

    function handleClick(id) {
        push('/serviceInfo/privacy-policy/' + id)
    }
    useEffect(() => {
        getPrivacyPolicyByType().then((res) => {
            setPrivacyPolicyByType(res.result)
        })
    }, [])

    return (
        <ul>
            {
                privacyPolicyByType?.length > 0 && privacyPolicyByType.map((item, idx) => (
                    <li
                        key={'privacyPolicyByType' + idx}
                        className='pb-2 cursor-pointer'
                        onClick={() => handleClick(item.id)}
                    >
                        {item.startDate} - {item.endDate}
                    </li>
                ))
            }
        </ul>
    )
}

export default PrivacyListByType