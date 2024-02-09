/**
 * @createdBy duka
 */
import React, { useState, useEffect } from "react";
import { PopContainer } from "Components/ui/popup/popupUi";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import Image from "next/image";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import usePopup from "Components/ui/popup/usePopup";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import Checkbox from "Components/ui/checkbox/Checkbox";
import { MODAL_TYPES } from "Components/ui/popup/popupRegistration";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useWallet from "common/metamask/useWallet";
import useCrud from "common/axios/crud";
import { useGlobalContext } from "common/global/useGlobalContext";
import Web3 from "web3";
import useAuction from "common/metamask/useAuction";
import { useRouter } from "next/router";
import { delay } from "utils/date";
import MobileCreateConfirmBidsPopup from "./MobileCreateConfirmBidsPopup";
const { default: CreatorProfile } = require("../CreatorProfile");
const { FaWonSign } = require("react-icons/fa");

function CreateConfirmBidsPopup() {
	const query = useRouter().query;
	const { postModel } = useCrud();
	const { setGlobalLoading, browserWindow } = useGlobalContext();
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [acceptTermsError, setAcceptTermsError] = useState(false);
	const { cancel, bidButtonI18, placeBidI18 } = useArtworkTranslation();
	const { total, checkAllTermsI18 } = useCommonTranslation();
	const {
		getCurrentModalprops,
		popupProps,
		handleShowModal,
		hideAllModals,
		hideModal,
		globalModalState
	} = usePopup();
	const { walletIsMatch } = useWallet();
	const { bidButtonHandler, bidEyesButtonHandler } = useAuction();
	const { getNetwork } = useMetaNetwork();

	async function handlePayment() {
		const currentNetwork = await getNetwork();
		const networkId =
			popupProps?.currency === "EYES"
				? process.env.ETH_CHAIN_ID
				: process.env.MATIC_CHAIN_ID;

		const modalType =
			popupProps?.currency === "EYES"
				? MODAL_TYPES.SWITCHETHERIUMNET
				: MODAL_TYPES.SWITCHMAINNET;
		if (currentNetwork !== networkId) {
			handleShowModal(modalType);
			return;
		}
		if (!acceptTerms) {
			setAcceptTermsError(true);
			alert(checkAllTermsI18);
			return;
		}

		const { isMatchWallet, currentMetaWallet } = await walletIsMatch();
		if (!isMatchWallet) {
			alert("wallet aa burtguulne uu");
			return;
		}
		setGlobalLoading(true);
		try {
			const result = await postModel(
				"/bid",
				{
					auctionId: popupProps.auction.id,
					price: Web3.utils.toWei(popupProps.bids.toString(), "ether"),
					transactionHash: "",
					walletAddress: currentMetaWallet,
					tokenId: popupProps.auction?.tokenId
				},
				true
			);
			const bid = {
				bidId: result.data.result.id,
				auctionId: popupProps.auction.id,
				bidPrice: Web3.utils.toWei(popupProps.bids.toString(), "ether"),
				tokenId: popupProps.auction?.tokenId

			};

			if (popupProps.currency === "EYES") {
				const { contractHash, failure } = await bidEyesButtonHandler(bid);
				if (failure && failure !== "cancelled") {
					alert(failure);
				}
			} else {
				const { contractHash, failure } = await bidButtonHandler(bid);
				if (failure && failure !== "cancelled") {
					alert(failure);
				}
			}
		} catch (e) {
			alert(e);
		} finally {
			delay(1000).then(() => {
				setGlobalLoading(false);
				globalModalState.getArtDetail(query.id);
				hideAllModals();
			})
		}
		delay(1000).then(() => {
			setGlobalLoading(false);
			globalModalState.getArtDetail(query.id);
			hideAllModals();
		})
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

	return (
		<>
		{
			browserWindow.innerWidth > 600 ?
				<div className='hidden sm:flex sm:flex-col overflow-hidden'>
					<MainPopup width={572}>
			{popupProps && (
				<PopContainer>
					<PopupHeader text={placeBidI18} />
					<PopupContent>
						<div className="mb-[40px]">
							<div className="flex items-center justify-between  first-letter:py-[16px] mt-[20px]">
								<CreatorProfile
									auction={popupProps?.auction}
									thumbnail_url={popupProps?.thumbnail_url}
									title={popupProps?.title}
									creator={popupProps?.creator}
									creator_avatar={popupProps?.creator_avatar}
									fileType={popupProps?.fileType}
									imageUrl={popupProps?.imageUrl}
									currency={popupProps?.currency}
									price={popupProps?.price}
									isAuction={popupProps?.isAuction}
									id={popupProps?.id}
								/>
							</div>
							<div className="text-[18px] mt-[20px] mb-[10px] text-[#B0B0B0] font-medium">
								{total}
							</div>
							<div className="bg-[#0F1111] mb-[25px] py-[15px] text-center">
								<div className="flex flex-row justify-center font-[700] gap-1 text-[#DDDDDD] mb-[5px] text-[18px]">
									<div className="relative flex items-center justify-center mr-[5px]">
										<Image
											width={15}
											height={15}
											src={popupProps?.currency === "EYES" ? eyesicon : matic_logo}
											alt="currency"
										/>
									</div>
									<div>{popupProps?.bids}</div>
									{popupProps?.currency}
								</div>
								<div className="flex items-center gap-[4px] justify-center font-[400] text-[#999999] text-[14px]">
									<FaWonSign />
									{popupProps?.won}
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
						btnTexts={{ no: cancel, yes: bidButtonI18 }}
					/>
				</PopContainer>
			)}
		</MainPopup>
				</div>
				:
				<MobileCreateConfirmBidsPopup />
				}
		</>
		
	);
}

function PreCausionBox({ updateAcceptTerms, acceptTerms, acceptTermsError }) {
	const {
		orderPurchaseI18,
		orderCheckboxI18,
		ifHighterI18,
		meteMaskComfirmI18
	} = useArtworkTranslation();

	return (
		<div>
			<h3 className="text-[18px] text-[#B0B0B0] mt-[16px] font-medium">
				{orderPurchaseI18}
			</h3>
			<div
				style={{
					backgroundColor: "#2F2E39",
					color: "#DDD"
				}}
				className="p-[20px] mt-[10px] mb-[14px] mx-[5px] text-sm text-[14px] h-full w-[518px]">
				<p className="mb-6 text-[14px] text-[#DDD] font-[400]">
					{ifHighterI18}
				</p>
				<p className="text-[14px] text-[#DDD] font-[400]">
					{meteMaskComfirmI18}
				</p>
			</div>
			<div className="text-base flex justify-center mb-[50px]">
				<label htmlFor="check" className="inline-flex pointer items-center">
					<Checkbox
						id="check"
						onClick={updateAcceptTerms}
						checked={acceptTerms}
					/>
					<p
						className={`${acceptTermsError
							? " text-[#FB3873]"
							: " text-[#DDDDDD] text-[16px] font-[400]"
							} mx-2`}>
						{orderCheckboxI18}
					</p>
				</label>
			</div>
		</div>
	);
}

export default CreateConfirmBidsPopup;
