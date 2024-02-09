import React, { useEffect } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import usePopup from 'Components/ui/popup/usePopup'
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer'
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent'
import Image from 'next/image'
import closeIcon from "public/close.svg";
import useArtworkTranslation from 'locale/useArtworkTranslation'
import useFAQpageTranslation from 'locale/useFAQpageTranslation'

function AlertFileSizePopup() {
    const {
        alertFileSize,
		fileSize70I18
    } =useArtworkTranslation();
    const { confirmI18 } = useFAQpageTranslation()
    const {
        hideAllModals,
    } = usePopup();

    return (
        <MainPopup width={580}>
            <PopupContainer>
                <PopupContent>
                    <div className='flex flex-row justify-between'>
                        <h3 className="text-[22px] text-white">{alertFileSize}</h3>
                        <button onClick={() => hideAllModals()} className="w-7 h-7">
                            <Image src={closeIcon} alt="closeIcon" />
                        </button>
                    </div>
                    <div className='text-[#DDDDDD] text-[18px] mt-4'>
                        <p>{fileSize70I18}</p>
                    </div>
                </PopupContent>
                <div className='flex justify-end mt-4'>
                    <button 
                        className={`min-w-[74px] bg-[#FB3873]  text-white py-[6px] focus:outline-none text-center rounded-[5px] `} 
                        onClick={hideAllModals}
                        type='submit'
                    >
                        <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{confirmI18}</h3>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default AlertFileSizePopup