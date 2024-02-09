import React, { useEffect, useState } from "react";
import FilterArtworkCategories from "Components/entities/artwork/FilterArtworkCategories";
import MarketCard from "Components/entities/artwork/MarketCard";
import useMarket from "./useMarket";
import NoContent from "Components/ui/error/noContent";
import { useRouter } from "next/router";
import useCommonTranslation from "locale/useCommonTranslation";
import SortButton from "Components/entities/artwork/SortBtn";
import Pagination from "Components/ui/pagination/Pagination";
import FilterForMobile from "./FilterForMobile";
import FilterBtnForMobile from "./detail/FilterBtnForMobile";
import MarketCategoriesForMobile from "./MarketCategoriesForMobile";
import { sliceIntoChunks } from "utils/array";
import { useGlobalContext } from "common/global/useGlobalContext";

function MarketList() {
	const { query } = useRouter();
	const { marketNFTI18 } = useCommonTranslation();
	const {
		marketArts,
		artworkRandomIds,
		getRandomMarketArtIds,
		postMarketArtworks,
		handleSearch,
		sortTerms,
		selectedCategory,
		setArtworkRandomIds,
		marketArtQueryStr,
		selectOptions
	} = useMarket();
	const { authUser, globalLoading } = useGlobalContext();
	const [pageNum, setPageNum] = useState(query.page ? +query.page : 0);
	const paginate = (num) => {
		setPageNum(num);
	};
	const [isDisplayBig, setIsDisplayBig] = useState(false);
	const router = useRouter();
	const size = 16;

	const [searchParams, setSearchParams] = useState(null);

	const changeQuery = (pageNumber, sortID, filter) => {
		router.push({
			query: { page: +pageNumber, sortID: sortID || sortID == 0 ? sortID : query.sortID, filter: filter ? +filter : 0 }
		}, undefined, { shallow: true }
		)
	};
	function checkMarketArtquery(marketArtquery, category) {
		if (category) {
			if (marketArtquery) {
				return marketArtquery + "&categoryId=" + category;
			}
			return "?categoryId=" + category;
		}
		return marketArtquery;
	}

	useEffect(() => {
		const handleResize = () => {
			setIsDisplayBig(window.innerWidth > 768);
		};

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Initial check on component mount
		handleResize();

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const categories = localStorage.getItem('categories')
		const savedCategories = categories && categories !== 'undefined' && JSON.parse(categories);
		const sortTerm = query?.sortID ? selectOptions[query.sortID] : sortTerms;

		const fetchRandomArtworks = async () => {
			const artworkRandomIdsData = localStorage.getItem("randomArtWorkIds");
			let artworkIds = [];
			artworkRandomIdsData && await sliceIntoChunks(artworkRandomIdsData?.split(","), size).then(data => {
				artworkIds = data;
				setArtworkRandomIds(data)
			})
			const pageNumber = query.page ? +query.page : pageNum;
			const isFilter = searchParams != null ? query.sortID !== searchParams.sortID || query.filter !== searchParams.filter : false;

			if (!query.sortID && !query.filter) {
				getRandomMarketArtIds('').then((res) => {
					postMarketArtworks({
						random: true,
						size,
						workIds: res.length > 0 ? res[0] : []
					});
				});

			} else if (!isFilter && artworkIds[pageNumber]) {
				artworkRandomIdsData && postMarketArtworks({
					random: true,
					size,
					workIds: artworkIds[pageNumber]
				});
			} else {
				const fetchUrl = checkMarketArtquery(marketArtQueryStr, query.filter > - 1 && savedCategories ? savedCategories[+query.filter].id : "");
				getRandomMarketArtIds(fetchUrl).then((res) => {
					postMarketArtworks({
						random: true,
						size,
						workIds: res.length > 0 ? res[0] : []
					});
				});
			}
		}

		if (sortTerm.value !== "random") {
			const categoryId =
				selectedCategory === "All"
					? {}
					: selectedCategory
						? { categoryId: selectedCategory }
						: {};
			const sortRequestObj = {
				...categoryId,
				sort: sortTerm.value,
				categoryId: query.filter > -1 ? savedCategories[+query.filter].id : "",
				page: query.page ? +query.page : pageNum,
				size
			};
			postMarketArtworks(sortRequestObj);
			return;
		} else {
			fetchRandomArtworks();
		}
		setSearchParams(query);
		setPageNum(query.page ? +query.page : 0)
	}, [query, authUser?.id]);

	useEffect(() => {
		if (!query.sortID && !query.filter && !query.page) {
			changeQuery(0, 0, -1)
		}
	}, [])

	return (
		<div className="flex-1 w-full bg-[#181A1A]">
			{/*<SideFilter />*/}
			<div
				className={`w-full min-h-screen flex flex-col mx-auto container`}>
				<div className="w-full md:items-center flex flex-col items-center px-[16px] sm:px-0">
					<h2 className="lg:text-[#E0E6E8] sm:text-[30px] text-[20px] font-medium flex items-center justify-center mt-[25px] mb-[12px] sm:mt-[80px] sm:mb-[10px]">
						{marketNFTI18}
					</h2>
					<FilterArtworkCategories changeQuery={changeQuery} />
					<MarketCategoriesForMobile changeQuery={changeQuery} />
				</div>
				<div className="sm:mt-[32px] mt-[45px] sm:px-0 px-[16px]">
					<SortButton changeQuery={changeQuery} />
					<FilterBtnForMobile />
				</div>
				<FilterForMobile changeQuery={changeQuery} />
				{marketArts?.content?.length > 0 ? 
					<>
						<div className={`w-full mt-[25px] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 gap-[12px] mx-auto sm:px-0 px-[16px]`}>
							{marketArts?.content.map((artwork, idx) => (
								<MarketCard key={"market-art" + idx} {...artwork} />
							))}
						</div>
						<div className="w-full flex justify-center pt-16 pb-8">
							{/* <PaginationNice
								data={{
									data: { totalPages: artworkRandomIds?.length },
									page: artPagination?.page
								}}
								onChange={handlePagination}
							/> */}
							<div className="flex justify-center pt-[50px] pb-[200px]">
								<Pagination
									toLastPage={paginate}
									toFirstPage={paginate}
									toPrevPage={paginate}
									toNextPage={paginate}
									totalPages={
										sortTerms.value === "random"
											? artworkRandomIds.length
											: marketArts.totalPages
									}
									data={marketArts?.content}
									current={
										sortTerms.value === "random" ? pageNum : marketArts.number
									}
									changePage={paginate}
									changeQuery={changeQuery}
								/>
							</div>
						</div>
					</>
				 : globalLoading === false &&
					<>
						<div className="flex justify-center items-center h-96">
							<NoContent />
						</div>
					</>
				}
			</div>
		</div>
	);
}

export default MarketList;
