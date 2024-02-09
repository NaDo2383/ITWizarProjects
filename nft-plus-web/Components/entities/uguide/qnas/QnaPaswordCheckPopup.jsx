import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useCommonTranslation from "locale/useCommonTranslation";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useOnClickOutside from "common/mouse/useOnClickOutside";
import { useRef } from 'react'
import { useGlobalContext } from "common/global/useGlobalContext";
import CloseBtn from "Components/ui/button/CloseBtn";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";

const QnaCheckPasswordPopup = () => {
  const {
    closeI18,
    inputPasswordPlaceholderI18
  } = useCommonTranslation();
  const { getCurrentModalprops, popupProps, hideModal, globalModalState } = usePopup()
  const { setGlobalItems } = useGlobalContext()
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const ref = useRef(null)
  useOnClickOutside(ref, () => hideModal())
  useEffect(() => {
    getCurrentModalprops();
  }, []);
  const {
    passwordErrorI18,
    confirmI18,
  } = useFAQpageTranslation();

  ///userguide/qna/ post { password: enteredPassword }

  function sendQna() {
    globalModalState?.getPrivQNAList(
      {
        body: { password: enteredPassword },
        id: globalModalState?.currentQna?.id
      }).then((res) => {
        if (!res.success) {
          setError(true)
          return
        }
        setGlobalItems(prev => (
          {
            ...prev,
            currentPrivateQnaDetailPass: enteredPassword
          }
        ))

        router.push(`/qna/${globalModalState?.currentQna?.id}?private=true`)
        hideModal()

      })
  }


  return (
    <MainPopup>
      <div ref={ref} className=" bg-[#181A1A] tracking-tighter sm:min-w-[540px] w-[1/2] shadow-md">
        <PopupContainer>
          <div className="flex-col hidden sm:flex sm:flex-col overflow-hidden">
            <div className="flex justify-between">
              <h3 className=" font-medium text-[22px] text-white">{inputPasswordPlaceholderI18}</h3>
              <CloseBtn onClick={() => hideModal()} />
            </div>
            <div>
              <div className="flex items-center gap-[10px] mt-[30px] mb-[5px]">
                <div className="flex-1">
                  <input
                    type="password"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    className="w-full h-[40px] border-[#5C5C5C] font-[300] focus:outline-none bg-[#0F1111] focus:border-[#ff00e4] rounded-md placeholder:text-[#5A5A5A] px-2 placeholder:font-[400]"
                    placeholder={inputPasswordPlaceholderI18}
                  />
                </div>
                <div className="flex items-center justify-center ">
                  <button
                    disabled={popupProps?.load}
                    onClick={sendQna}
                    className={`bg-[#333] ${popupProps?.load && "bg-opacity-60 cursor-wait"
                      } text-white px-[20px] rounded-md font-[300] h-[40px] bg-[#FB3873]`}>
                    확인
                  </button>
                </div>
              </div>
              {error && (
                <div className="ml-[12px]">
                  <p className="font-[400] text-[14px] text-[#CF6081]">{passwordErrorI18}</p>
                </div>
              )}
            </div>
          </div>
          <div className="sm:hidden">
            <h3 className=" font-medium text-[18px] text-center text-white">{inputPasswordPlaceholderI18}</h3>
            <div className="">
              <div className="flex flex-col items-center gap-[15px] mt-[20px] mb-[5px]">
                <div className="flex-1">
                  <input
                    type="password"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    className="w-full h-[40px] border-[#5C5C5C] font-[300] focus:outline-none bg-[#0F1111] focus:border-[#ff00e4] rounded-md placeholder:text-[#5A5A5A] px-[11px] py-[9px] placeholder:font-[400] placeholder:text-[14px]"
                    placeholder={inputPasswordPlaceholderI18}
                  />
                  {error && (
                    <div className="mt-[5px]">
                      <p className="font-[400] text-[12px] text-[#CF6081]">{passwordErrorI18}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  <button
                    disabled={popupProps?.load}
                    onClick={sendQna}
                    className={`w-full bg-[#333] ${popupProps?.load && "bg-opacity-60 cursor-wait"
                      } text-white px-[20px] text-[15px] rounded-[5px] font-[300] h-[40px] bg-[#404040]`}>
                    {confirmI18}
                  </button>
                  <button
                    disabled={popupProps?.load}
                    onClick={() => hideModal()}
                    className={`w-full bg-[#222] text-[15px] text-white px-[20px] rounded-[5px] font-[300] h-[40px]`}>
                    {closeI18}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </PopupContainer>
      </div>
    </MainPopup>
  );
};

export default QnaCheckPasswordPopup;
