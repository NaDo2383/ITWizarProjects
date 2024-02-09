/**
 * @createdBy duka
 */
import React, { useEffect, useState } from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useAlertTranslation from "locale/useAlertTranslation";
import { FaWonSign } from "react-icons/fa";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import useCurrency from "common/metamask/useCurrency";
import { useGlobalContext } from "common/global/useGlobalContext";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useApproveEyes from "common/metamask/eyes/useApproveEyes";
import useTradeMatic from "common/metamask/matic/useTradeMatic";
import useWallet from "common/metamask/useWallet";
import useArtDetail from "../useArtDetail";
import ArtworkPopupCard from "./ArtworkPopupCard";
import MobileEditSellPricePopup from "./MobileEditSellPricePopup";

function EditSellPricePopup() {
	const { editSellPriceI18, editChangePriceI18, cancel, changeAmount } =
		useArtworkTranslation();
	const { notOwnTokensInWalletAddressI18, registerYourWalletI18 } =
		useAlertTranslation();
	const {
		handleShowModal,
		MODAL_TYPES,
		getCurrentModalprops,
		popupProps,
		hideModal,
		globalModalState
	} = usePopup();
	const { updateArtworkPrice } = useArtDetail();
	const { approveToken } = useApproveEyes();
	const { editPriceButtonHandler } = useTradeMatic();
	const [won, setWon] = useState(null);
	const [newC, setNewC] = useState(false);
	const { getNetwork } = useMetaNetwork();
	const { toWon, toEthers, toWei, excreptWon } = useCurrency();
	const [newPrice, setNewPrice] = useState();
	const [convertedWon, setConvertedWon] = useState(0);
	const { setGlobalLoading, browserWindow } = useGlobalContext();
	const { walletIsMatch } = useWallet();

	function handleNewPrice(e) {
		const inputPrice = e.target.value
			.replace(/[^0-9.]/g, "")
			.replace(/(\..*)\./g, "$1");
		setNewC(true);
		setNewPrice(inputPrice);
		const weiPrice = toWei(inputPrice);
		toWon(weiPrice, popupProps?.artwork?.currency).then((convertedValue) => setConvertedWon(convertedValue));
	}

	async function handleChangePrice() {
		setGlobalLoading(true);
		try {
			if (!newC) {
				alert("old price must be changed!");
				return;
			}
			const { price, currency, tokenId, id } = popupProps?.artwork;
			const currentNetworkId = await getNetwork();
			if (currentNetworkId !== process.env.MATIC_CHAIN_ID) {
				handleShowModal(MODAL_TYPES.SWITCHMAINNET);
				return;
			}

			const { isMatchWallet, currentMetaWallet } = await walletIsMatch();
			if (!isMatchWallet) {
				alert(registerYourWalletI18);
				return;
			}
			if (currentMetaWallet === "notFound") {
				alert(registerYourWalletI18);
				return;
			}

			if (!tokenId) {
				alert("tokenId not found");
				return;
			}

			const { result, failure, contractHash } = await editPriceButtonHandler(tokenId, +newPrice);
			const updatedWeiPrice = toWei(newPrice);
			if (!failure) {
				await updateArtworkPrice(id, updatedWeiPrice);
				await popupProps?.fetchArtDetail();
				hideModal();
			}
			if (failure === "execution reverted: you must own target token") {
				alert(noTokensInWalletI18);
				return;
			} else if (failure === "tokenId is not registered on current wallet.") {
				alert(notOwnTokensInWalletAddressI18);
				return;
			} else if (failure === 'cancelled') {
				alert(`${failure}`)
				return;
			}
		} catch (e) {
			console.error("eeeeeeeeeeeeeeeeee", e);
		} finally {
			setGlobalLoading(false);
		}
	}

	useEffect(() => {
		getCurrentModalprops();
	}, []);

	useEffect(() => {
		toWon(popupProps?.artwork?.price, popupProps?.artwork?.currency, false, popupProps?.artwork?.id).then((res) => setWon(res));
	}, [popupProps]);

	return (
		<>
			{
				browserWindow.innerWidth > 600 ?
					<div className='hidden sm:flex sm:flex-col overflow-hidden'>
						<MainPopup width={530}>
							<PopupContainer>
								<PopupHeader text={editSellPriceI18} />
								<PopupContent>
									<div className="mb-[30px]">
										<ArtworkPopupCard isEdittingPrice={true} />
										<div className="flex items-center pt-[5px] pb-[15px]  font-normal text-[15px] ">
											<h5 className="text-[18px] text-[#DDDDDD] font-medium">{changeAmount}</h5>
										</div>
										<div className="flex flex-row">
											<input
												value={newC ? newPrice : ''}
												onChange={(e) => handleNewPrice(e)}
												inputMode="numeric"
												placeholder="변경할 금액을 입력해주세요"
												pattern="[0-9]+"
												className="w-full bg-black border border-[#FB3873] font-[400] text-[#808080] sm:text-[16px] text-[12px] rounded-[5px] px-[14px] pt-[6px] pb-[8px]"
											/>{" "}
											<span className="pl-2 flex justify-end mt-1 md:mt-0 text-[18px] font-[700] md:justify-center items-center">
												{popupProps?.artwork?.currency}
											</span>
										</div>
										<div className="flex justify-end  text-[14px] mt-1 md:mt-0">
											<div className="flex items-center text-[#8E8E8E] ">
												<FaWonSign />
												{+convertedWon?.toFixed(2)}
											</div>
										</div>
									</div>
								</PopupContent>
								<PopupActionButtons
									yes={() => handleChangePrice()}
									no={() => hideModal()}
									btnTexts={{ yes: editChangePriceI18, no: cancel }}
								/>
							</PopupContainer>
						</MainPopup>
					</div>
					: <MobileEditSellPricePopup />
			}
		</>
	);
}

export default EditSellPricePopup;
