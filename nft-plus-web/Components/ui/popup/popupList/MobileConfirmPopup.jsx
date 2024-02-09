import React, { useEffect, useState } from 'react'
import MainPopup from '../MainPopup'
import PopupActionButtons from '../popupMaterials/PopupActionButtons'
import PopupContainer from '../popupMaterials/PopupContainer'
import PopupContent from '../popupMaterials/PopupContent'
import PopupHeader from '../popupMaterials/PopupHeader'
import usePopup from '../usePopup'
import useArtworkTranslation from 'locale/useArtworkTranslation'

function MobileConfirmPopup() {
    const {
        hideModal,
        getCurrentModalprops,
        popupProps,
        globalModalState
    } = usePopup()
    const {
        cancel,
        stopSelling,
        stopSellingQuestionI18,
        stopSellingWarningI18,
    } = useArtworkTranslation();

    useEffect(() => {
        globalModalState.stopArtDetailPrice()
        getCurrentModalprops()
    }, [])

    return (
        <MainPopup width={580}>
            <PopupContainer>
                <PopupHeader text={stopSelling} />
                <PopupContent>
                    <div className='full pt-[30px] mb-[30px] flex flex-col justify-center relaive'>
                        <p className='sm:text-[16px] text-[14px]'>
                            {stopSellingQuestionI18}</p>
                        <p className='sm:text-[16px] text-[14px]'>
                            {stopSellingWarningI18}
                        </p>
                    </div>
                </PopupContent>
                <PopupActionButtons yes={popupProps?.confirm} no={() => hideModal()} btnTexts={{ no: cancel, yes: stopSelling }} />
            </PopupContainer>
        </MainPopup>
    )
}

export default MobileConfirmPopup;