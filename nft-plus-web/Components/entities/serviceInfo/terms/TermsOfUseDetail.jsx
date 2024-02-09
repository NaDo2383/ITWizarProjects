import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useServiceInfo from '../useServiceInfo'
import { useState } from 'react'
import Container from 'Components/ui/containers/Container'
import IFrame from 'Components/ui/Iframe'

function TermsOfUseDetail() {
    const { query } = useRouter()
    const { getTermDetail } = useServiceInfo()
    const [termDetail, setTermDetail] = useState(null)
    useEffect(() => {
        if (query.id) {
            getTermDetail(query.id).then((res) => {
                setTermDetail(res)
            })
        }
    }, [query])

    return (
        <Container>
            <div className='pb-10'>
                {
                    termDetail && <IFrame src={termDetail.content} />
                }
            </div>
        </Container>
    )
}

export default TermsOfUseDetail