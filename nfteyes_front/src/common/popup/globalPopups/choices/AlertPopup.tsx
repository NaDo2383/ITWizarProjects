import React from 'react'
import GlobalMainPopup from '../../_partials/GlobalMainPopup'
// import { POPUP_TYPES } from '../popupRegistration'
function AlertPopup() {
    // const { hidePopup, showPopup } = usePopupCtx()

    return (
        <GlobalMainPopup title="AlertPopup">
            this is alert message
            <button className="w-full">Ok</button>
        </GlobalMainPopup>
    )
}
export default AlertPopup
