/**
 * @createdBy Duka
 */
import React, { useState, useEffect } from "react";
import { PopContainer } from "Components/ui/popup/popupUi";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import Web3 from "web3";
import { useGlobalContext } from "common/global/useGlobalContext";
import usePopup from "Components/ui/popup/usePopup";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import Checkbox from "Components/ui/checkbox/Checkbox";
import useTradeMatic from "common/metamask/matic/useTradeMatic";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import ArtworkPopupCard from "./ArtworkPopupCard";
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import Image from "next/image";
import { FaWonSign } from "react-icons/fa";
import useCurrency from "common/metamask/useCurrency";
import { useRouter } from "next/router";
import useArtDetail from "../useArtDetail";
import useTradeEyes from "common/metamask/eyes/useTradeEyes";
import useWallet from "common/metamask/useWallet";
import useAlertTranslation from "locale/useAlertTranslation";
import { ethers } from "ethers";

function OrderPaymentPopup() {
	const { orderPaymentI18, makePaymentI18, cancel } = useArtworkTranslation();
	const { getArtDetail } = useArtDetail();
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [acceptTermsError, setAcceptTermsError] = useState(false);
	const {
		getCurrentModalprops,
		popupProps,
		MODAL_TYPES,
		handleShowModal,
		hideAllModals,
		hideModal
	} = usePopup();
	const { total, checkAllTermsI18 } = useCommonTranslation();
	const { buyButtonHandler } = useTradeMatic();
	const [won, setWon] = useState(null);
	const { setGlobalLoading, authUser, browserWindow } = useGlobalContext();
	const artwork = popupProps?.artwork;
	const { getNetwork } = useMetaNetwork();
	const { toWon, excreptWon } = useCurrency();
	const { push } = useRouter();
	const { tradeWithEyes } = useTradeEyes();
	const { walletIsMatch } = useWallet();
	const { registerYourWalletI18 } = useAlertTranslation();

	async function handlePayment() {
		setGlobalLoading(true);
		try {
			if (!acceptTerms) {
				setAcceptTermsError(true);
				alert(checkAllTermsI18);
				return;
			}
			const chainId =
				artwork?.currency === "EYES"
					? process.env.ETH_CHAIN_ID
					: process.env.MATIC_CHAIN_ID;
			const currentNetwork = await getNetwork();
			if (currentNetwork !== chainId) {
				if (artwork?.currency === "EYES") {
					handleShowModal(MODAL_TYPES.SWITCHETHERIUMNET);
				} else {
					handleShowModal(MODAL_TYPES.SWITCHMAINNET);
				}
				return;
			}

			const { isMatchWallet, currentMetaWallet } = await walletIsMatch()
			if (!isMatchWallet) {
				alert(registerYourWalletI18)
				return
			}

			if (artwork?.currency === "EYES") {
				const tokenId = ethers.BigNumber.from(artwork.tokenId)._hex;
				const workId = artwork.id.toString();
				const { failure, contractHash } = await tradeWithEyes(tokenId, workId, artwork?.walletAddress, artwork?.price);
				if (failure) {
					alert(failure)
					return
				}
				const formData = {
					action: "trade",
					txHash: contractHash,
					tokenId: tokenId,
					workId: workId,
					buyer: currentMetaWallet,
					price: artwork.price,
					seller: artwork.walletAddress
				}
				const myInit = {
					method: "POST",
					body: JSON.stringify(formData)
				};
				await fetch("/api/buy", myInit)

				hideAllModals()
				setTimeout(() => {
					push('/mypage?subpage=purchasedNft')
				}, [500])
				return
			} else {

				const { contractHash, result, failure } = await buyButtonHandler(
					artwork.tokenId,
					artwork.id
				);

				if (failure) {
					alert(failure);
					return;
				}
				hideAllModals();
				setTimeout(() => {
					push('/mypage?subpage=purchasedNft')
				}, [500])
				return;
			}
		} catch (e) {
			console.error(e);
		} finally {
			setGlobalLoading(false);
			getArtDetail(artwork.id);
		}
	}

	function updateAcceptTerms(e) {
		if (e.target.checked) {
			setAcceptTerms(true);
		} else {
			setAcceptTerms(false);
		}
	}

	useEffect(() => {
		if (acceptTerms) {
			setAcceptTermsError(false);
		}
	}, [acceptTerms]);

	useEffect(() => {
		getCurrentModalprops();
	}, [popupProps]);

	useEffect(() => {
		toWon(
			popupProps?.artwork?.price,
			popupProps?.artwork?.currency,
			false,
			popupProps?.artwork?.id
		).then((res) => setWon(res));
	}, [popupProps]);

	return (
		<MainPopup width={572}>
			<PopContainer>
				<PopupHeader text={orderPaymentI18} />
				<PopupContent>
					<div className="mb-[30px]">
					{
						browserWindow.innerWidth > 600 ?
							<ArtworkPopupCard />
							:
							<>
								<div className="flex flex-col w-full gap-[10px] bg-[#141313] p-[15px] justify-center items-center mt-[20px]">
									<div className="relative cursor-pointer flex justify-center items-center rounded-[5px]">
										{(popupProps?.artwork?.fileType === "AUDIO") ||
											(popupProps?.artwork?.fileType === "VIDEO" && popupProps?.artwork?.imageFile.url2) ||
											popupProps?.artwork?.fileType === "IMAGE" ? (
											<div className="relative bg-black">
												<div className='w-[70px] h-[70px] sm:w-full sm:h-full'>
													<img
														className='w-[70px] h-[70px] sm:w-full sm:h-full rounded-[5px] object-cover bg-[#181A1A]'
														style={{ borderRadius: '5px' }}
														src={
															popupProps?.artwork?.thumbnailUrl3x
																? popupProps?.artwork?.thumbnailUrl3x
																: "/art1.jpg"
														}
														priority
														unoptimized
														layout="fill"
														objectFit="cover"
														alt="artwork-thumbnail"
													/>
												</div>
											</div>
										) : (
											""
										)}
										{popupProps?.artwork?.fileType === "VIDEO" && (
											<div className="relative w-[70px] h-[70px] sm:w-full sm:h-full lg:w-[276px] lg:h-[276px]">
												<div
													className={!popupProps?.artwork?.imageFile.url2
														? " h-full cursor-pointer w-full overflow-hidden bg-cover bg-center flex justify-center items-center"
														: "none w-0 h-0 "
													}>
													<video
														className={`w-[70px] h-[70px] sm:w-full sm:h-full rounded-[5px] object-cover bg-[#181A1A]`}
														src={
															popupProps?.artwork?.imageUrl}
														loop
														autoPlay
														muted
														playsInline
														alt={popupProps?.artwork?.imageUrl}>
														<source
															src={
																popupProps?.artwork?.imageUrl}
															type="video"
														/>
													</video>
												</div>
											</div>
										)}
									</div>
									<div className="flex flex-col sm:gap-[3px] items-center">
										<h6 className="text-[14px] text-[#fff]">
											{popupProps?.artwork?.artworkName}
										</h6>
										<span className="text-[14px] text-[#B0B0B0]">
											{popupProps?.artwork?.authorName}
										</span>
									</div>
								</div>
							</>
					}
						<div className="text-[#B0B0B0] sm:text-[18px] text-[14px] sm:mt-0 mt-[30px]">{total}</div>
						<div className="flex flex-col items-center px-0  font-medium sm:text-[18px] text-[16px] gap-1 mt-[10px] py-[14px] justify-center bg-[#0F1111]">
							<div className="flex flex-row sm:text-[18px] text-[16px] text-bold text-[#DDD] md:flex font-bold">
								<div className="relative flex h-[17px] w-[17px] mx-1 my-[4px]">
									{popupProps?.artwork?.type === "NOT_SELL" ? null : (
										<Image
											src={
												popupProps?.artwork?.currency == "EYES"
													? eyesicon
													: matic_logo
											}
											alt="artwork-currency"
										/>
									)}
								</div>
								{Web3.utils.fromWei(
									(popupProps?.artwork?.price || "0").toString(),
									"ether"
								)}
								{popupProps?.artwork?.currency}
							</div>
							<div className="flex items-center sm:text-[14px] text-[12px] text-[#999] font-[400] gap-1">
								{popupProps?.artwork?.price !== "0" && (
									<>
										<FaWonSign />
										{excreptWon(won, popupProps?.artwork?.id)}
									</>
								)}
							</div>
						</div>
						<PreCausionBox
							updateAcceptTerms={updateAcceptTerms}
							acceptTermsError={acceptTermsError}
							acceptTerms={acceptTerms}
						/>
					</div>
				</PopupContent>
				<PopupActionButtons
					yes={() => handlePayment()}
					no={() => hideModal()}
					btnTexts={{ no: cancel, yes: makePaymentI18 }}
				/>
			</PopContainer>
		</MainPopup>
	);
}

