import MainPopup from "Components/ui/popup/MainPopup";
import React from "react";

const VerifyConfirm = () => {
  return (
    <MainPopup>
      <div className="relative flex flex-col bg-white w-[600px] h-[640px] rounded-[10px]">
        <button
          onClick={close}
          className="w-[20px] h-[20px] absolute top-6 right-7 ">
          <div className="relative w-7 h-px bg-opacity-0 bg-black before:absolute before:w-full before:h-full before:bg-black before:left-0 before:transform before:rotate-45 after:absolute after:w-full after:h-full after:bg-black after:left-0 after:transform after:-rotate-45"></div>
        </button>
        <div
          className="flex items-center justify-between py-4 border-b-2 border-[#333] rounded-t-md mx-6"
          style={{ borderBottom: "2px solid black" }}>
          <h5 className="text-[22px] leading-normal font-bold">
            {verificationConfirmationI18}
          </h5>
        </div>
        <div className="relative py-6 text-center tracking-tighter text-[15px] w-full overflow-y-auto overflow-hidden h-full">
          {trustCertData && (
            <iframe
              id="iframeTrustCert"
              srcDoc={trustCertData}
              width={545}
              height="100%"
              className="m-auto"
            />
          )}
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={() => setVerificationConfirmation(false)}
            className="w-full text-white bg-[#333] py-4 text-[20px]">
            {confirmI18}
          </button>
        </div>
      </div>
    </MainPopup>
  );
};

export default VerifyConfirm;
