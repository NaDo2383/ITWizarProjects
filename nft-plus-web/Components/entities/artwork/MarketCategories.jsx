import React, { useState, useEffect } from "react";
import useArtwork from "./useArtwork";
import useMarket from "./useMarket";
import { useRouter } from "next/router";
import { sliceIntoChunks } from "utils/array";
import { useGlobalContext } from "common/global/useGlobalContext";

function MarketCategories({changeQuery}) {
	// const [payload, setPayload] = useState({ random: true, size: 16, workIds: res[0] });
	const { locale, query } = useRouter();
	const [selectedCatId, setSelectedCatId] = useState(query?.filter ? +query.filter : -1);
	const { getArtworkCategories, artworkCategories, artPagination } =
		useArtwork();
	const {
		marketArtQueryStr,
		setSelectedCategory,
		filterTerm,
		handleFilterUrl,
		selectedCategory,
		getRandomMarketArtIds,
		postMarketArtworks,
		sortTerms,
		setArtworkRandomIds,
		artworkRandomIds
	} = useMarket();
	const { prevUrl } = useGlobalContext();

	// useEffect(() => {
	// 	// if(sortTerms.value === 'random' && selectedCategory === 'All') {
	// 	// 	setPayload({  sort: sortTerms.value })
	// 	// } else {
	// 	// 	setPayload({ random: true, size: 16, workIds: res[0] })
	// 	// }
	// 	getRandomMarketArtIds("").then((res) => {
	// 		if(sortTerms.value === 'random' && selectedCategory === 'All') {
	// 			postMarketArtworks({ random: true, size: 16, workIds: res[0], sort: sortTerms.value });
	// 		}
	// 		// postMarketArtworks(payload);
	// 	});
	// },[selectedCatId, sortTerms])

	function checkMarketArtquery(marketArtquery, category) {
		if(category){
			if (marketArtquery) {
				return marketArtquery + "&categoryId=" + category;
			}
			return "?categoryId=" + category;
		}
		return marketArtquery;
	}

	function handleClickMenu(idx, category = "") {
		setSelectedCatId(idx);
		setSelectedCategory(category);
		changeQuery(prevUrl?.includes('/art/preview/') ? (query?.page ? +query?.page : 0): 0 , query?.sortID ? +query?.sortID : 0 , idx )
	}
	useEffect(()=>{
		setSelectedCatId(query?.filter ? +query.filter : -1);
	},[query?.filter, query?.sortID])

	useEffect(() => {
		getArtworkCategories();
		setSelectedCatId(query?.filter ? +query.filter : -1);
	}, []);

	useEffect(() => {
		handleFilterUrl(selectedCategory);
	}, [selectedCategory, filterTerm]);

	return (
		<div className="hidden md:block w-full relative z-30  ">
			<div className="flex whitespace-nowrap items-start md:justify-center overflow-hidden">
				<ul className="flex gap-[30px] md:gap-8 w-full ml-4 overflow-hidden font-[500] md:justify-center items-center lg:text-lg text-[18px]">
					<li
						className={`text-[15px] lg:text-lg cursor-pointer ${
							selectedCatId === -1 ? "font-bold text-[#ABABAB]" : "text-[#5C5C5C] hover:text-[#ABABAB]"
						}`}
						onClick={(e) => handleClickMenu(-1)}>
						ALL
					</li>
					{artworkCategories?.length > 0 &&
						artworkCategories.map(({ name, nameEn, id }, idx) => (
							<li
								key={name + "-" + idx}
								className={`${
									idx === selectedCatId ? "font-bold text-[#ABABAB]" : "text-[#5C5C5C] hover:text-[#ABABAB]"
								} cursor-pointer`}
								onClick={(e) => handleClickMenu(idx, id)}>
								{locale === "en"  ? nameEn.toUpperCase() : name }
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default MarketCategories;
