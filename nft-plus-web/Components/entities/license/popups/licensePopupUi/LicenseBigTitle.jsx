import React from 'react'

function LicenseBigTitle({ text }) {
  return (
    <div className="flex items-center gap-[7px] sm:pb-3 capitalize sm:mt-0 mt-[25px]">
      <div className="w-[5px] sm:h-[24px] h-[13px] bg-[#FB3873]" />
      <div className='text-[#fff] text-[14px] font-[500]'>{text}</div>
    </div>
  )
}

export default LicenseBigTitle