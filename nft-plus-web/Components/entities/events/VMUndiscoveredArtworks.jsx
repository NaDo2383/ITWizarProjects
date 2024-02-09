import React, { useEffect, useState } from "react";
import VMArtworkFindCard from "./VMArtworkCard";
import useEvent from "./useEvent";
import useArtworkTranslation from "locale/useArtworkTranslation";
import SeeMore from "./SeeAllButtonl";
import useMyPageTranslation from "locale/useMypageTranslation";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { isMobile } from "react-device-detect";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useEventContext } from "./useEventContext";

function VMUndiscoveredArtwork({ handleClick }) {
	const { distance, setDistance } = useGlobalContext();
	const {
		undiscoveredArtwork,
	} = useEvent();
	const { undicoveredArtworksI18 } = useArtworkTranslation();
	const { itIsEmptyI18 } = useMyPageTranslation();
	const { limitStrVMundiscoveredNFT, setLimitStrVMundiscoveredNFT } = useEventContext();
	// const router = useRouter();
	// const projectId = router?.query?.projectId ? router.query.projectId : 1
	// const eventStr = `?projectId=${projectId}&type=1`;

	function handleClickSeeMore() {
		setLimitStrVMundiscoveredNFT(true);
	}

	function hadleClickFold() {
		setLimitStrVMundiscoveredNFT(false);
		handleClick(1)
	}

	// useEffect(() => {
	// 	getUndiscoveredArtworks();
	// }, [activeEventId]);

	return (
		<div className={`flex flex-col px-2 sm:px-0 sm:pt-10 pt-[36px] ${distance > 600 && "sm:mb-[-30px]"}`}>
			<h3 className={`lg:text-[22px] text-[14px] text-[#fff] font-mont sm:font-semibold font-medium whitespace-nowrap ${distance > 600 ? "lg:mt-[130px] sm:mt-[60px]" : "sm:mt-12 mt-6"} `}>
				{undicoveredArtworksI18}
			</h3>
			<div className={`w-full sm:mt-8 mt-[25px] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-[30px] gap-[12px]`}>
				{undiscoveredArtwork?.length > 0 ? (
					undiscoveredArtwork
						?.slice(0, limitStrVMundiscoveredNFT ? undiscoveredArtwork?.length : isMobile ? 2 : 8)
						.map((artwork, idx) => (
							<VMArtworkFindCard key={"eventArtworkFind" + idx} {...artwork} />
						))
				) : (
					<div className="mt-8 col-span-full h-[500px] flex flex-col justify-center items-center">
						<MdOutlineImageNotSupported className="text-8xl text-white" />
						<p className="text-white font-bold">{itIsEmptyI18}</p>
					</div>
				)}
			</div>
			{undiscoveredArtwork?.length >= 8 && <SeeMore onClick={limitStrVMundiscoveredNFT ? hadleClickFold : handleClickSeeMore} limitStr={limitStrVMundiscoveredNFT} />}
		</div>
	);
}

export default VMUndiscoveredArtwork;
