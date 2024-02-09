import { Wrapper } from 'components/ui/containers/Wrapper'
import Flex from 'components/ui/containers/flex/Flex'
import React, { useEffect, useRef } from 'react'
import ImageUpload from 'components/ui/imageUpload/Upload'
import StatsMainCard from 'features/statistics/StatsMainCard'
import useStatistics from './useStatistics'
import { useStatisticsCtx } from './useStatisticsCtx'
import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'

const StatsMainPage: React.FC = () => {
    const { getAnalyseStats, uploadStatisticImage } = useStatistics()
    const { statsMainData } = useStatisticsCtx()
    const { setSiteGlobalItems, setIsLoadingGlobal } = useSiteGlobalCtx()
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const { showGlobalPopup } = useGlobalPopupCtx()

    async function handleDropImage(file: File) {
        setIsLoadingGlobal(true)
        try {
            const res = await uploadStatisticImage(file)

            if (res.success) {
                setSiteGlobalItems((prev: any) => ({
                    ...prev,
                    analyzeRes: res.result,
                }))
                showGlobalPopup(GLOBAL_POPUP_TYPES.ANALYZE)
            }

            if (res.statusCode === 415) {
                alert('unsupported media type!')
            }
        } finally {
            setIsLoadingGlobal(false)
        }
    }

    useEffect(() => {
        if (videoRef?.current) videoRef.current.play()
    }, [videoRef])

    useEffect(() => {
        getAnalyseStats()
    }, [])

    return (
        <Wrapper>
            <Flex className="gap-20 mb-[10px]">
                <Flex className="flex-col w-full relative justify-end h-[276px]">
                    <video
                        ref={videoRef}
                        className="w-full h-full absolute object-cover top-0 left-0 min-h-[276px] z-0 bg-blackPurple"
                        loop
                        playsInline
                        muted
                    >
                        <source src="/videos/bannerVideo.mp4" type="video/mp4" />
                    </video>
                    <Flex className="flex-col h-full md:flex-row w-full justify-center items-center md:items-end gap-22 z-10">
                        <div className="text-100 h-fit block_count_gradiant font-tekoRegular">
                            {statsMainData?.endBlockNumber.toLocaleString()}
                        </div>
                        <div className="text-50 font-tekoLight h-fit text-white pb-[28px]">Blocks</div>
                    </Flex>
                </Flex>
            </Flex>
            <h1 className="text-50 text-blackpink text-center mb-[56px] font-abelRegular">
                We are crawling NFTs even now.
            </h1>
            <ImageUpload callback={handleDropImage} />
            <StatsMainCard />
        </Wrapper>
    )
}

export default StatsMainPage
