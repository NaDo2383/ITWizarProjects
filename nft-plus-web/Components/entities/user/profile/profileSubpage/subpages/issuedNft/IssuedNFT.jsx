import useArtwork from "Components/entities/artwork/useArtwork";
import ItsEmpty from "Components/ui/error/ItsEmpty";
import PaginationNice from "Components/ui/pagination/PaginationNice";
import React, { useEffect, useState } from "react";
import PerArtProgress from "./PerIssuedNft";
import ResponsiveArtworkRegProgress from "./ResponsiveIssuedNft";
import useCommonTranslation from "locale/useCommonTranslation";
import Select from "Components/ui/select/Select";
import Pagination from "Components/ui/pagination/Pagination";
import { useGlobalContext } from "common/global/useGlobalContext";
import usePopup from "Components/ui/popup/usePopup";
import NoWorkYet from "Components/ui/error/NoWorkYet";
import useMyPageTranslation from "locale/useMypageTranslation";

function ArtworkRegProgress() {
	const { issuedNFTI18 } = useMyPageTranslation()
	const {
		saleStatusI18,
		entireI18,
		projectNFTI18,
		competitionNFTI18,
		marketNFTI18,
		unsoldI18,
		saleI18
	} = useCommonTranslation();
	const {
		artworksPending,
		getArtworksRegProgress,
		deletionArtwork
	} = useArtwork();
	const { authUser, globalLoading } = useGlobalContext()
	const [pageNum, setPageNum] = useState(0);
	const { setGlobalModalState } = usePopup()

	const paginate = (num) => {
		setPageNum(num);
	};

	const [stype, setStype] = useState('');
	const [type, setType] = useState('');

	const options = [
		{
			text: entireI18,
			value: ""
		},
		{
			text: marketNFTI18,
			value: "market"
		},
		{
			text: projectNFTI18,
			value: "vm"
		},
		{
			text: competitionNFTI18,
			value: "competition"
		}
	];

	const options2 = [
		{
			text: saleStatusI18,
			value: ""
		},
		{
			text: entireI18,
			value: ""
		},
		{
			text: saleI18,
			value: "SELL"
		},
		{
			text: unsoldI18,
			value: "NOT_SELL"
		}
	];

	const [chosenSelect, setChosenSelect] = useState(options[0])
	const [chosenSelect2, setChosenSelect2] = useState(options2[0])

	function handleSelect(select) {
		setChosenSelect(select)
		setStype(select.value);
	}

	function handleSelect2(select) {
		setChosenSelect2(select)
		setType(select.value);
	}
	
	useEffect(() => {
		doSearch();
	}, [stype, type]);

	function doSearch() {
		const searchParams = `&stype=${stype}&type=${type}`
		getArtworksRegProgress(0, searchParams);
	}

	useEffect(() => {
		const searchParams = `&stype=${stype}&type=${type}`
		// Доорх API ыг дуудахгүй бол pagination ажиллахгүй байгаа. 
		getArtworksRegProgress(pageNum);

		// modal дээр хэрэглэхийн тулд props drilling - ээс зайлсхийв
		setGlobalModalState(prev => ({
			...prev,
			updateArtworkRegProgressList: () => getArtworksRegProgress(pageNum, searchParams)
		}))
	}, [pageNum, deletionArtwork, authUser]);
	
	return (
		<div className="mt-[30px] sm:mt-0">
			<h6 className="text-[15px] font-[500] text-[#DDD] text-center sm:hidden">{issuedNFTI18}</h6>
			<div className="flex gap-3 lg:justify-end md:justify-end justify-center w-full sm:pt-[30px] pt-[45px]">
				<Select
					options={options}
					onSelect={handleSelect}
					defaultVal={{
						text: entireI18,
						value: ""
					}}
					width={168}
				/>
				<Select
					options={options2}
					onSelect={handleSelect2}
					defaultVal={{
						text: saleStatusI18,
						value: ""
					}}
					width={168}
				/>
			</div>
			{artworksPending?.result?.content?.length > 0 ? (
				<>
					<div className="flex justify-center">
						<div className="w-full mt-[30px] grid md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 gap-[12px]">
							{artworksPending?.result?.content?.map((artwork, idx) => (
								<PerArtProgress key={"art-progress-" + idx} {...artwork} />
							))}
						</div>
					</div>
					{/* <ResponsiveArtworkRegProgress /> */}
					<div className="w-full flex justify-center pt-16 pb-8">
						<Pagination
							changePage={paginate}
							toNextPage={paginate}
							toPrevPage={paginate}
							toFirstPage={paginate}
							toLastPage={paginate}
							totalPages={artworksPending?.result?.totalPages}
							data={artworksPending?.result?.content}
							current={artworksPending?.result?.number}
						/>
					</div>
				</>
			) : (globalLoading === false &&
				<NoWorkYet />
			)}
		</div>
	);
}

export default ArtworkRegProgress;
