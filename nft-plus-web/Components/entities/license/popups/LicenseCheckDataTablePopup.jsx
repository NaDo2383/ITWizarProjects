/**
 * @createdBy duka
 */
import React, { useEffect, useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupHeader from 'Components/ui/popup/popupMaterials/PopupHeader';
import PopupActionButtons from 'Components/ui/popup/popupMaterials/PopupActionButtons';
import usePopup from 'Components/ui/popup/usePopup'
import useMyPageTranslation from 'locale/useMypageTranslation'
import LicensePopupTable from './LicencePopupTable';

function LicenseCheckDataTablePopup() {
    const { layerTitleI18, cancelI18, confirmContractI18 } = useMyPageTranslation();
    const {
        hideAllModals,
        getCurrentModalprops,
        popupProps,
        handleShowModal,
        MODAL_TYPES
    } = usePopup();
    const [thisProps, setThisProps] = useState(null)

    function showLicenseAgreementPopup() {
        handleShowModal(MODAL_TYPES.LICENSE_AGREEMENT, { ...thisProps }) 
    }

    useEffect(() => {
        getCurrentModalprops().then(res => setThisProps(res))
    }, [])

    return (
        <MainPopup>
            <PopupContainer>
                <PopupHeader text={layerTitleI18} />
                <PopupContent>
                    <div className='w-full h-100 overflow-y-scroll sm:overflow-y-auto'>
                        <LicensePopupTable popupProps={popupProps} />
                    </div>
                </PopupContent>
                <PopupActionButtons 
                    yes={() => showLicenseAgreementPopup()} 
                    no={() => hideAllModals()} 
                    btnTexts={{ no: cancelI18, yes: confirmContractI18 }} 
                />
            </PopupContainer>
        </MainPopup>
    )
}

export default LicenseCheckDataTablePopup;