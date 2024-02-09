import React, { useEffect } from 'react'
import MainPopup from '../MainPopup'
import PopupHeader from '../popupMaterials/PopupHeader'
import usePopup from '../usePopup';
import PopupContainer from '../popupMaterials/PopupContainer';
import PopupContent from '../popupMaterials/PopupContent';
import useArtworkTranslation from 'locale/useArtworkTranslation'
import useFAQpageTranslation from 'locale/useFAQpageTranslation';

function CreatorRoyaltyPopup() {
    const { hideModal, popupProps, getCurrentModalprops } = usePopup()
    const { confirmI18 } = useFAQpageTranslation()
    const { creatorRoyaltyI18, creatorRoyaltyDescI18, creatorRoyaltyDesc2I18 } = useArtworkTranslation()

    useEffect(() => {
        getCurrentModalprops()
    }, [])

    return (
        <MainPopup width={580}>
            <PopupContainer>
                <PopupHeader text={creatorRoyaltyI18} />
                <PopupContent>
                    <p className='text-[#DDD] text-[18px] font-regular mt-[30px]'>
                        {creatorRoyaltyDescI18}
                    </p>
                    <p className='text-[#DDD] text-[18px] font-regular mb-[30px]'>
                        {creatorRoyaltyDesc2I18}
                    </p>
                </PopupContent>
                <div className='flex justify-between'>
                    <div></div>
                    <button className=' w-full text-[18px] max-w-[100px] rounded-[5px] bg-[#FB3873] text-white px-[28px] pt-[6px] pb-[8px] cursor-pointer text-center' onClick={() => hideModal()}>{confirmI18}</button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default CreatorRoyaltyPopup