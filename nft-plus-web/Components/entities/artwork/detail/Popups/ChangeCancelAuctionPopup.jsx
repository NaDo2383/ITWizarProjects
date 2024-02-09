/**
 * @createdBy duka
 */
import React, { useEffect, useState } from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useAlertTranslation from "locale/useAlertTranslation";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useApproveEyes from "common/metamask/eyes/useApproveEyes";
import useTradeMatic from "common/metamask/matic/useTradeMatic";
import useWallet from "common/metamask/useWallet";
import useArtDetail from "../useArtDetail";
import usePopup from "Components/ui/popup/usePopup";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useRouter } from "next/router";

function ChangeCancelAuctionPopup() {
	const { setGlobalLoading } = useGlobalContext();
	const {
		MODAL_TYPES,
		handleShowModal,
		hideAllModals,
		setGlobalModalState,
		popupProps,
		getCurrentModalprops
	} = usePopup();
	const {
		changePriceCancelI18,
		cancel,
		stopSelling,
		changePrice
	} = useArtworkTranslation();
	const {
		plsInstallMetamaskInBrowserI18,
		notRegisteredI18,
		registerYourWalletI18
	} = useAlertTranslation();
	const {
		artDetail,
		getArtDetail,
		postChangeStatusNotMarket,
		updateArtworkPrice,
	} = useArtDetail();
	const { walletIsMatch } = useWallet();
	const { getNetwork } = useMetaNetwork();
	const { unlistHandler } = useTradeMatic();
	const { approveToken } = useApproveEyes();
	const { push } = useRouter();
    const [remove, setRemove] = useState(false);

	function handleChangePrice() {
		if (popupProps?.artwork?.auction?.bids?.length > 0 || popupProps?.artwork?.auction?.bidRegist) {
			handleShowModal(MODAL_TYPES.AUCTION_SALE_CONDITION);
		} else {
			push("/art/sellart-for-marketplace/" + popupProps?.artwork?.id)
			hideAllModals()
		}
	}

	function handleCancelListing() {
        if (popupProps?.artwork?.auction.bids.length > 0) {
			handleShowModal(MODAL_TYPES.AUCTION_SALE_CONDITION);
		} else {
			handleShowModal(MODAL_TYPES.REMOVE_AUCTION, {
				auction: popupProps?.artwork?.auction,
				currency: popupProps?.artwork?.currency,
				artworkId: popupProps?.artwork?.id,
				upDateArtDetail: () => getArtDetail(popupProps?.artwork.id)
			});
			setRemove(true);
		}
	}

	async function handleStopSelling() {
		// үнэ устгах үйлдэл mumbai network буюу MATIC_CHAIN_ID - ААР хийгдэнэ
		setGlobalLoading(true);
		try {
			const currentNetworkId = await getNetwork();
			if (currentNetworkId !== process.env.MATIC_CHAIN_ID) {
				handleShowModal(MODAL_TYPES.SWITCHMAINNET);
				return;
			}

			if (currentNetworkId === "메타마스크를 설치해주세요.") {
				alert(plsInstallMetamaskInBrowserI18);
				return;
			}

			const { isMatchWallet } = await walletIsMatch();
			if (!isMatchWallet) {
				alert(registerYourWalletI18);
				return;
			}
			if (artDetail?.currency === "EYES") {
				const approveRes = await approveToken(artDetail?.tokenId, 0, true);
				if (approveRes === "success") {
					postChangeStatusNotMarket({ artworkId: artDetail?.id });
				}
			}

			if (artDetail?.currency === "MATIC") {
				if (!artDetail?.tokenId) {
					alert(notRegisteredI18);
					return;
				}
				const { result, failure } = await unlistHandler(artDetail?.tokenId);

				if (failure === "tokenId is not registered on current wallet.") {
					alert(noTokensInWalletI18);
					return;
				}
				if (result) {
					await updateArtworkPrice(artDetail?.id, "0");
				}
			}
			hideAllModals();
		} catch (e) {
			console.error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	useEffect(() => {
		getCurrentModalprops();
	}, []);

	return (
		<MainPopup width={530}>
			<PopupContainer>
				<div className="flex justify-center">
					<h5 className="text-[15px] font-[500] text-[#fff]">{changePriceCancelI18}</h5>
				</div>
				<PopupContent>
					<div className="flex flex-col mt-[50px] gap-[8px]">
						<button onClick={handleChangePrice} className="bg-[#404040] px-[15px] py-[10px] rounded-[5px]">
							<p className="text-[16px] font-[500]text-center text-[#fff]">{changePrice}</p>
						</button>
						<button onClick={handleCancelListing} className="bg-[#404040] px-[15px] py-[10px] rounded-[5px]">
							<p className="text-[16px] font-[500]text-center text-[#fff]">{stopSelling}</p>
						</button>
						<button onClick={() => hideAllModals()} className="bg-[#181A1A] px-[15px] py-[10px] rounded-[5px]">
							<p className="text-[16px] font-[500]text-center text-[#fff]">{cancel}</p>
						</button>
					</div>
				</PopupContent>
			</PopupContainer>
		</MainPopup>
	);
}

export default ChangeCancelAuctionPopup;
