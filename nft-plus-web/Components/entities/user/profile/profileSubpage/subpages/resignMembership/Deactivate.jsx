/**
 * @createdBy Narada0927
 * @maintanedBy PhillAnderson
 */
import { useState } from "react";
import Image from "next/image";
import faceIcon from "public/face.svg";
import CheckNative from "Components/ui/checkbox/CheckNative";
import useMypageTranslation from "locale/useMypageTranslation";
import useAlertTranslation from "locale/useAlertTranslation";
import usePopup from "Components/ui/popup/usePopup";

function Deactivate() {
  const {
    before_canceling_membershipI18,
    deactivateWarningI18,
    deactivateDeletedI18,
    deactivateprofileTextI18,
    all_instructions_agree_themI18,
    withdrawI18,
    withdrawalI18
  } = useMypageTranslation();
  const { checkInstClickCheckboxI18 } = useAlertTranslation();
  const { handleShowModal, MODAL_TYPES } = usePopup()
  const [agree, setAgree] = useState(0);

  function handleOpen() {
    if (!agree) {
      alert(checkInstClickCheckboxI18);
      return
    }
    handleShowModal(MODAL_TYPES.DEACTIVATE)
  }

  return (
    <>
      <div className="w-full">
        <h3 className="lg:text-[22px] sm:text-[22px] text-[20px] lg:text-left sm:text-left text-center font-[700] text-[#D4D4D4] pb-[18px]">
          {withdrawalI18}
        </h3>
        <div className="w-full flex  flex-col items-center justify-center">
          <div className="bg-[#252525] w-full sm:py-[50px] py-[30px] sm:px-0 px-[36px] text-center">
            <div className="flex justify-center lg:mb-0 sm:mb-0 mb-[25px]">
              <div className="lg:w-full lg:h-full sm:w-full sm:h-full w-[55px] h-[55px]">
                <Image src={faceIcon} alt="face" />
              </div>
            </div>
            <div className="mx-auto flex gap-3 justify-center items-center">
              <h3 className="font-[600] text-[#fff] lg:text-[21px] sm:text-[18px] text-[15px] whitespace-nowrap">
                {before_canceling_membershipI18}
              </h3>
            </div>
            <div className="w-full text-center flex justify-center">
              <h4 className="text-[#E7E7E7] font-[400] py-[15px] w-max sm:text-[16px] text-[12px]">
                {deactivateWarningI18}
              </h4>
            </div>
            <div className="gap-3 flex sm:flex-row flex-col items-center justify-center sm:pb-[21px]">
              <button className="text-[#B0B0B0] sm:text-[14px] text-[12px] bg-[#1C1C1C] rounded-full sm:py-2 py-1 sm:px-[20px] px-[10px]">
                {deactivateDeletedI18}
              </button>
              <h4 className="sm:text-[16px] text-[10px] text-[#8E8E8E] font-[400]">
                {deactivateprofileTextI18}
              </h4>
            </div>
          </div>
          <div className="flex mt-[20px] sm:gap-2 gap-0 items-center">
              {/* <Checkbox
                id="check"
                checked={agree}
                onChange={(e) => { 
                  setAgree(e.target.checked) 
                }}
              /> */}
              <CheckNative  
                  checked={agree}  
                  onChange={ () => setAgree(prev => !prev) } 
              />
            <label
              htmlFor="check"
              className="text-[#DDDDDD] lg:text-[18px] sm:text-[18px] text-[12px] font-[400] cursor-pointer"
            >
              {all_instructions_agree_themI18}
            </label>
          </div>
          <div className="w-full flex gap-2 sm:py-[50px] py-[32px] items-center justify-center">
            <button
              onClick={handleOpen}
              className={`rounded-[5px] py-[10px] lg:text-[18px] sm:text-[18px] text-[15px] text-white lg:px-[25px] sm:px-[25px] px-[15px] font-[300] bg-[#333] ${agree
                ? "bg-[#FB3873] cursor-pointer"
                : "bg-[#252525] cursor-not-allowed"
                }`}
            >
              {withdrawI18}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Deactivate