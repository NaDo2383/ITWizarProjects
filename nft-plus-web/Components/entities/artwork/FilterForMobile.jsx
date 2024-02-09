import { useGlobalContext } from 'common/global/useGlobalContext';
import useCommonTranslation from 'locale/useCommonTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { BsCheck } from 'react-icons/bs';
import { CgClose } from "react-icons/cg";
import { MdPriceCheck } from 'react-icons/md';
import useMarket from './useMarket';

const FilterForMobile = ({changeQuery}) => {
    const { query  } = useRouter();
	const [selecterSort, setSelecterSort] = useState(query.sortID? +query.sortID :0);
	const { filterI18 } = useCommonTranslation();
    const { isOpenMobileFilter, setOpenMobileFilter } = useGlobalContext();
    const { sortTerms, handleSort, selectOptions} = useMarket()

    function clickHandler (option) {
        // handleSort(option);
        setOpenMobileFilter(!isOpenMobileFilter);
    }

    return (<div
        className={` ${
            isOpenMobileFilter ? "translate-y-0" : "translate-y-full"
        } bg-[#161717] p-[40px_28px_20px_22px] w-screen fixed bottom-0  navScrolling transition duration-1000 ease-in-out z-[99999999] rounded-t-[30px]`}>
            <div className="flex justify-between text-[#fff]">
                <div className="text-[20px] font-[mont] font-medium leading-[134.9%]">{filterI18}</div>
                <button onClick={() => setOpenMobileFilter(false)}>
                    <CgClose className="w-[24px] h-[24px] text-[#fff]"/>
                </button>
            </div>
            <div className="w-full flex mt-[55px] bg-[#161717] border-b border-[#646464] pb-[45px]">
                <ul className="w-full relative flex flex-col gap-[36px] font-semibold leading-[134.9%] text-[20px] font-mont from-[#EDEDED] to-[#B6B6B6]">
                    {
                        selectOptions?.map((option, index)=>{
                            return(
                                <li 
                                    key={"options"+index}
                                    onClick={() => {
                                        clickHandler(option);
                                        setSelecterSort(index);
                                        changeQuery(0, index, query.filter? query.filter : -1);
                                    }}
                                    className="w-full flex justify-between truncate cursor-pointer hover:text-[#fff] text-center border-[#656565]"
                                >
                                    <div className='text-[15px] font-mont font-normal text-[#ededed] '>
                                        {option?.title}
                                    </div>
                                    <BsCheck className={`${selecterSort === index?"text-[#FB3873]":"hidden"}  w-[16px] h-[16px]`}/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
);
}

export default FilterForMobile
