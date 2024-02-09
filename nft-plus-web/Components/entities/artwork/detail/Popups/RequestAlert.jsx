import MainPopup from "Components/ui/popup/MainPopup";
import React, {useState} from "react";

const RequestAlert = () => {
  const [requestAlertLay, setRequestAlertLay] = useState();
  
  return (
    <MainPopup>
      <div className="tracking-tighter w-full relative">
        <div
          onClick={() => setRequestAlertLay(false)}
          className="w-7 cursor-pointer h-7 absolute right-3 top-6">
          <div className="relative h-px w-full bg-black transform rotate-45 before:absolute before:transform before:w-full before:h-full before:bg-black before:rotate-90 before:left-0"></div>
        </div>

        <div className="full py-12 px-12 flex justify-center items-center">
          <h5 className="tracking-[-1px] text-[16px] text-center px-[50x] mt-[30px]">
            {applyLicenseWarningI18}
          </h5>
        </div>
      </div>

      <div className="w-full flex items-center justify-end">
        <button
          onClick={() => setRequestAlertLay(false)}
          className="w-full bg-[#333] text-white py-4 cursor-pointer text-center">
          <h5 className="sm:text-[16px] text-[14px]">{closeI18}</h5>
        </button>
      </div>
    </MainPopup>
  );
};

export default RequestAlert;
