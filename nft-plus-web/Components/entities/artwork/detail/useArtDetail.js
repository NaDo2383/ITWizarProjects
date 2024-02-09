import useCrud from "common/axios/crud";
import { apis } from "utils/libs";
import { useArtDetailContext } from "./useArtDetailContext";
import useMessageFactory from "common/message/useMessageFactory";
import { useGlobalContext } from "common/global/useGlobalContext";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useArtworkTranslation from "locale/useArtworkTranslation";

function useArtDetail() {
	const { allRightsI18 } = useArtworkTranslation();
	const { setGlobalLoading } = useGlobalContext();
	const { getModel, postModel } = useCrud();
	const { authUser } = useAuthUser();
	const { calcMessage } = useMessageFactory();
	const { artDetail, setArtDetail } = useArtDetailContext();

	async function postChangeStatusNotMarket(data) {
		try {
			const res = await postModel(apis.artworkNotMarket, data, true);
			return res;
		} catch (e) {
			console.error(e);
			if (e?.response?.status) {
				return calcMessage(e?.response?.status);
			}
		}
	}

	async function setArtDetailInfo(detailData) {
		setArtDetail(detailData);
	}

	// client талаас artDetail татах функц
	async function getArtDetail(artId) {
		setGlobalLoading(true);
		try {
			const res = await getModel(apis.artworkDetail + `/${artId}`, true);
			setArtDetail(res.result);
			return res.result;
		} catch (e) {
			if (e?.response?.status) {
				return calcMessage(e?.response?.status);
			}
		} finally {
			setGlobalLoading(false);
		}
	}

	async function artworkBuyRequest(data) {
		setGlobalLoading(true);
		try {
			await postModel(apis.artworkBuyRequest + artDetail?.id, data, true);
			return;
		} catch (e) {
			if (e?.response?.status) {
				return calcMessage(e?.response?.status);
			}
		} finally {
			setGlobalLoading(false);
		}
	}

	async function updateArtworkPrice(artworkId, updatedPrice) {
		try {
			const res = await postModel(
				apis.artworkUpdatePrice + `/${artworkId}`,
				{ price: updatedPrice },
				true
			);
			return res;
		} catch (e) {
			console.error(e);
		}
	}
	function isOwnedArtork() {
		return authUser?.id === artDetail?.ownerId;
	}
	function isOwnCreatedArtwork() {
		return authUser?.id === artDetail?.authorId;
	}
	function isNobodyBuyArtwork() {
		return artDetail?.authorId === artDetail?.ownerId;
	}
	function isAuction() {
		return artDetail?.isAuction && artDetail?.auction;
	}
	function isEvent() {
		return artDetail?.isAd ? true : false ;
	}
	function isMarket() {
		return artDetail?.type === "SELL" ? true : false;
	}
	function isVM() {
		return artDetail?.isAd === true ? true : false;
	}

	function calcRightList() {
		return (
			<ul className="license flex items-center flex-wrap gap-2">
				{artDetail?.rights.length !== 0 &&
					artDetail.rights.map((right, idx) => (
						<li
							key={"right-" + idx}
							className="flex gap-1 items-center font-[300] sm:border-[0.5px] border-[0.4px] sm:border-[#C5C8D2] border-[#424242] sm:rounded-[50px] rounded-[40px] hover:border-[#FE25D5] ">
							<span className="sm:text-[15px] text-[12px] font-[400] text-[#DDD] px-[8px] py-[4px]">{allRightsI18[right.code]}</span>
						</li>
					))}
			</ul>
		);
	}

	return {
		getArtDetail,
		artDetail,
		setArtDetailInfo,
		contractDocumentsList: artDetail?.contractDocuments,
		// licenseList: artDetail?.licenseContractList,
		licenseList: [],
		isOwnedArtork,
		isOwnCreatedArtwork,
		isAuction,
		isMarket,
		isNobodyBuyArtwork,
		calcRightList,
		postChangeStatusNotMarket,
		setArtDetail,
		updateArtworkPrice,
		artworkBuyRequest,
		isEvent,
		isVM
	};
}

export default useArtDetail;
