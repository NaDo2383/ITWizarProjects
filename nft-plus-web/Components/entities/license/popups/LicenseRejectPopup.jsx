import React, { useEffect, useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import usePopup from 'Components/ui/popup/usePopup'
import useMyPageTranslation from 'locale/useMypageTranslation'
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer'
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent'

function LicenseRejectPopup() {
  const { hideModal, getCurrentModalprops } = usePopup()
  const { denyReasonsI18, closeI18, reasonDescI18, confirmI18 } = useMyPageTranslation();
  const [thisProps, setThisProps] = useState(null)

  useEffect(() => {
    getCurrentModalprops().then(res => setThisProps(res))
  }, [])

  return (
    <MainPopup width={464}>
      <PopupContainer>
        <div className="w-full">
          <h3 className='sm:text-[22px] text-[20px] text-[#E0E6E8] font-[500] text-center mt-[15px]'>
            {denyReasonsI18}
          </h3>
          <p className='text-center text-[#AEAEAE] sm:text-[16px] text-[12px] font-[400]'>{reasonDescI18}</p>
        </div>
        <PopupContent>
          <div className="relative mx-[50x] mt-[20px] mb-[60px]">
            <textarea disabled placeholder={thisProps?.license?.denyReason} className='w-full p-[10px] bg-[#141313] border border-[#141313] rounded-[5px] min-h-[153px] sm:text-[16px] text-[13px] text-[#B0B0B0]'></textarea>
          </div>
          <div className="flex sm:justify-end justify-center mb-[20px]">
            <button
              onClick={hideModal}
              className="font-[500] sm:h-[47px] h-[35px] bg-[#404040] text-white undefined rounded-md py-2 sm:px-4 px-[20px]"
            >
              <p className='sm:text-[16px] text-[14px] text-white font-bold'>{confirmI18}</p>
            </button>
          </div>
        </PopupContent>
      </PopupContainer>
    </MainPopup>
  )
}

export default LicenseRejectPopup;