import React from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import Image from 'next/image'
import warning from "public/icone.svg";
import usePopup from 'Components/ui/popup/usePopup';
import useArtworkTranslation from 'locale/useArtworkTranslation';

function FindLoginPopup() {
    const { hideModal } = usePopup();
    const { close: closeI18,  errorMessageI18 } = useArtworkTranslation();
    
    return (
        <MainPopup width={572}>
            <div className=" py-12 px-8 flex flex-col items-center  justify-center text-center relative">
                <div className='relative'>
                <Image src={warning} alt="warning" />
            </div>
            <h5
                className={
                    "  tracking-[-1px] text-[16px] text-center mx-[50x] mt-[30px] px-[20px]"
                }
            >
                {errorMessageI18}
            </h5>
            <button
                onClick={() => hideModal()}
                className="w-1/2 bg-[#333] rounded-md text-white py-4 cursor-pointer text-center"
            >
                {closeI18}
            </button>
            </div>
        </MainPopup>
    )
}

export default FindLoginPopup