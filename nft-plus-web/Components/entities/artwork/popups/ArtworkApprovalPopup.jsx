import React, { useEffect, useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import usePopup from 'Components/ui/popup/usePopup'
import useMyPageTranslation from 'locale/useMypageTranslation'
import useArtwork from '../useArtwork'
import Image from 'next/image'
import closeIcon from "public/close.svg";

function ArtworkApprovalPopup(props) {
    const {
    } = props
    const {
        hideModal,
        getCurrentModalprops,
        popupProps,
        handleShowModal,
        MODAL_TYPES
    } = usePopup();
    const { deleteArtWork } = useArtwork()
    const { registration_refusalI18, cancelI18, reasonRefusalI18 } = useMyPageTranslation();

    useEffect(() => {
        getCurrentModalprops()
    }, [])

    function showArtworkDeletePopup() {
        handleShowModal(MODAL_TYPES.ARTWORK_DELETE, { artwork: popupProps?.artwork, handleDelete: deleteArtWork })
    }

    return (
        <MainPopup>
            <div className='w-[530px] popup p-[30px]'>
                <div className='relative flex flex-col w-full rounded-[15px]'>
                    <div className='flex items-center justify-between mb-[51px]'>
                        <h3 className='text-[22px] text-[#fff] leading-normal font-medium'>{registration_refusalI18}</h3>
                        <button onClick={() => hideModal()} className="w-7 h-7">
                            <Image src={closeIcon} alt="closeIcon" />
                        </button>
                    </div>
                    <div className='flex flex-row border-b-2 border-[#292929] py-[13px] gap-[74px]'>
                        <h3 className='text-[#B0B0B0]'>작품명</h3>
                        <div className='text-white'>
                            {popupProps?.artwork?.artworkName}
                        </div>
                    </div>
                    <div className='relative pt-[12px] pb-[10px]'>
                        <p className='text-[#B0B0B0] font-medium mt-[14px] mb-[12px] text-[16px]'>{reasonRefusalI18}</p>
                        <textarea
                            disabled
                            name="question"
                            placeholder={popupProps?.artwork?.denyReason}
                            className="bg-[#0F1111] text-white w-full h-[150px] focus:outline-none focus:border-[#ff00e4] border border-[#0F1111] placeholder:text-[#DDDDDD] placeholder:font-[400] rounded-[5px] py-[16px] px-[15px]"></textarea>
                    </div>
                    <div className='text-[#B0B0B0] font-[350] text-[16px]'>
                        <p>[권리 심사 문의]</p>
                        <p>가이드의 문의하기 또는 메일 (tamtam@eyesprotocol.io)</p>
                    </div>
                    <div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px] mt-[35px]">
                        <button className="max-w-[140px] w-full bg-[#FB3873] cursor-pointer text-white py-[5px] focus:outline-none text-center rounded-[5px] px-[20px]" onClick={showArtworkDeletePopup}>
                            <h3 className="text-[18px] font-[500]">{cancelI18}</h3>
                        </button>
                    </div>
                </div>
            </div>
        </MainPopup>
    )
}

export default ArtworkApprovalPopup