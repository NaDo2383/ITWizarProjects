import React, { useEffect } from "react";
import MainPopup from "../MainPopup";
import Image from "next/image";
import { useGlobalModalContext } from "../useModalcontext";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useAlertTranslation from "locale/useAlertTranslation";
import usePopup from "../usePopup";

function SwitchEtheriumNetPopup() {
    const {
        clickSwitchNetworkBtnI18,
        networkChangeI18,
        changeI18
    } = useAlertTranslation();
    const { hideModal, } = useGlobalModalContext();
    const { getNetwork, switchNetwork } = useMetaNetwork()
    const { popupProps, getCurrentModalprops } = usePopup();

    function checkCallback(timeout=0){
        if(popupProps?.callback){
          setTimeout(() => {
            popupProps.callback();
          }, timeout);
        }  
    }

    function doSwitchNetwork() {
        switchNetwork(process.env.ETH_CHAIN_ID)
            .then((res) => { 
                hideModal();
                checkCallback(300);
            })
            .catch((e) => {
                console.error("network солиход гарсан алдаа", e);
                alert(e);
            })
    }

    function handleClose() {
        hideModal();
        checkCallback();
     }

     useEffect(() => {
		getCurrentModalprops();
	}, []);

    return (
        <MainPopup>
            <div className="  text-white rounded-lg p-4 bg-[#111111]">
                <div className="relative w-full py-3 border-b border-[#666666]">
                    <h3 className=" text-center text-[22px] leading-8 mt-[-16px]">{networkChangeI18}</h3>
                    <button className="popup-close-btn absolute right-0 top-0" onClick={handleClose}>
                        <Image src="/close.png" width="20" height="20" alt="close" />
                    </button>
                </div>
                <div className="flex flex-col w-full px-[22px] text-center">
                    <p className=" font-bold mt-[20px] text-xl tracking-wide">{changeI18}</p>
                    <p className=" text-[#F1F1F1] text-lg mt-[5px] font-normal">{clickSwitchNetworkBtnI18}</p>
                    <div className=" pt-5 pb-2">
                        <button onClick={() => doSwitchNetwork()}>
                            <Image  src={"/etheriumIconPulse.png"} width={106} height={106} alt="etheriumIcon" />
                        </button>
                    </div>
                </div>
            </div>
        </MainPopup>
    );
}

export default SwitchEtheriumNetPopup;
