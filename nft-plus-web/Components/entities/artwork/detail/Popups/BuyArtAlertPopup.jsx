import MainPopup from "Components/ui/popup/MainPopup";
import React from "react";

const BuyArtAlertPopup = () => {
  return (
    <MainPopup>
      <div className="p-8 flex items-center justify-center text-center">
        <p className="text-xl">{plsInstallMetaMaskI18}</p>
      </div>
      <button
        onClick={() => setBuyArtAlert(false)}
        className="w-full text-white bg-[#333] py-4">
        {closeI18}
      </button>
    </MainPopup>
  );
};

export default BuyArtAlertPopup;
