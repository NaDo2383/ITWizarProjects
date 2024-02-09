import React, { useEffect } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import PopupHeader from 'Components/ui/popup/popupMaterials/PopupHeader';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import useFAQpageTranslation from 'locale/useFAQpageTranslation';
import usePopup from 'Components/ui/popup/usePopup';
import useArtworkTranslation from 'locale/useArtworkTranslation';

function BuyRequestAccessPopup() {
    const { confirmI18 } = useFAQpageTranslation();
    const {
        notAvailable2I18,
        licenseTknTradeReg2I18,
        toI18
    } = useArtworkTranslation();
    const {
        hideAllModals,
        popupProps,
        getCurrentModalprops
    } = usePopup();

    useEffect(() => {
        getCurrentModalprops()
    }, [popupProps])

    return (
        <MainPopup>
            <PopupContainer>
                <PopupHeader text={notAvailable2I18} />
                <PopupContent>
                    <div className='flex min-w-[255px] flex-row gap-1 font-[500] lg:items-center sm:items-center items-start mt-[20px] sm:text-[18px] md:text-[18px] text-[14px] mb-[40px] flex-wrap text-[#DDD]'>
                        <span className='text-white font-medium'>
                            {popupProps?.ownerName}
                        </span>
                        <span className='whitespace-nowrap'>{toI18}</span>
                        <span className='text-white font-medium'>
                            {popupProps?.artworkName}
                        </span>
                        <span className=''>{licenseTknTradeReg2I18}</span>
                    </div>
                </PopupContent>
                <div className='hidden sm:flex sm:flex-col overflow-hidden'>
                    <div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px]">
                        <button className="max-w-[107px] w-full bg-[#FB3873] cursor-pointer text-white py-[6px] focus:outline-none text-center rounded-[5px]" onClick={() => hideAllModals()}>
                            <h5 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">{confirmI18}</h5>
                        </button>
                    </div>
                </div>
                <div className='sm:hidden'>
                    <button
                        onClick={() => hideAllModals()}
                        className={`w-full bg-[#404040] cursor-pointer text-white py-[6px] focus:outline-none text-center rounded-[5px] text-[15px]`}>
                        {confirmI18}
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default BuyRequestAccessPopup