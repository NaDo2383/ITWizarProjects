import React from 'react'
import useArtworkTranslation from 'locale/useArtworkTranslation'
import Image from 'next/image'

function OwnsSomeLicenses(props) {
    const { rights } = props
    const { allRightsI18 } = useArtworkTranslation()

    return (
        <>
            {
                rights?.length > 0 && rights.map((item) => (
                    <div key={item.id} className="pl-8 flex gap-1 text-[#333] font-[300]">
                        <div className="relative flex items-center">
                            <Image src='/ic_check.svg' alt="check_icon" width={7} height={7} />
                        </div>
                        <p>
                            {
                                allRightsI18[item.code].split("(")[0].trim()
                            }
                        </p>
                    </div>
                ))
            }
        </>
    )
}

export default OwnsSomeLicenses