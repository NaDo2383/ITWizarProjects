import React from 'react'

function SettingRow({ label, children }) {
  return (
    <div className='flex flex-col xs:flex-col xs:gap-[8px] md:flex-row w-full pb-[25px]'>
        <label className='w-[24%] flex xs:text-[15px] text-[18px]'>{ label }</label>
        <div className='flex items-center w-full xs:px-0 px-[80px] sm:border-b-2 sm:border-[#232323]'>{ children }</div>
    </div>
  )
}

export default SettingRow