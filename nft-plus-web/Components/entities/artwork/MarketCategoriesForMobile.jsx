import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import useArtwork from './useArtwork';
import useMarket from './useMarket';
import { useRouter } from "next/router";
import { useGlobalContext } from 'common/global/useGlobalContext';

const MarketCategoriesForMobile = ({changeQuery}) => {
    const [selectedCatId, setSelectedCatId] = useState(-1);
	const { getArtworkCategories, artworkCategories, artPagination } = useArtwork();
	const {
		marketArtQueryStr,
		setSelectedCategory,
		filterTerm,
		handleFilterUrl,
		selectedCategory,
		getRandomMarketArtIds,
		postMarketArtworks,
		sortTerms
	} = useMarket();
	const { locale, query } = useRouter();
	const { prevUrl } = useGlobalContext();

	function checkMarketArtquery(marketArtquery, category) {
		if (marketArtquery) {
			return marketArtquery + "&categoryId=" + category;
		}
		return "?categoryId=" + category;
	}

	function handleClickMenu(idx, category = "") {
		const fetchUrl = checkMarketArtquery(marketArtQueryStr, category);
		setSelectedCatId(idx);
		setSelectedCategory(category);

		changeQuery(prevUrl?.includes('/art/preview/') ? (query?.page ? +query?.page : 0): 0 , query?.sortID ? +query?.sortID : 0 , idx )

		// if (sortTerms.value === 'random') {
		// 	getRandomMarketArtIds(fetchUrl).then((res) => {
		// 		postMarketArtworks({ random: true, workIds: res[0], size: 16 });
		// 	});
		// 	return;
		// } else {
		// 	postMarketArtworks({
		// 		page: artPagination.page - 1,
		// 		categoryId: category,
		// 		sort: sortTerms.value,
		// 		size: 16
		// 	});
		// 	return;
		// }
	}

	useEffect(()=>{
		setSelectedCatId(query?.filter ? +query.filter : -1);
	},[query?.filter, query?.sortID])

	useEffect(() => {
		handleFilterUrl(selectedCategory);
	}, [selectedCategory, filterTerm]);

	return (
		<div className="md:hidden  w-full relative z-30 px-1 overflow-auto scrollbar-hide ">
				<div className="w-screen py-[10px]">
					<div
						className="flex w-full justify-between gap-[30px]"
					>
						<div
								className={`text-[15px] lg:text-lg font-bold cursor-pointer ${
									selectedCatId === -1 ? " text-white" : "text-[#5C5C5C]"
							}`}
							onClick={(e) => handleClickMenu(-1)}>
								ALL
						</div>
						{artworkCategories?.length > 0 &&
							artworkCategories?.map(({ name, nameEn, id }, idx) => (
									<div key={idx} className={`${selectedCatId === idx ? "text-white" : "text-[#5C5C5C]"} text-[15px] font-medium whitespace-nowrap cursor-pointer`} onClick={() => handleClickMenu(idx, id)}>
										{locale === "en"  ? nameEn.toUpperCase() : name }
									</div>
							))}
					</div>
				</div>
		</div>
	);
}

export default MarketCategoriesForMobile
