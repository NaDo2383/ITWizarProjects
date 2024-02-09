/**
 * @createdBy duka
 */
import React, { useState } from 'react'
import downIcon from 'public/downIcon.svg';
import Image from 'next/image';
import useCommonTranslation from 'locale/useCommonTranslation';

function ProfileSortBoxes() {
    const [sorting, setSorting] = useState(false);
    const [entireSorting, setEntireSorting] = useState(false);
    const {
        entireI18,
        saleStatusI18,
        marketNFTI18,
        projectNFTI18,
        competitionNFTI18,
        saleI18,
        unsoldI18
    } = useCommonTranslation();

    return (
        <div className='w-full'>
            <div className='flex flex-row justify-end lg:gap-2 gap-0'>
                <div className='relative px-2 lg:px-0'>
                    <button
                        onClick={() => setEntireSorting(!entireSorting)}
                        className="text-[#ABABAB] border border-[#656565] w-[168px] shrink pt-[5px] pb-[7px] pl-[16px] pr-[11px] rounded-md flex justify-between items-center">
                        <p className="font-[400] text-[18px] md:block  px-2 text-[#ABABAB]">
                            {entireI18}
                        </p>
                        <div className="flex">
                            <Image src={downIcon} alt="downIcon"  />
                        </div>
                    </button>
                    {entireSorting && (
                        <ul className="absolute z-30 min-w-max bg-[#181A1A] top-full rounded-b-xl w-[168px] text-[#ABABAB]">
                            <li
                                onClick={() => {
                                    setFilterState({
                                        ...filterState,
                                        sort: "id,desc",
                                        page: 0
                                    });
                                    setEntireSorting(!entireSorting);
                                }}
                                className="py-2 px-4 truncate cursor-pointer hover:text-[#fff] border-[#656565] border-y">
                                {marketNFTI18}
                            </li>
                            <li
                                onClick={() => {
                                    setFilterState({
                                        ...filterState,
                                        sort: "price,desc",
                                        page: 0
                                    });
                                    setEntireSorting(!entireSorting);
                                }}
                                className="py-2 px-4 cursor-pointer hover:text-[#fff] border-[#656565] text-left border-b">
                                {projectNFTI18}
                            </li>
                            <li
                                onClick={() => {
                                    setFilterState({
                                        ...filterState,
                                        sort: "like_count,desc",
                                        page: 0
                                    });
                                    setEntireSorting(!entireSorting);
                                }}
                                className="py-2 px-4 cursor-pointer hover:text-[#fff] text-left">
                                {competitionNFTI18}
                            </li>
                        </ul>
                    )}
                </div>
                <div className="relative">
                    <button
                        onClick={() => setSorting(!sorting)}
                        className="text-[#ABABAB] border border-[#656565] w-[168px] shrink pt-[5px] pb-[7px] px-[16px] rounded-md flex justify-between items-center">
                        <div className="font-[400] text-[18px] md:block  px-2 text-[#ABABAB]">
                            <p>{saleStatusI18}</p>
                        </div>
                        <div className="flex">
                            <Image  src={downIcon} alt="downIcon" />
                        </div>
                    </button>
                    {sorting && (
                        <ul className="absolute z-30 min-w-max bg-[#181A1A] top-full rounded-b-xl w-[168px] text-[#ABABAB]">
                            <li
                                onClick={() => {
                                    setFilterState({
                                        ...filterState,
                                        sort: "id,desc",
                                        page: 0
                                    });
                                    setSorting(!sorting);
                                }}
                                className="py-2 px-4 cursor-pointer hover:text-[#fff] text-left border-[#656565] border-y">
                                {entireI18}
                            </li>
                            <li
                                onClick={() => {
                                    setFilterState({
                                        ...filterState,
                                        sort: "price,desc",
                                        page: 0
                                    });
                                    setSorting(!sorting);
                                }}
                                className="py-2 px-4 cursor-pointer hover:text-[#fff] text-left border-b border-[#656565]">
                                {saleI18}
                            </li>
                            <li
                                onClick={() => {
                                    setFilterState({
                                        ...filterState,
                                        sort: "like_count,desc",
                                        page: 0
                                    });
                                    setSorting(!sorting);
                                }}
                                className="py-2 px-4 cursor-pointer hover:text-[#fff] hover:rounded-b-xl text-left">
                                {unsoldI18}
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileSortBoxes