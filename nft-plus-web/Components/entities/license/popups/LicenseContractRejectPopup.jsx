import React from 'react'
import closeIcon from "public/close.svg";
import Image from 'next/image';
import MainPopup from 'Components/ui/popup/MainPopup'
import usePopup from 'Components/ui/popup/usePopup'
import useMyPageTranslation from 'locale/useMypageTranslation'
import LicensePopupTable from './LicencePopupTable';

function LicenseContractRejectPopup() {
    const { hideModal } = usePopup()
    const { layerTitleI18, cancelI18, confirmI18 } = useMyPageTranslation();

    return (
        <MainPopup>
            <div className='w-[620px] popup-container'>
                <div className='popup-form'>
                    <div className='popup-border'>
                        <h3 className='popup-title'>{layerTitleI18}</h3>
                        <button onClick={() => hideModal()} className="w-[20px] h-[20px]">
                            <Image src={closeIcon} alt="closeIcon" />
                        </button>
                    </div>
                    <div className='w-full h-100 overflow-y-scroll sm:overflow-y-auto'>
                        <LicensePopupTable />
                    </div>
                </div>
                <div className="popup-btn-div">
                    <button onClick={() => hideModal()} className="w-1/2 bg-[#333] text-white py-4 text-center rounded-bl-lg cursor-pointer">
                        <h3 className="text-[20px] font-[500]">{cancelI18}</h3>
                    </button>
                    <button onClick={() => hideModal()}  className="w-1/2 bg-[#ff00e4] cursor-pointer text-white py-4 focus:outline-none text-center rounded-br-lg">
                        <h3 className="text-[20px] font-[500]">{confirmI18}</h3>
                    </button>
                </div>
            </div>
        </MainPopup>
    )
}

export default LicenseContractRejectPopup;