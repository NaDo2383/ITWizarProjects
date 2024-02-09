import React, { useEffect, useState } from "react";
import VMArtworkFindCard from "./VMArtworkCard";
import useEvent from "./useEvent";
import useArtworkTranslation from "locale/useArtworkTranslation";
import SeeMore from "./SeeAllButtonl";
import { MdOutlineImageNotSupported } from "react-icons/md";
import useMyPageTranslation from "locale/useMypageTranslation";
import { useRouter } from "next/router";
import useTab from "Components/ui/tab/useTab";
import { isMobile } from "react-device-detect";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useEventContext } from "./useEventContext";

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function VMFoundArtwork({ isIntroPage, setTabIndex, handleClick }) {
	const { foundArtwork, setFoundArtWork, getFoundArtworks, findArtwork, activeEventId } = useEvent();
	const { foundArtworksI18, airDropTextTakeLookAtOurProjectI18, artwork1I18 } = useArtworkTranslation();
	const { itIsEmptyI18 } = useMyPageTranslation();
	const router = useRouter();
	const projectId = router?.query?.projectId ? router.query.projectId : 1;
	const { activeTabId, setSubTabIndex } = useTab()
	const { distance } = useGlobalContext();
	const [shuffledArray, setShuffledArray] = useState([]);
	const { setLimitStrVMAllNFT, limitStrVMfoundNFT, setLimitStrVMfoundNFT } = useEventContext();

	function handleClickSeeMore() {
		setLimitStrVMfoundNFT(true);
	}

	function hadleClickFold() {
		setLimitStrVMfoundNFT(false);
		handleClick(2)
	}

	function shuffleArray(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	function scrollTopAndChangeTab() {
		setTabIndex(0)
		setSubTabIndex(0)
		window.scrollTo({
			top: 400,
			behavior: "smooth"
		});
		setLimitStrVMAllNFT(true)
	}

	useEffect(() => {
		setShuffledArray(shuffleArray([...foundArtwork]))
	}, [foundArtwork, activeTabId])


	return (
		<div className={`flex flex-col px-2 sm:px-0 sm:pt-10 pt-[36px]`}>
			<h3 className={`${distance > 600 ? "lg:mt-[130px] sm:mt-[60px]" : "lg:mt-12 mt-6"} lg:text-[22px] text-[14px] text-[#fff] font-mont sm:font-semibold font-medium whitespace-nowrap hidden sm:flex sm:flex-row overflow-hidden`}>
				{activeTabId === 0 ? foundArtworksI18 : airDropTextTakeLookAtOurProjectI18}
			</h3>
			<h3 className={`${distance > 600 ? "lg:mt-[130px] sm:mt-[60px]" : "lg:mt-12 mt-6"} lg:text-[22px] text-[14px] text-[#fff] font-mont sm:font-semibold font-medium whitespace-nowrap sm:hidden`}>
				{activeTabId === 0 ? foundArtworksI18 : artwork1I18}
			</h3>
			<div className="w-full mt-8 grid  grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-[30px] gap-[12px]">
				{foundArtwork?.length > 0 ? (
					activeTabId === 0 ?
						foundArtwork
							?.slice(0, limitStrVMfoundNFT ? foundArtwork?.length : isMobile ? 2 : 8)
							.map((artwork, idx) => <VMArtworkFindCard key={idx} {...artwork} />)
						:
						shuffledArray
							?.slice(0, limitStrVMfoundNFT ? foundArtwork?.length : isMobile ? 2 : 4)
							.map((artwork, idx) => <VMArtworkFindCard key={idx} {...artwork} />)
				) : (
					<div className="mt-8 col-span-full h-[500px] flex flex-col justify-center items-center">
						<MdOutlineImageNotSupported className="text-8xl text-white" />
						<p className="text-white font-bold">{itIsEmptyI18}</p>
					</div>
				)}
			</div>
			{(foundArtwork?.length > 0 && (activeTabId === 0 && findArtwork?.length > 0)) ? (
				foundArtwork?.length >= 8 &&
				<SeeMore onClick={limitStrVMfoundNFT ? hadleClickFold : handleClickSeeMore} limitStr={limitStrVMfoundNFT} />
			) : (
				<SeeMore onClick={() => scrollTopAndChangeTab(0)} />
			)}
		</div>
	);
}

export default VMFoundArtwork;
