import React, { useEffect, useState } from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import useMypageTranslation from "locale/useMypageTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useLicense from "../useLicense";

function LicenseContractRefusalPopup() {
    const { postLicenseDenyReason, getLicenseRequests } = useLicense()
    const { 
        declineContractQuestionI18,
        reasonI18,
		enterI18 ,
        contactUsI18
    } = useMypageTranslation();
    const { refuse, cancel } = useArtworkTranslation()
    const [denyReason, setDenyReason] = useState('')

    const {
        hideAllModals,
        globalModalState
    } = usePopup();

    function handleOnChangeReason(e) {
        const { value } = e.target
        setDenyReason(value)
    }
    function handleButton() {
        const data = {
            denyReason,
            id: globalModalState?.license?.id
        }

        postLicenseDenyReason(data).then(res => {
            globalModalState.getLicenseList().then( () => hideAllModals() )
        })
    }

    return (
        <MainPopup width={464}>
            <PopupContainer>
                <PopupHeader text={declineContractQuestionI18} />
                <PopupContent>
                    <div className="tracking-tighter max-w-[464px] mt-[8px] mb-[40px]">
                        <span className="flex text-[#B0B0B0] text-[16px] font-[500] sm:justify-start justify-center">{reasonI18}</span>
                        <div className="w-full  font-[300] leading[28px] tracking[-1px] text-[15px] text-tcolor pt-[30px]">
                            <textarea
                                placeholder={enterI18}
                                className="resize-none w-full px-[14px] py-[10px] text-[#5A5A5A] rounded-[5px] focus:outline-none  font-[300] leading[28px] tracking[-1px] text-[16px] text-tcolor bg-[#0F1111] placeholder-[#5A5A5A]"
                                rows="6"
                                name="reason"
                                value={denyReason}
                                onChange={handleOnChangeReason}
                            />
                        </div>
                    </div>
                </PopupContent>
                <PopupActionButtons 
                    yes={() => handleButton()} 
                    no={() => hideAllModals()} 
                    btnTexts={{ no: cancel, yes: contactUsI18 }} 
                />
            </PopupContainer>
        </MainPopup>
    )
}

export default LicenseContractRefusalPopup;