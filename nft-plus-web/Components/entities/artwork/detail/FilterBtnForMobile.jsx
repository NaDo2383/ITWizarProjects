import React from 'react'
import { useGlobalContext } from "common/global/useGlobalContext";
import { VscSettings } from 'react-icons/vsc';
import useCommonTranslation from 'locale/useCommonTranslation';

const FilterBtnForMobile = () => {
    const { isOpenMobileFilter, setOpenMobileFilter} = useGlobalContext();
    const {filterI18} = useCommonTranslation();
    function handleClick () {
        setOpenMobileFilter(!isOpenMobileFilter)
    }

  return (
    <div
      className=" flex justify-end md:hidden ">
      <div  onClick={handleClick} className="flex cursor-pointer gap-[4px] px-[15px] py-[5px] items-center justify-center md:hidden relative bg-[#161717] text-[15px] border-[1px] border-solid border-[#5C5C5C] rounded-[50px] text-[#ABABAB]">
            <VscSettings className='rotate-[90deg]'/>
            <div>{filterI18}</div>
      </div>
    </div>
  )
}

export default FilterBtnForMobile
