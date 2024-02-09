/**
 * @createdBy Phill Anderson 2022/2/27
 */
import { apis } from "utils/libs";
import useCrud from "common/axios/crud";
import { useArtworkContext } from "./useArtworkContext";
import useMessageFactory from "common/message/useMessageFactory";
import { useGlobalContext } from "common/global/useGlobalContext";
import axios from "axios";
import usePopup from "Components/ui/popup/usePopup";

function useArtwork() {
	const { getModel, postModel, deleteModel } = useCrud();
	const { calcMessage } = useMessageFactory();
	const { MODAL_TYPES, handleShowModal } = usePopup();
	const { setGlobalLoading, authUser } = useGlobalContext();
	const {
		recommendedArtworks,
		setRecommendedArtworks,
		mostLikedArtworks,
		setMostLikedArtworks,
		artworkLoading,
		setArtworkLoading,
		artworkCategories,
		setArtworkCategories,
		artworksByCatName,
		setArtworksByCatName,
		artworkRights,
		setArtworkRights,
		artPagination,
		setArtPagination,
		artworksByFavorited,
		setArtworksByFavorited,
		artworksByStocked,
		setArtworksByStocked,
		artworksByOnsale,
		setArtworksByOnsale,
		ownedArtworks,
		setOwnedArtworks,
		artworksPending,
		setArtworksPending,
		deletionArtwork,
		setDeletionArtwork,
		coverNotImageFile,
		setCoverNotImageFile,
		tenSecTemp,
		setTenSecTemp
	} = useArtworkContext();
	
	async function getRecommendedArtworks() {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.recommendedArtworks);
			setRecommendedArtworks(res?.result);
			return res.result;
		} catch (e) {
			const msg = calcMessage(e?.response?.status);
			return msg;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getMostLikedArtworks() {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.mostLikedArtworks);
			setMostLikedArtworks(res?.result);
			return res.result;
		} catch (e) {
			const msg = calcMessage(e?.response?.status);
			return msg;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getArtworkCategories() {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.artworkCategories);
			setArtworkCategories(res?.result);
			localStorage.setItem('categories', JSON.stringify(res?.result));
			return res.result;
		} catch (e) {
			const msg = calcMessage(e?.response?.status);
			return msg;
		} finally {
			setGlobalLoading(false);
		}
	}
	async function deleteArtWork(id) {
		setGlobalLoading(true);
		try {
			const res = await deleteModel(apis.artwork + "/" + id);
			setDeletionArtwork(id);
			return res.result;
		} catch (e) {
			console.error(e);
			const msg = calcMessage(e?.response?.status);
			return msg;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function artworkDelete(id) {
		setGlobalLoading(true);
		try {
			const res = await deleteModel(apis.artworkDelete + `/${id}`);
			setDeletionArtwork(id);
			return res.result;
		} catch (e) {
			console.error(e);
			const msg = calcMessage(e?.response?.status);
			return msg;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getArtworksByCatName(catName) {
		setGlobalLoading(true);
		try {
			let url =
				catName === "all"
					? apis.artworksRecent
					: apis.artworkCategoryByName + catName;
			const res = await getModel(url);
			setArtworksByCatName(res?.result);
			return res.result;
		} catch (e) {
			const msg = calcMessage(e?.response?.status);
			return msg;
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getArtRights() {
		try {
			const res = await getModel(apis.artRights);
			setArtworkRights(res?.result);
			return res?.result;
		} catch (e) {
			const msg = calcMessage(e?.response.status);
			setArtworkRights([]);
			return msg;
		}
	}

	async function getArtworkUpdate(data, id) {
		setGlobalLoading(true);
		try {
			const res = await postModel(apis.artworkUpdate + `/${id}`, data, true);
			return res?.result;
		} catch (e) {
			if (e?.response.status) {
				return calcMessage(e?.response.status);
			}
			throw new Error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getStockArtworks(pageNumber = 0) {
		setGlobalLoading(true);
		try {
			const res = await getModel(
				apis.stockWorks + `?page=${pageNumber}&size=${16}`,
				true
			);
			setArtworksByStocked(res);
			return res;
		} catch (e) {
			if (e?.response?.status) {
				return calcMessage(e?.response?.status);
			}
			throw new Error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getOnSaleArtworks(pageNumber = 0) {
		const { page, size } = artPagination;
		setGlobalLoading(true);
		try {
			const res = await getModel(
				apis.onSaleArtworks + `?page=${pageNumber}&size=${size}`,
				true
			);
			setArtworksByOnsale(res);
			return res?.content;
		} catch (e) {
			if (e?.response?.status) {
				return calcMessage(e?.response.status);
			}
			throw new Error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getFavoritedArtworks(pageNumber = 0) {
		setGlobalLoading(true);
		try {
			const res = await getModel(
				apis.heartedArtworks + `?page=${pageNumber}&size=${8}`,
				true
			);
			setArtworksByFavorited(res);
			return res?.content;
		} catch (e) {
			if (e?.response?.status) {
				return calcMessage(e?.response.status);
			}
			throw new Error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	async function saveArtwork(data) {
		setGlobalLoading(true);
		try {
			const res = await postModel(apis.saveArtwork, data, true);
			return res;
		} catch (e) {
			const msg = calcMessage(e?.response.status);
			return msg;
		} finally {
			setGlobalLoading(false);
		}
	}
	async function sendHearth(id) {
		try {
			const res = await postModel(apis.sendhearth, { artworkId: id }, true);
			return res;
		} catch (e) {
			const msg = calcMessage(e?.response.status);
			return msg;
		}
	}
	async function unSendHearth(id) {
		try {
			const res = await postModel(apis.unSendHearth, { artworkId: id }, true);
			return res;
		} catch (e) {
			const msg = calcMessage(e?.response.status);
			return msg;
		}
	}

	async function getOwnedArtworks( pageNumber = 0) {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.ownershipLogList +`?page=${pageNumber }&size=${5}`,true);
			setOwnedArtworks(res);
			return res;
		} catch (e) {
			if (e?.response?.status) {
				return calcMessage(e?.response.status);
			}
			throw new Error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	async function getArtworksRegProgress(pageNumber = 0, params = '') {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.artworksPending + `?page=${pageNumber}&size=${8}${params}`, true);
			setArtworksPending(res);
			return res?.content;
		} catch (e) {
			if (e?.response?.status) {
				console.error(e);
				return calcMessage(e?.response?.status);
			}
			
		} finally {
			setGlobalLoading(false);
		}
	}

	async function changeArtPagination(value) {
		setArtPagination((prev) => ({ ...prev, page: value }));
	}

	const mergeRights = (obj) => {
		const rights = [];
		obj?.forEach((el) => {
			if (el.rights) {
				el.rights?.forEach((elem) => {
					const found = rights.find((t) => t.code == elem.code);
					if (!found) {
						rights.push({
							id: elem.id,
							code: elem.code,
							endDate: elem.endDate,
							startDate: elem.startDate
						});
					}
				});
			} else {
				rights.push({
					id: el.id,
					code: el.code,
					endDate: el.endDate,
					startDate: el.startDate
				});
			}
		});
		return rights;
	};
	const VideoToGif = async (data) => {
		const formData = new FormData();
		formData.append("file", data);
		if (typeof window !== "undefined") {
			try {
				const response = await axios.post(
					window.location.origin + "/api/uploadFile",
					formData,
					{
						api: {
							responseLimit: "70mb"
						},
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}
				);
				return response.data;
				// const newPath = response.data.path;
				// if (newPath) {
				// 	try {
				// 		const response = await axios.post(
				// 			["video/mp4", "video/avi", "video/quicktime"].includes(data?.type)
				// 				? window.location.origin + "/api/videoslice"
				// 				: window.location.origin + "/api/audioslice",
				// 			{ newPath: newPath.file.newFilename }
				// 		);
				// 		return response.data;
				// 	} catch (error) {
				// 		console.error("Error converting video to GIF:", error);
				// 	}
				// }
			} catch (error) {
				console.error("Error converting video to GIF:", error);
			}
		}
	};

	async function handleArtworkHeart(payload) {
		const { 
			artwork, 
			recentArt, 
			setRecentArt,  
		} = payload
		
		// ХҮН НЭГ Л УДАА heart товчин дээр дарах ёстой
		// login хийгээгүй бол зүрх дарах үйлдэл хийхгүй
		if( !authUser ) {
			handleShowModal(MODAL_TYPES.LOGIN_POPUP)
			return
		}
		
		setRecentArt(prev => ({
			...prev, 
			heartCount: prev.isHearted ? prev.heartCount - 1 : prev.heartCount + 1,
			isHearted: !prev.isHearted,
		}))
		
		recentArt?.isHearted ? unSendHearth(artwork.id) : sendHearth(artwork.id)  
	}

	return {
		handleArtworkHeart,
		setArtPagination,
		artworkLoading,
		getRecommendedArtworks,
		getMostLikedArtworks,
		recommendedArtworks,
		mostLikedArtworks,
		getArtworkCategories,
		artworkCategories,
		getArtworksByCatName,
		artworksByCatName,
		getArtRights,
		artworkRights,
		saveArtwork,
		mergeRights,
		getStockArtworks,
		getOnSaleArtworks,
		artworksByFavorited,
		getFavoritedArtworks,
		artworksByStocked,
		artworksByOnsale,
		changeArtPagination,
		artPagination,
		setArtPagination,
		getOwnedArtworks,
		ownedArtworks,
		sendHearth,
		unSendHearth,
		getArtworksRegProgress,
		artworksPending,
		deleteArtWork,
		deletionArtwork,
		getArtworkUpdate,
		VideoToGif,
		coverNotImageFile,
		setCoverNotImageFile,
		tenSecTemp,
		setTenSecTemp,
		artworkDelete,
		setDeletionArtwork
	};
}

export default useArtwork;