function PreCausionBox({ updateAcceptTerms, acceptTermsError, acceptTerms }) {
	const {
		orderPurchaseI18,
		orderDescription1I18,
		orderDescription2I18,
		orderCheckboxI18
	} = useArtworkTranslation();

	return (
		<div>
			<h6 className="sm:text-[18px] text-[14px] mt-[25px] text-[#B0B0B0] font-medium">
				{orderPurchaseI18}
			</h6>
			<div
				style={{
					backgroundColor: "#2F2E39",
					color: "#DDD",
					fontWeight: "400"
				}}
				className="sm:p-[20px] p-[15px] sm:my-[21px] my-[10px] sm:text-[14px] leading-normal text-[12px] h-full w-full">
				<p className="sm:text-[14px] leading-normal text-[12px] text-[#DDD] font-[400]">{orderDescription1I18}</p>
				<p className="sm:text-[14px] leading-normal text-[12px] text-[#DDD] font-[400]">{orderDescription2I18}</p>
			</div>
			<div className="text-base flex justify-center text-white mb-[40px]">
				<label htmlFor="check" className="inline-flex pointer items-center">
					<Checkbox
						id="check"
						onClick={updateAcceptTerms}
						checked={acceptTerms}
					/>
					<p
						className={`${acceptTermsError ? " text-[#FB3873]" : " text-[#DDD]"
							} mx-2 sm:text-[16px] text-[12px]`}>
						{orderCheckboxI18}
					</p>
				</label>
			</div>
		</div>
	);
}

export default OrderPaymentPopup;
