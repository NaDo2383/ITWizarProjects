import useArtwork from 'Components/entities/artwork/useArtwork'
import useArtworkTranslation from 'locale/useArtworkTranslation'
import useMyPageTranslation from 'locale/useMypageTranslation'
import React from 'react'
import Image from 'next/image'

function MergedRights(props) {
    const { data } = props
    const { mergeRights } = useArtwork()
    const { allRightsI18 } = useArtworkTranslation()
    const { rightsTextsI18 } = useMyPageTranslation()

    return (
        <>
            {
                mergeRights(data).map((right, index) => (
                    <div key={`index-${index}`} className="w-full flex items-center text-center">
                        <div className="text-[#333] w-max pl-8 font-[300] flex items-center gap-1">
                            <div className="relative flex items-center">
                                <Image src='/ic_check.svg' alt="ic_check_icon" width={7} height={7} />
                            </div>
                            <p>
                                {allRightsI18[right.code] == rightsTextsI18
                                    ? allRightsI18[right.code].split("(")[0].trim()
                                    : allRightsI18[right.code]}
                            </p>
                        </div>
                        <div className="font-[500] flex-1 flex justify-end text-[#999]  text-[13px]">
                            <p className="truncate">
                                ({" "}
                                {right.startDate ? (right.startDate?.split(" ")[0]) : (
                                    <></>
                                )}
                            </p>
                            {" ~ "}
                            <p className="truncate">
                                {right.endDate ? (right.endDate?.split(" ")[0]) : (
                                    <></>
                                )}{" "}
                                )
                            </p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default MergedRights