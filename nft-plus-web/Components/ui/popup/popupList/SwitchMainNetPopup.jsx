/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { useEffect } from "react";
import MainPopup from "../MainPopup";
import Image from "next/image";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useAlertTranslation from "locale/useAlertTranslation";
import usePopup from "../usePopup";

function SwitchMainNetPopup() {
  const { clickSwitchNetworkBtnI18, networkChangeI18, changePolygonI18 } = useAlertTranslation();
  const { switchNetwork } = useMetaNetwork();
  const { popupProps, getCurrentModalprops, hideModal } = usePopup();

  function checkCallback(timeout=0){
      if(popupProps?.callback){
        setTimeout(() => {
          popupProps.callback();
        }, timeout);
      }  
  }
  
  function doSwitchNetwork() {
    switchNetwork(process.env.MATIC_CHAIN_ID)
      .then((res) => {
        hideModal();
        checkCallback(300);
      })
      .catch((e) => {
          console.error("network солиход гарсан алдаа", e);
          alert(e);
      });
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
          <h2 className=" text-center lg:text-[22px] sm:text-[22px] text-[18px] mt-[-16px] leading-8">
            {networkChangeI18}
          </h2>
          <button  className="popup-close-btn absolute right-0 top-0" onClick={handleClose}>
            <Image src="/close.png" width="20" height="20" alt="close"/>
          </button>
        </div>
        <div className="flex flex-col w-full px-[30.5px] text-center">
          <p className=" font-bold mt-[20px] lg:text-[20px] sm:text-[20px] text-[15px] tracking-wide">
            {changePolygonI18}
          </p>
          <p className=" text-[#F1F1F1] lg:text-[20px] sm:text-[20px] text-[15px] mt-[5px] font-normal">
            {clickSwitchNetworkBtnI18}
          </p>
          <div className=" pt-5 pb-2">
            <button onClick={() => doSwitchNetwork()}>
              <Image  src={"/polygonIconPulse.png"} width={106} height={106} alt="polygonIcon"/>
            </button>
          </div>
        </div>
      </div>
    </MainPopup>
  );
}

export default SwitchMainNetPopup;
