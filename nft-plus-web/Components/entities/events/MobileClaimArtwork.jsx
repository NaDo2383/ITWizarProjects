import React, { useState } from 'react'
import useAuthUser from '../user/auth/useAuthUser';
import usePopup from 'Components/ui/popup/usePopup';
import useEvent from './useEvent';
import useArtworkTranslation from 'locale/useArtworkTranslation';
import useAlertTranslation from 'locale/useAlertTranslation';

export default function MobileClaimArtwork() {
    const [adCode, setAdCode] = useState("");
    const { authUser } = useAuthUser();
    const { handleShowModal, MODAL_TYPES } = usePopup();
    const { getAirDropArtwork } = useEvent();
    const { claimArtworkTitleI18, claimArtworkPlaceholderI18, claimArtworkBtnI18 } = useArtworkTranslation();
    const {vmErrorI18} = useAlertTranslation()

    return (
        <div className='w-full flex flex-col px-[16px]'>
            <div className='text-[20px] font-medium tracking-[-0.3px] text-[#E0E6E8] mt-[25px] mx-auto'>
                {claimArtworkTitleI18}
            </div>
            <div className='mt-[20px]'>
                <input
                    value={adCode}
                    onChange={(e) => setAdCode(e.target.value)}
                    type="text"
                    className={`rounded-[6px] bg-[#090A0A] h-[50px] w-full min-w-[327px] text-[15px] leading-[15px] text-[#828282] p-[16.67px_15px_16.67px_15px] outline-none`}
                    placeholder={claimArtworkPlaceholderI18}
                />
            </div>
            <div className='flex justify-center items-center'>
                <div onClick={() => {
                    if (adCode !== "") {
                        if (authUser?.id) {
                            getAirDropArtwork(adCode);
                        } else {
                            handleShowModal(MODAL_TYPES?.GO_TO_LOGIN);
                        }
                    } else {
                        alert(vmErrorI18)
                    }
                }}
                    className='text-[15px] font-medium text-[#FFF] rounded-[5px] bg-[#404040] p-[5px_15px_5px_15px] min-w-[90px] h-[40px] flex justify-center items-center mt-[35px] cursor-pointer'
                >
                    {claimArtworkBtnI18}
                </div>
            </div>
        </div>
    )
}
