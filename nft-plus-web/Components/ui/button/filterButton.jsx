import React from "react";
import filt from "public/filter.svg";
import Image from "next/image";
import useCommonTranslation from "locale/useCommonTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";

function FilterButton() {
	const { filterI18 } = useCommonTranslation();
	const { setIsShowFilter } = useGlobalContext();

	return (
		<button
			onClick={() => setIsShowFilter((prev) => !prev)}
			className="w-[90px] outlined-btn rounded-lg py-2 px-1">
			<div className="flex justify-center items-center gap-2">
				<Image src={filt} alt="filt" />
				<p className="font-[500] text-[16px] whitespace-nowrap md:block text-[#666]">
					{filterI18}
				</p>
			</div>
		</button>
	);
}

export default FilterButton;
