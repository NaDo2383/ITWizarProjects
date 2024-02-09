import React, { useEffect, useState } from "react";
import VMArtworkFindCard from "./VMArtworkCard";
import useEvent from "./useEvent";
import useArtworkTranslation from "locale/useArtworkTranslation";
import SeeMore from "./SeeAllButtonl";
import { MdOutlineImageNotSupported } from "react-icons/md";
import useMyPageTranslation from "locale/useMypageTranslation";
import { isMobile } from "react-device-detect";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useEventContext } from "./useEventContext";

function VMFindArtwork({ handleClick }) {
	const { distance } = useGlobalContext();
	const { setLimitStrVMAllNFT, limitStrVMAllNFT } = useEventContext()
	const { findArtwork, setFindArtWork, getAllEventArtworks, load, activeEventId } = useEvent();
	const { itIsEmptyI18 } = useMyPageTranslation();
	const { findArtworksI18 } = useArtworkTranslation();
	// const [limitStr, setLimitStr] = useState(false);
	// const router = useRouter();

	function handleClickSeemore() {
		setLimitStrVMAllNFT(true);
	}

	function hadleClickFold() {
		setLimitStrVMAllNFT(false);
		handleClick(0)
	}

	// useEffect(() => {
	// 	getAllEventArtworks();
	// }, [limitStr, projectId, activeEventId]);

	return (
		<div className={`flex w-full flex-col sm:mb-[60px] px-2 sm:px-0 ${distance > 600 ? "sm:mb-[-30px] lg:pt-[50px] sm:pt-[380px] pt-[310px] sm:mt-[-50px]" : "pt-[50px]"}`}>
			<h3 className="lg:text-[22px] text-[14px] text-[#fff] sm:font-semibold font-medium font-mont">
				{findArtworksI18}
			</h3>
			<div className="w-full sm:mt-8 mt-[25px] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-[30px] gap-[12px] ">
				{findArtwork?.length > 0 ? (
					findArtwork
						?.slice(0, limitStrVMAllNFT ? findArtwork?.length : isMobile ? 2 : 8)
						.map((artwork, idx) => (
							<VMArtworkFindCard key={idx} {...artwork} />
						))
				) : (
					<div className="mt-8 col-span-full h-[500px] flex flex-col justify-center items-center">
						<MdOutlineImageNotSupported className="text-8xl text-white" />
						<p className="text-white font-bold">{itIsEmptyI18}</p>
					</div>
				)}
			</div>
			{findArtwork?.length >= 8 && (
				<SeeMore disabled={load} onClick={limitStrVMAllNFT ? hadleClickFold : handleClickSeemore} limitStr={limitStrVMAllNFT} />
			)}
		</div>
	);
}

export default VMFindArtwork;
