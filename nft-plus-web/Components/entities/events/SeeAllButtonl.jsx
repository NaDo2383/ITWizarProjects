import useArtworkTranslation from "locale/useArtworkTranslation";
import React from "react";

const SeeMore = (props) => {
	const { onClick, limitStr } = props;
	const { SeeMoreI18, FoldI18 } = useArtworkTranslation();

	return (
		<button
			onClick={onClick}
			className={`w-full sm:text-[18px] text-[12px] flex justify-center items-center ${props.load ? " cursor-wait " : "cursor-pointer"
				} sm:p-4 pt-[7.88px] pb-[10.13px] border sm:border-[#606060] border-[#474747] sm:text-[#FFFFFF] text-[#ABABAB] lg:mt-[50px] mt-[15px]`}
			{...props}>
			{limitStr ? FoldI18 : SeeMoreI18}
		</button>
	);
};

export default SeeMore;
