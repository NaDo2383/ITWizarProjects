import React, { useEffect, useState } from "react";
import downIcon from "public/downIcon.svg";
import Image from "next/image";
import { AiOutlineSortAscending } from "react-icons/ai";
import useMarket from "Components/entities/artwork/useMarket";
import { useRouter } from "next/router";

function SortButton({ changeQuery }) {
	const { sortTerms, handleSort, toggleSortOptions, selectOptions, setSortTerms } = useMarket();
	const { query } = useRouter();
	const [selecterSort, setSelecterSort] = useState(query.sortID ? +query.sortID : 0);

	useEffect(()=>{
		// setSelecterSort(query.sortID ? +query.sortID : 0);
		setSortTerms(selectOptions[query.sortID ? +query.sortID : 0])
	},[query])

	// useEffect(()=>{
	// 	setSelecterSort(query.sortID ? +query.sortID : 0);
	// 	setSortTerms(selectOptions[query.sortID ? +query.sortID : 0])
	// },[])

	return (
		<div className="hidden relative md:flex flex-row justify-between">
			<div className="flex"></div>
			<div className="flex">
				<button onClick={toggleSortOptions} className="sort-btn">
					<AiOutlineSortAscending className="md:hidden" />
					<div className="md:block truncate flex text-[#ABABAB] text-[18px]">
						{selectOptions[selecterSort].title}
					</div>
					<div className="flex">
						<Image src={downIcon} alt="downIcon" />
					</div>
				</button>
				<ul
					className={`${sortTerms?.isShow ? "block" : "hidden"
						} absolute min-w-[150px] mt-2 font-normal border border-[#656565] overflow-hidden text-start z-30 bg-[#181A1A] opacity-90 backdrop-blur-[2px] text-[#ABABAB] top-full rounded-[8px] right-0`}>
					{selectOptions.map((option, idx) => (
						<li
							key={"sort-option" + idx}
							onClick={() => {
								setSelecterSort(idx);
								changeQuery(0, idx, query.filter? query.filter : -1);
							}}
							className={`py-2 px-2 text-[18px] truncate cursor-pointer hover:text-[#fff] text-start  ${idx !== selectOptions?.length && "border-b border-[#656565]"}`}>
							{option.title}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default SortButton;
