/**
 * @createdBy Phill Anderson 2023/3/27
 */

import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import { useArtworkContext } from "./useArtworkContext";
import { apis } from "utils/libs";
import { sliceIntoChunks } from "utils/array";
import { useRouter } from "next/router";
import { useGlobalContext } from "common/global/useGlobalContext";

function useMarket() {
	const { setGlobalLoading } = useGlobalContext();
	const { postModel, getModel } = useCrud();
	const { calcMessage } = useMessageFactory();
	const {
		setArtworkLoading,
		marketArts,
		setMarketArts,
		artworkRandomIds,
		setArtworkRandomIds,
		marketArtQueryStr,
		setMarketArtQueryStr,
		selectedCategory,
		setSelectedCategory,
		filterTerm,
		setFilterTerm,
		sortTerms,
		setSortTerms,
		artPagination,
		selectOptions,
		selectOptionsTab
	} = useArtworkContext();
	const { query  } = useRouter();
	
	const categories = localStorage.getItem('categories')
	const savedCategories = categories && categories !== 'undefined' && JSON.parse(categories);

	async function postMarketArtworks(data) {
		setGlobalLoading(true)
		try {
			const res = await postModel(apis.allArtworks, data, true);
			setMarketArts(res?.data?.result);
			return res?.result;
		} catch (e) {
			if (e?.response?.status) {
				const msg = calcMessage(e?.response?.status);
				return msg;
			}
			console.error(e);
		} finally {
			setGlobalLoading(false)
		}
	}

	async function getRandomMarketArtIds(fetchQuery) {
		setGlobalLoading(true)
		const url = apis.artworkRandomIds + fetchQuery;
		try {
			const res = await getModel(url, true);
			// const separatedArr = res?.result?.length > 0 ?  await sliceIntoChunks(res?.result, 20) : []
			const separatedArr =
				res?.result?.length > 0 ? await sliceIntoChunks(res?.result, 16) : [];
			setArtworkRandomIds(separatedArr);
			localStorage.setItem("randomArtWorkIds", separatedArr)
			return separatedArr;
		} catch (e) {
			if (e?.response?.status) {
				const msg = calcMessage(e?.response?.status);
				return msg;
			}
			console.error(e);
		} finally {
			setGlobalLoading(false)
		}
	}

	async function handleSort(payload) {
		const { value, title } = payload;
		setSortTerms(payload);
		if (value === "random") {
			getRandomMarketArtIds("").then((res) =>
				postMarketArtworks({ random: true, workIds: res[0], size: 16, categoryId: query?.filter > -1 && savedCategories ? savedCategories[+query.filter].id : "", })
			);
			return;
		}
		postMarketArtworks({
			page: artPagination.page - 1,
			...(selectedCategory
				? { categoryId: selectedCategory !== "All" ? selectedCategory : "" }
				: { some: "" }),
			sort: value,
			size: 16,
		});
	}

	async function toggleSortOptions() {
		setSortTerms((prev) => ({ ...prev, isShow: !prev.isShow }));
	}

	function handleSearch(searchQuery) {
		// const searchUrl = checkSearchTerm(searchQuery)
		// setMarketArtQueryStr(searchUrl)
		getModel(apis.searchArtwork + searchQuery).then((res) => {
			const workIds = res.result;
			const workIdsStr = res.result.toString();
			postMarketArtworks({ random: true, workIds, workIdsStr }).then((res) => {});
		});
	}

	function checkSearchTerm(searchQuery) {
		if (selectedCategory === "All") {
			return `?searchword=${searchQuery}`;
		}
		return `?category=${selectedCategory}&searchword=${searchQuery}`;
	}

	function handleFilterUrl(selectedCategory) {
		checkFilterUrl(filterTerm, selectedCategory).then((filterUrl) => {
			setMarketArtQueryStr(filterUrl);
		});
	}

	async function checkFilterUrl(selectedCategory) {
		const category =
			selectedCategory === "" || selectedCategory === "All"
				? ""
				: `categoryId=${selectedCategory}`;
		const categoryUrl = category === "" ? "" : `&${category}`;
		try {
			const { checkOwnsArt, checkAllRights, currency } = filterTerm;
			if (!checkOwnsArt && !checkAllRights && !currency) {
				return "";
			} else if (checkOwnsArt && !checkAllRights && !currency) {
				return "?ownsArt=true";
			} else if (checkOwnsArt && checkAllRights && !currency) {
				return "?ownsArt=true&rights=1,2,3,4,5,6,7";
			} else if (checkOwnsArt && checkAllRights && currency) {
				return `?ownsArt=true&rights=1,2,3,4,5,6,7&currency=${currency}`;
			} else if (!checkOwnsArt && checkAllRights && currency) {
				return `?rights=1,2,3,4,5,6,7&currency=${currency}`;
			} else if (!checkOwnsArt && !checkAllRights && currency) {
				return `?currency=${currency}`;
			} else if (!checkOwnsArt && checkAllRights && !currency) {
				return `?rights=1,2,3,4,5,6,7`;
			} else if (checkOwnsArt && !checkAllRights && currency) {
				return `?ownsArt=true&currency=${currency}`;
			} else {
				alert(
					"filter Url taarsangui! checkFilterUrl function -iig shalgana uu!"
				);
			}
			const finalUrl = checkedUrl + categoryUrl;
			if (checkedUrl === "") {
				return `?${category}`;
			}
			return finalUrl;
		} catch (e) {
			console.error(e);
		}
	}

	return {
		setSortTerms,
		postMarketArtworks,
		marketArts,
		artworkRandomIds,
		setArtworkRandomIds,
		getRandomMarketArtIds,
		marketArtQueryStr,
		setMarketArtQueryStr,
		handleFilterUrl,
		selectedCategory,
		setSelectedCategory,
		filterTerm,
		setFilterTerm,
		handleSort,
		sortTerms,
		handleSearch,
		toggleSortOptions,
		selectOptions,
		selectOptionsTab
	};
}

export default useMarket;
