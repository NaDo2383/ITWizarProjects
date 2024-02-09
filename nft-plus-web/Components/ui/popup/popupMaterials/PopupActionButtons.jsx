import React from 'react'

function PopupActionButtons({ yes, no, btnTexts, disableYesBtn, yesBtnType }) {
  const btnText = {
    noBtnTxt: btnTexts?.no || 'No',
    yesBtnTxt: btnTexts?.yes || 'Yes'
  }
  return (
    <div className="w-full flex flex-row sm:justify-end md:justify-end justify-center font-[300] gap-[10px] right-[30px]">
      <button 
        className="min-w-[74px] bg-[#333] text-white py-[6px] text-center rounded-[5px] cursor-pointer" 
        onClick={no}
        type='button'
      >
          <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{btnText.noBtnTxt}</h4>
      </button>
      <button 
        className={`min-w-[74px] bg-[#FB3873]  text-white py-[6px] focus:outline-none text-center rounded-[5px] ${ disableYesBtn ? 'cursor-not-allowed' : 'cursor-pointer' }`} 
        onClick={yes}
        type={yesBtnType ? yesBtnType : 'button'}
        disabled= { disableYesBtn || false }
      >
          <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{btnText.yesBtnTxt}</h4>
      </button>
    </div>
  )
}

export function PopupActionSingleBtn({ callback, btnText, width }) {

  return (
    <button onClick={callback} style={{ width: `${width}px` }} className="min-w-[74px] bg-[#FB3873]  text-white py-[6px] focus:outline-none text-center rounded-[5px]">{btnText}</button>
  )
}

export default PopupActionButtons