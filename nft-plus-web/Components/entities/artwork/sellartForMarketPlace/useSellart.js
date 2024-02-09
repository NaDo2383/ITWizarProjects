/**
 * @createdBy Phill Anderson 2023/04/10
 */
import { useGlobalContext } from "common/global/useGlobalContext";
import { useSellartContext } from "./useSellartContext";
import useWallet from "common/metamask/useWallet";
import useAlertTranslation from "locale/useAlertTranslation";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useApproveEyes from "common/metamask/eyes/useApproveEyes";
import usePopup from "Components/ui/popup/usePopup";
import useTradeMatic from "common/metamask/matic/useTradeMatic";
import { useRouter } from "next/router";
import moment from "moment";
import useAuction from "common/metamask/useAuction";
import useCrud from "common/axios/crud";
import useCurrency from "common/metamask/useCurrency";
import useArtDetail from "../detail/useArtDetail";
import { apis } from "utils/libs";

function useSellart() {
	const dayMils = 86400000;
	const {
		registerYourWalletI18,
		notRegisteredI18,
		noTokensInWalletI18,
		notOwnTokensInWalletAddressI18,
		minDayI18,
		maxDayI18
	} = useAlertTranslation();
	const { push, query } = useRouter();
	const { postModel, putModel } = useCrud();
	const { setGlobalLoading, activeWallets } = useGlobalContext();
	const {
		priceState,
		setPriceState,
		auctionState,
		setAuctionState,
		resetSellartContext,
		generatedFees,
		setGeneratedFees
	} = useSellartContext();
	const { getWallet, walletIsMatch } = useWallet();
	const { getNetwork } = useMetaNetwork();
	const { approveToken } = useApproveEyes();
	const { handleShowModal, MODAL_TYPES } = usePopup();
	const { listButtonHandler } = useTradeMatic();
	const { auctionButtonHandler, updateAuctionHandler, getAuctionHandler } =
		useAuction();
	const { toEthers, toWei, convertIntoBigNumber } = useCurrency();
	const { updateArtworkPrice, getArtDetail } = useArtDetail();
	// ирээдүйд салгаж болзошгүй учраас addEyesPrice, addMaticPrice - ийг тус тусад нь бичив
	async function addEyesPrice(artTokenId, newPrice) {
		setGlobalLoading(true);
		try {
			const { isMatchWallet, currentMetaWallet } = await walletIsMatch();

			if (currentMetaWallet === "notFound") {
				alert(registerYourWalletI18);
				return;
			}

			if (!isMatchWallet) {
				alert(registerYourWalletI18);
				return;
			}
			const currentNetwork = await getNetwork();

			if (currentNetwork === process.env.MATIC_CHAIN_ID) {
				const approved = await approveToken(artTokenId, newPrice);
				console.error("approved", approved);
				if (approved === "토큰을 소유한 지갑 주소가 아닙니다.") {
					alert(notOwnTokensInWalletAddressI18);
					return;
				}
				if (approved !== "success") {
					alert(approved);
					return;
				}
				return approved;
			}
			if (currentNetwork !== process.env.MATIC_CHAIN_ID) {
				handleShowModal(MODAL_TYPES.SWITCHMAINNET);
				return;
			}
		} catch (e) {
			console.error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	async function addMaticPrice(artTokenId, newPrice, artworkId) {
		setGlobalLoading(true);
		try {
			if (!artTokenId) {
				alert(notRegisteredI18);
				return;
			}
			if (newPrice == 0) {
				alert("price must be other value");
				return;
			}

			const { isMatchWallet, currentMetaWallet } = await walletIsMatch();

			if (currentMetaWallet === "processing") {
				alert("Please login into metamask!");
				return;
			}
			if (currentMetaWallet === "notFound") {
				alert(registerYourWalletI18);
				return;
			}
			if (!isMatchWallet) {
				alert(registerYourWalletI18);
				return;
			}
			const currentNetwork = await getNetwork();

			if (currentNetwork === process.env.MATIC_CHAIN_ID) {
				const { contractHash, failure, result } = await listButtonHandler(
					artTokenId,
					newPrice
				);
				const updatedWeiPrice = toWei(newPrice);

				if (result === "listing succeeded") {
					await updateArtworkPrice(artworkId, updatedWeiPrice);
					setTimeout(() => {
						push(`/art/preview/${query.id}`);
					}, 3000);
					return;
				}
				if (failure === "tokenId is not registered on current wallet.") {
					alert(noTokensInWalletI18);
					return;
				} else {
					alert(failure);
					return;
				}
			}
			if (currentNetwork !== process.env.MATIC_CHAIN_ID) {
				handleShowModal(MODAL_TYPES.SWITCHMAINNET);
				return;
			}
		} catch (e) {
			console.error(e);
		} finally {
			setGlobalLoading(false);
		}
	}

	async function addAuction(artItem) {
		setGlobalLoading(true);
		try {
			const { endDate, startDate } = auctionState;
			const auctionStart = new Date(
				moment(new Date(startDate)).format("YYYY/MM/DD HH:mm:00")
			).getTime();
			const auctionEnd = new Date(
				moment(new Date(endDate)).format("YYYY/MM/DD HH:mm:00")
			).getTime();
			const tokenId = await artItem?.tokenId;
			const auctionPrice = toWei(auctionState.startingPrice);

			if (endDate - startDate < dayMils) {
				alert(minDayI18);
				return;
			} else if (endDate - startDate > dayMils * 15) {
				alert(maxDayI18);
				return;
			}

			const { isMatchWallet, currentMetaWallet } = await walletIsMatch();

			if (currentMetaWallet === "notFound") {
				alert(registerYourWalletI18);
				return;
			}
			if (!isMatchWallet) {
				alert(registerYourWalletI18);
				return;
			}
			const currentNetwork = await getNetwork();

			if (currentNetwork !== process.env.MATIC_CHAIN_ID) {
				handleShowModal(MODAL_TYPES.SWITCHMAINNET);
				return;
			}
			const auction = {
				tokenId: tokenId,
				auctionStart: Math.floor(auctionStart / 1000),
				auctionEnd: Math.floor(auctionEnd / 1000),
				startPrice: auctionPrice,
				auctionId: artItem?.auction
					? artItem?.auction?.id
					: artItem?.tempAuctionId
			};
			let isUpdate = artItem?.isAuction;

			// if(!isUpdate) {
			//    const {  response } = await getAuctionHandler(tokenId);
			//     const isEnableCreateAuction =  response[0] !== '0x0000000000000000000000000000000000000000';
			//     if(isEnableCreateAuction) {
			//         const { data:aData, error:aError } = await putModel(`/auction/${artItem?.tempAuctionId}/reg`,{ transactionHash: '0x0000000000000000000000000000000000000000' }, true )
			//         if(aData) {
			//           //  alert('successfully registered auction')
			//           //  await getArtDetail(artworkId)
			//           isUpdate = true;
			//         }
			//         if(aError) {
			//             console.error(aError)
			//             alert('failed')
			//             return
			//         }
			//     }
			// }
			if (!isUpdate) {
				const artworkData = {
					artworkId: artItem?.id,
					price: auctionPrice,
					startDate: auctionStart,
					endDate: auctionEnd,
					walletAddress: currentMetaWallet,
					tokenId: tokenId
				};
				const { data, error } = await postModel(
					apis.auction,
					artworkData,
					true
				);
				if (error?.response?.status === 400) {
					const errorMsg = error.response.data.message;
					if (errorMsg === "check.date") {
						alert(minDayI18);
						return;
					}
					if (errorMsg === "check.min.date") {
						alert(minDayI18);
						return;
					}
					if (errorMsg === "check.max.date") {
						alert(maxDayI18);
						return;
					}
					alert(errorMsg);
					return;
				}
				const { contractHash, failure } = await auctionButtonHandler(auction);
				if (failure) {
					alert(failure);
					return;
				}

				const { data: aData, error: aError } = await putModel(
					`/auction/${data?.result?.id}/reg`,
					{ transactionHash: contractHash },
					true
				);
				if (aData) {
					push("/art/preview/" + artItem?.id);
					return;
				}
				if (aError) {
					console.error(aError);
					return;
				}
			} else {
				const { contractHash, failure } = await updateAuctionHandler(auction);

				if (failure) {
					alert(failure);
					return;
				}
				const editedData = {
					price: auctionPrice,
					startDate: auctionStart,
					endDate: auctionEnd
				};
				const { error: editedAuctionError } = putModel(
					"/auction/" + auction.auctionId,
					editedData,
					true
				);
				if (editedAuctionError) {
					if (editedAuctionError?.response?.status === 400) {
						const errorMsg = editedAuctionError?.response?.data?.message;
						if (errorMsg === "check.date") {
							alert(minDayI18);
						} else if (errorMsg === "check.min.date") {
							alert(minDayI18);
						} else if (errorMsg === "check.max.date") {
							alert(maxDayI18);
						}
					} else {
						alert("failed");
					}
					return;
				}
				push("/art/preview/" + artItem?.id);
			}
		} catch (e) {
			alert(e);
			setGlobalLoading(false);
		} finally {
			setGlobalLoading(false);
		}
		setGlobalLoading(false);
	}

	function calcFee(fees) {
		const resaleFee = fees?.filter((fee) => fee.name === "RESALE")[0];
		const saleFee = fees?.filter((fee) => fee.name === "SALE")[0];
		return { resaleFee, saleFee };
	}

	return {
		priceState,
		setPriceState,
		addEyesPrice,
		addMaticPrice,
		auctionState,
		setAuctionState,
		addAuction,
		resetSellartContext,
		calcFee,
		generatedFees,
		setGeneratedFees
	};
}

export default useSellart;
