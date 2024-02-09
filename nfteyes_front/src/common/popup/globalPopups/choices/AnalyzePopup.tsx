import GlobalMainPopup from 'common/popup/_partials/GlobalMainPopup'
import { PrimaryButton, SecondaryButton } from 'components/ui/button/Button'
import Flex from 'components/ui/containers/flex/Flex'
import React from 'react'
import { useGlobalPopupCtx } from '../useGlobalPopupCtx'
import { useRouter } from 'next/router'
import useStatistics from 'features/statistics/useStatistics'
import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'

function AnalyzePopup() {
    const { hideGlobalPopup } = useGlobalPopupCtx()
    const { siteGlobalItems } = useSiteGlobalCtx()
    const { push } = useRouter()
    const { startAnalyse } = useStatistics()

    function handleConfirm() {
        if (siteGlobalItems?.analyzeRes) {
            startAnalyse(siteGlobalItems?.analyzeRes.result)
                .then(() => {
                    hideGlobalPopup()
                    push('/analysis/' + siteGlobalItems?.analyzeRes.result)
                })
                .catch((error: any) => {
                    console.error(error)
                    alert('Sorry. Does not start analyze process!!!')
                })
        }
    }
    return (
        <GlobalMainPopup>
            {/* h2 дээр tailwind - ээс text color орж ирэхгүй бна. яагаад? */}
            <h2
                style={{ color: 'rgb(39 32 42 / var(--tw-text-opacity))' }}
                className=" text-center text-darkPopupText font-300 mt-[1px] mb-[21px] leading-[58px]"
            >
                Start the Analysis
            </h2>
            <Flex className="gap-20">
                <SecondaryButton onClick={hideGlobalPopup}>Cancel</SecondaryButton>
                <PrimaryButton onClick={handleConfirm}>Confirm</PrimaryButton>
            </Flex>
        </GlobalMainPopup>
    )
}

export default AnalyzePopup
