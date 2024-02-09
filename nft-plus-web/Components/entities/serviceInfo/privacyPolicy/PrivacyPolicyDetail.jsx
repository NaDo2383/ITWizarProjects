import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useServiceInfo from '../useServiceInfo'
import IFrame from 'Components/ui/Iframe'
import Seo from 'common/seo/Seo'

function PrivacyPolicyDetail() {
    const { query } = useRouter()
    const { getTermDetail } = useServiceInfo()
    const [privacyDetail, setPrivacyDetail] = useState(null)
    
    useEffect(() => {
        if (query.id) {
            getTermDetail(query.id).then((res) => (
                setPrivacyDetail(res)
            ))
        }
    }, [query])

    return (
        <Container>
            {
                privacyDetail &&
                <IFrame
                    src={privacyDetail.content}
                />
            }
        </Container>
    )
}

export default PrivacyPolicyDetail