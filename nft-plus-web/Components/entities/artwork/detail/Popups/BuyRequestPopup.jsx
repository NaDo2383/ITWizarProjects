import React, { useEffect } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import PopupHeader from 'Components/ui/popup/popupMaterials/PopupHeader';
import PopupActionButtons from 'Components/ui/popup/popupMaterials/PopupActionButtons';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import usePopup from 'Components/ui/popup/usePopup';
import useArtDetail from '../useArtDetail';
import useArtworkTranslation from 'locale/useArtworkTranslation';

// popup дээр зөвхөн useGlobalContext, useMetamaskContext дуудна / state , functions /
function BuyRequestPopup() {
    const {
        toI18,
        cancel,
        send,
        sendRequestWorkI18 
    } = useArtworkTranslation();
    const {
        artDetail,
    } = useArtDetail();
    const {
        hideModal,
        popupProps,
        getCurrentModalprops,
        handleShowModal,
        MODAL_TYPES
    } = usePopup();

    function handleSendRequest() {
        popupProps?.sendBuyRequest()
            .then(() => {
                handleShowModal(
                    MODAL_TYPES.BUY_REQUEST_ACCESS,
                    {
                        artworkName: popupProps?.artwork?.artworkName,
                        ownerName: popupProps?.artwork?.ownerName
                    }
                )
            })
    }

    useEffect(() => {
        getCurrentModalprops()
    }, [popupProps])

    return (
        <MainPopup>
            <PopupContainer>
                <PopupHeader text={"판매 요청 보내기"} />
                <PopupContent>
                    <div className='flex min-w-[255px] flex-row gap-1 font-[500] lg:items-center sm:items-center items-start mt-[20px] sm:text-[18px] md:text-[18px] text-[14px] mb-[40px] flex-wrap text-[#DDD]'>
                        <span className='text-white font-medium'>
                            {popupProps?.artwork?.ownerName}
                        </span>
                        <span className='whitespace-nowrap'>{toI18}</span>
                        <span className='text-white font-medium'>
                            {popupProps?.artwork?.artworkName}
                        </span>
                        <span className='whitespace-nowrap'>{sendRequestWorkI18}</span>
                    </div>
                </PopupContent>
                <div className='hidden sm:flex sm:flex-col overflow-hidden'>
                    <PopupActionButtons
                        yes={handleSendRequest}
                        no={() => hideModal()}
                        btnTexts={{ no: "취소", yes: "보내기" }}
                    />
                </div>
                <div className='sm:hidden'>
                    <div className="flex flex-col gap-[8px] w-full">
                        <button
                            onClick={handleSendRequest}
                            className={`w-full bg-[#333] ${popupProps?.load && "bg-opacity-60 cursor-wait"
                                } text-white px-[20px] text-[15px] rounded-[5px] font-[300] h-[40px] bg-[#404040]`}>
                            {send}
                        </button>
                        <button
                            onClick={() => hideModal()}
                            className={`w-full bg-[#222] text-[15px] text-white px-[20px] rounded-[5px] font-[300] h-[40px]`}>
                            {cancel}
                        </button>
                    </div>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default BuyRequestPopup