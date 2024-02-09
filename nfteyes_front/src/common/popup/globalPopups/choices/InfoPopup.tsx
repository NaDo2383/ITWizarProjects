import React from 'react'
import GlobalMainPopup from '../../_partials/GlobalMainPopup'
import { useGlobalPopupCtx } from '../useGlobalPopupCtx'

function InfoPopup(): JSX.Element {
    const { globalPopupState } = useGlobalPopupCtx()

    return (
        <GlobalMainPopup title="Extend info">
            <p className="text-black whitespace-pre-wrap max-w-4xl max-h-[70vh] overflow-y-scroll">
                {JSON.stringify(JSON.parse(globalPopupState?.extendInfo), null, 4)}
            </p>
        </GlobalMainPopup>
    )
}

export default InfoPopup
