/**
 * @createdBy Phill Anderson 2022/12/19
 */
import React from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import {useGlobalModalContext} from "../useModalcontext";
import MainPopup from "../MainPopup";

function ReportSuccessPopup() {
    const {confirmI18} = useMyPageTranslation();
    const {declarationI18, receptionCompleteI18} = useArtworkTranslation();
    const {hideModal} = useGlobalModalContext();
    
    return (
        <MainPopup>
            <div className="w-full">
                <div className="mx-4 py-4 flex justify-between border-b-[1px]">
                    <div>
                        <h3 className="font-[500] text-[#010101] text-[22px]">{declarationI18}</h3>
                    </div>
                    <button onClick={hideModal} className="cursor-pointer w-7 h-7">
                        <div className="h-px bg-black w-[35px] relative before:absolute before:w-full before:h-full before:bg-black transform rotate-45 before:transofrm before:-rotate-90 before:left-0"></div>
                    </button>
                </div>
                <div className="w-full mb-[10px]">
                    <h3 className="  tracking-[-1px] text-[16px] text-center mx-[50x] my-[30px] px-[20px]">{receptionCompleteI18}</h3>
                </div>
                <div className="w-full h-[56px] bg-grey flex">
                    <button onClick={hideModal} className="w-full h-full bg-[#333] flex justify-center items-center">
                        <div className="font-[300] text-white  tracking-[-1px] leading-[57px]">{confirmI18}</div>
                    </button>
                </div>
            </div>
        </MainPopup>
    );
}

export default ReportSuccessPopup;
