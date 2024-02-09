import React, { useEffect, useState } from "react";
import { FaWonSign } from "react-icons/fa";
import { useRouter } from "next/router";
import Owning from "./Owner";
import Image from "next/image";
import star from "public/star.png";
import pink from "public/pink.png";
import verified from "public/verified.png";
import useArtworkTranslation from "locale/useArtworkTranslation";
import usePopup from "../../../ui/popup/usePopup";
import useArtDetail from "./useArtDetail";
import {
	BlueBtn,
	ColorfullBtn,
	ColorOutlineBtn,
	UnActiveBtn
} from "Components/ui/button/colorfullBtn";
import { useGlobalContext } from "common/global/useGlobalContext";
import Auction from "./Auction";
import Mark from "../Mark";
import useCurrency from "common/metamask/useCurrency";
import useAuthUser, { useCheckUser } from "Components/entities/user/auth/useAuthUser";
import useArtwork from "../useArtwork";
import useMyPageTranslation from "locale/useMypageTranslation";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useAlertTranslation from "locale/useAlertTranslation";
import useWallet from "common/metamask/useWallet";
import useTradeMatic from "common/metamask/matic/useTradeMatic";
import useApproveEyes from "common/metamask/eyes/useApproveEyes";
import ProjectIconBtn from "Components/entities/events/detail/ProjectIconBtnl";
import ArtDetailTab from "./artDetailTab/ArtDetailTab";
import EventDetailTab from "./eventDetailTab/EventDetailTab";
import MainInfoSkeleton from "./MainInfoSkeleton";

