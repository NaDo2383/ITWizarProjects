import React, { useEffect } from 'react'
import closeIcon from "public/close.svg";
import Image from 'next/image';
import MainPopup from 'Components/ui/popup/MainPopup'
import usePopup from 'Components/ui/popup/usePopup'
import useMyPageTranslation from 'locale/useMypageTranslation'
import LicenseViewContractText from './LicenseViewContractText';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupHeader from 'Components/ui/popup/popupMaterials/PopupHeader';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupActionButtons from 'Components/ui/popup/popupMaterials/PopupActionButtons';

function LicenseViewContractPopup() {
    const { hideModal } = usePopup()
    const { confirmContractI18, cancelI18, confirmI18 } = useMyPageTranslation();
    const {
        getCurrentModalprops,
        popupProps
    } = usePopup();

    useEffect(() => {
        getCurrentModalprops()
    }, [])

    return (
        <MainPopup>
            <PopupContainer>
                <div className='flex justify-between'>
                    <PopupHeader text={confirmContractI18} />
                    <button onClick={() => hideModal()} className="w-[20px] h-[20px]">
                        <Image src={closeIcon} alt="closeIcon" />
                    </button>
                </div>
                <PopupContent>
                        <div className='popup-form'>
                            <div className='w-full h-100 overflow-y-scroll sm:overflow-y-auto'>
                                <LicenseViewContractText popupProps= {popupProps} />
                            </div>
                        </div>
                </PopupContent>
                <PopupActionButtons 
					yes={ () => hideModal() } 
					no={ () => hideModal() } 
					btnTexts={ { no: cancelI18, yes: confirmI18 } } 
				/>
            </PopupContainer>
        </MainPopup>
    )
}

export default LicenseViewContractPopup;