function MainInfo(props) {
	// const { isEvent } = props;
	const {
		certifiedWorkI18,
		tamtamWriterI18,
		copyrightedWorkI18,
		verificationCertificateI18,
		priceI18,
		createrRoyalty,
		licenceAvailableI18,
		unableToApllyI18,
		licenseAppI18,
		editSellPriceI18,
		notAvailableI18,
		licenseTknTradeRegI18,
		unRegisteredWorkI18,
		purchaseWorksI18,
		salesRegistrationI18,
		plsInstallMetaMaskI18,
		projectNameI18,
		sellingPriceI18,
		gotoFindWorksI18,
		unRegisteredWorksI18
	} = useArtworkTranslation();
	const {
		plsInstallMetamaskInBrowserI18,
		notRegisteredI18,
		registerYourWalletI18
	} = useAlertTranslation();
	const { stop_sellingI18 } = useMyPageTranslation();
	const { authUser } = useAuthUser()
	const { push } = useRouter();
	const { MODAL_TYPES, handleShowModal, hideAllModals, setGlobalModalState, hideModal } = usePopup();
	const { activeWallets, setGlobalLoading, globalItems } = useGlobalContext();
	const {
		artDetail,
		getArtDetail,
		isOwnedArtork,
		isOwnCreatedArtwork,
		isAuction,
		isMarket,
		calcRightList,
		postChangeStatusNotMarket,
		updateArtworkPrice,
		isNobodyBuyArtwork,
		artworkBuyRequest,
		isEvent
	} = useArtDetail();
	const { getArtRights, artworkRights, getArtworkUpdate } = useArtwork();
	const { isLoggedIn } = useCheckUser();
	const { toEthers, toWon, checkCurrencyIco, excreptWon } = useCurrency();
	const { walletIsMatch } = useWallet();
	const { getNetwork } = useMetaNetwork();
	const { unlistHandler } = useTradeMatic();
	const { approveToken } = useApproveEyes();
	const [convertedWon, setConvertedWon] = useState(null);

	function handleOrderPaymentPre() {
		// if (artDetail?.type === "SELL")
		if (authUser?.id) {
			handleShowModal(MODAL_TYPES.ORDERPAYMENT_PRE, { artwork: artDetail });
		} else {
			handleShowModal(MODAL_TYPES.LOGIN_POPUP)
		}
	}

	function handleBuyRequest() {
		if (authUser?.id) {
			handleShowModal(MODAL_TYPES.BUY_REQUEST, {
				artwork: artDetail,
				sendBuyRequest: () => artworkBuyRequest()
			});
		} else {
			handleShowModal(MODAL_TYPES.LOGIN_POPUP)
		}
	}

	function handleChangePrice() {
		handleShowModal(MODAL_TYPES.EDITSELLPRICE, {
			artwork: artDetail,
			fetchArtDetail: () => getArtDetail(artDetail?.id)
		});
		setGlobalModalState((prev) => ({
			...prev,
			artDetail: artDetail
		}));
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

			if (currentNetworkId === plsInstallMetaMaskI18) {
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

	function handleCancelListing() {
		handleShowModal(MODAL_TYPES.CONFIRM, {
			confirm: async () => {
				await handleStopSelling();
				await getArtDetail(artDetail?.id);
			}
		});
	}

	function handleRegisterLicense() {
		handleShowModal(MODAL_TYPES.REGISTER_LICENSE, {
			artwork: artDetail,
			artworkRights,
			save: async (data) => getArtworkUpdate(data, artDetail?.id),
			updateArtDetail: async () => getArtDetail(artDetail?.id)
		});
		setGlobalModalState((prev) => ({
			...prev,
			updateArtDetail: async () => getArtDetail(artDetail?.id)
		}));
	}

	function handleCheckLogin() { }

	function handleGotoLicenseRequest() {
		setGlobalModalState(prev => (
			{
				...prev,
				artDetail,
				showSwitchNetworkModal: (modalType) => {
					hideModal();
					handleShowModal(modalType);
				}
			}
		))
		handleShowModal(MODAL_TYPES.LICENSE_REQUEST)
	}

	useEffect(() => {
		toWon(artDetail?.price, artDetail?.currency).then((res) =>
			setConvertedWon(res)
		);
	}, [artDetail, activeWallets, globalItems?.updatedPrice]);

	useEffect(() => {
		const isLogged = isLoggedIn();
	}, []);
	useEffect(() => {
		if (artDetail?.marketStatus === "MARKET_DENIED") {
			handleShowModal(MODAL_TYPES.REPORTED_ARTWORK, {
				artDetail: artDetail
				// denyReason: artDetail
			});
		}
	}, [artDetail]);

	const informationHandler = () => { };


	if (!artDetail) {
		return <MainInfoSkeleton />;
	} else {
		return (
			<div className="artDetail w-full h-full overflow-hidden relative bg-[#252525] p-[30px] border border-[#252525] rounded-[5px] hidden sm:block">

				{isAuction() ? (
					<div className="flex flex-col">
						<div className={`flex sm:flex-col lg:flex-row gap-1 justify-between`}>
							<div className="flex flex-col">
								<div className="mb-[5px]">
									{artDetail?.isAuction && artDetail?.auction && (
										<Mark auction={artDetail?.auction} mini />
									)}
								</div>
								<div className="flex mt-[30px]">
									<h2 className="text-[24px] text-[#fff] font-[500] w-full md:w-auto">
										{artDetail?.artworkName}
									</h2>
								</div>
							</div>
							<div className={`${isMarket() ? 'mt-0' : 'mt-[-20px]'}`}>
								<ProjectIconBtn
									hearted={artDetail?.hearted}
									heartCount={artDetail?.heartCount}
								/>
							</div>
						</div>
					</div>
				) : (
					<div className="flex justify-between">
						<div className="flex flex-col">
							{artDetail?.isAd &&
								<div className="text-[#8F8F8F] font-[500] text-[16px]">
									<span>{projectNameI18}</span>
								</div>
							}
							<div className="w-full text-[#333] ">
								<h3 className="font-[500] sm:text-[24px] text-[18px] text-[#FFF]">
									{artDetail?.artworkName}
								</h3>
							</div>
						</div>
						<ProjectIconBtn
							hearted={artDetail?.hearted}
							heartCount={artDetail?.heartCount}
						/>
					</div>
				)}
				<div className="w-full flex flex-row sm:gap-[60px] gap-[35px] items-center mt-[25px]">
					<Owning
						userStatus={"Creator"}
						userName={artDetail?.authorName}
						src={artDetail?.authorProfileImg}
						id={artDetail?.authorId}
					/>
					<Owning
						userStatus={"Owner"}
						userName={artDetail?.ownerName}
						src={artDetail?.ownerProfileImg}
						id={artDetail?.ownerId}
					/>

				</div>
				<div>
					{isAuction() ? (
						<Auction />
					) : (
						<>
							<div className="w-full">
								<p className="text-[#DDD] font-[500] mb-[13px] text-[18px] sm:mt-[42px] mt-[30px]">
									{priceI18}
								</p>
								<div className="flex items-start md:items-center justify-between flex-col md:flex-row mb-[10px]">
									{isMarket() ? (
										<div className="flex gap-2 items-center">
											<span className="flex justify-center">
												{checkCurrencyIco(artDetail?.currency)}
											</span>
											<p className="text-white text-[26px] font-bold">
												{toEthers(artDetail?.price)}{" "}
												{artDetail?.currency === "EYES" ? "EYES" : "MATIC"}
											</p>
											<div className="flex items-center text-[#8E8E8E] mt-2 text-[14px] font-[400]">
												<FaWonSign />
												<p className="text-[14px] text-[#8E8E8E]">
													{excreptWon(convertedWon)}
												</p>
											</div>
										</div>
									) : (
										<div className="flex gap-2 items-center">
											<p className="text-[#8B8B8B] sm:text-[22px] text-[14px]">
												{isOwnedArtork()
													? isMarket()
														? ""
														: !artDetail?.adDrop && artDetail?.isAd === true ? unRegisteredWorksI18 : sellingPriceI18
													: unRegisteredWorksI18}
											</p>
										</div>
									)}
									{isMarket() ? (
										<div className="flex flex-row">
											<p className="font-[400] text-[#fff] tracking-[-1px] text-[14px] mt-2 mx-2">
												{createrRoyalty}
											</p>{" "}
											<span className="font-[400] text-[#fff] tracking-[-1px] text-[14px] mt-2">
												{artDetail?.royalty} %
											</span>
										</div>
									) : (
										""
									)}
								</div>

								{
									// худалдаанд гаргасан бөгөөд уг art - ийг өөрөө эзэмшиж буй үе
									isOwnedArtork() ? (
										isMarket() ? (
											// өөрөө эзэмшиж буй бөгөөд худалдаанд гаргасан буюу үнэ оруулсан үе
											<div className="flex gap-2.5">
												<ColorfullBtn
													text={editSellPriceI18}
													onClick={handleChangePrice}
												/>
												<ColorOutlineBtn
													text={stop_sellingI18}
													onClick={handleCancelListing}
												/>
											</div>
										) : (
											// өөрөө эзэмшиж буй бөгөөд худалдаанд гаргаагүй буюу үнэ оруулаагүй үе
											!artDetail?.adDrop && artDetail?.isAd === true ?
											<UnActiveBtn
												onClick={() => push("/events")}
												text={gotoFindWorksI18}
											/>
												:
												<ColorfullBtn
													text={salesRegistrationI18}
													onClick={() => push("/art/sellart-for-marketplace/" + artDetail?.id)}
												/>
										)
									) : isMarket() ? (
										// өөрөө эзэмшээгүй  бөгөөд худалдаанд гаргасан үе
										<ColorfullBtn
											text={`${purchaseWorksI18}`}
											onClick={handleOrderPaymentPre}
										/>
									) : (
										// өөрөө эзэмшээгүй  бөгөөд худалдаанд гаргаагүй үе
										!artDetail?.adDrop && artDetail?.isAd === true ?
											<UnActiveBtn
												onClick={() => push("/events")}
												text={gotoFindWorksI18}
											/>
											:
											<UnActiveBtn
												onClick={handleBuyRequest}
												text={notAvailableI18}
											/>
									)
								}
							</div>
						</>
					)}
					{isAuction() ? (
						<div className="pt-[5px] pb-4 w-full">
							{isEvent() ? (
								<EventDetailTab isEvent={isEvent()} />
							) : (
								<ArtDetailTab />
							)}
						</div>
					) : (
						<div className="pt-[5px] pb-4 w-full">
							{isEvent() ? (
								<EventDetailTab isEvent={isEvent()} />
							) : (
								<div className="">
									<div className="sm:pt-[36px] sm:pb-[30px] py-[30px] w-full text-[#333] ">
										<h3 className="font-[500] lg:text-[18px] text-[14px] text-[#DDD]">
											{certifiedWorkI18}
										</h3>
										<ul className="detail text-[15px] text-[#DDD] font-[400] pt-[15px]">
											{artDetail?.tamtamApproved && (
												<li className="bg-[#111111] sm:border-[0.5px] border-[0.4px] sm:border-[#C5C8D2] border-[#424242] sm:rounded-[50px] rounded-[40px]">
													<Image src={star} alt="star" width={18} height={18} />
													<span className="mx-1 lg:text-[15px] sm:text-[15px] text-[12px] text-[#DDD]">
														{tamtamWriterI18}
													</span>
												</li>
											)}
											{artDetail?.copyrightRegistered && (
												<li className="bg-[#111111] sm:border-[0.5px] border-[0.4px] sm:border-[#C5C8D2] border-[#424242] sm:rounded-[50px] rounded-[40px]">
													<Image src={pink} alt="pink" width={18} height={18} />
													<span className="mx-1 lg:text-[15px] sm:text-[15px] text-[12px] text-[#DDD]">
														{copyrightedWorkI18}
													</span>
												</li>
											)}
											{artDetail?.isVerified && artDetail?.exposeVerify && (
												<li className="bg-[#111111] sm:border-[0.5px] border-[0.4px] sm:border-[#C5C8D2] border-[#424242] sm:rounded-[50px] rounded-[40px]" onClick={informationHandler}>
													<Image src={verified} alt="verified" width={18} height={18} />
													<span className="mx-1 lg:text-[15px] sm:text-[15px] text-[12px] text-[#DDD]">
														{verificationCertificateI18}
													</span>
												</li>
											)}
										</ul>
									</div>
									<h3 className="font-[500] lg:text-[18px] text-[14px] mb-4 text-[#DDD]">
										{licenceAvailableI18}
									</h3>
									<ul className="license flex items-center flex-wrap gap-2">
										{artDetail?.rights.length > 0 ? (
											calcRightList()
										) : (
											<p className="mt-4 text-lg text-gray-600">
												{unableToApllyI18}
											</p>
										)}
									</ul>
								</div>
							)}
						</div>

					)}
					{!isEvent() && (
						<div className="mt-[20px] w-full gap-2 ">
							{!isLoggedIn() ? (
								<BlueBtn text={`${licenseAppI18}`} onClick={() => handleShowModal(MODAL_TYPES.LOGIN_POPUP)} />
							) : (
								<>
									{isOwnCreatedArtwork() ? (
										<BlueBtn
											text={`${licenseTknTradeRegI18}`}
											onClick={handleRegisterLicense}
										/>
									) : artDetail?.marketStatus !== "MARKET_DENIED" ? (
										artDetail?.rights.length > 0 ? (
											<BlueBtn
												text={`${licenseAppI18}`}
												onClick={handleGotoLicenseRequest}
											/>
										) : (
											<BlueBtn text={unableToApllyI18} onClick={() => { }} />
										)
									) : (
										<BlueBtn text={unableToApllyI18} onClick={() => { }} />
									)}
								</>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default MainInfo;
