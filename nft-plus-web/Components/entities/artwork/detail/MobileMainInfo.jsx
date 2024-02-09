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
	LighterDarkBtn,
	UnActiveBtn
} from "Components/ui/button/colorfullBtn";
import { useGlobalContext } from "common/global/useGlobalContext";
import MobileAuction from "./MobileAuction";
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
import MobileIconBtn from "Components/entities/events/detail/MobileIconBtn";
import EventDetailTab from "./eventDetailTab/EventDetailTab";
import MainInfoSkeleton from "./MainInfoSkeleton";
import MobileMainInfoHeartBtn from "./MobileMainInfoHeartBtn";
import Web3 from "web3";

function MobileMainInfo({ id, init }) {
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
		changePriceCancelI18,
		licenseTknTradeRegI18,
		purchaseWorksI18,
		salesRegistrationI18,
		projectNameI18,
		bidButtonI18,
		upComingAuctionI18,
		sellingPriceI18,
		fixedPriceBtnI18,
		unDiscoveredWorksI18,
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
	const [bids, setBids] = useState("");
	const { activeWallets, setGlobalLoading, globalItems } = useGlobalContext();
	const {
		artDetail,
		setArtDetail,
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
		isEvent,
		isVM
	} = useArtDetail();

	const { getArtRights, artworkRights, getArtworkUpdate } = useArtwork();
	const { isLoggedIn } = useCheckUser();
	const { toEthers, toWon, checkCurrencyIco, excreptWon } = useCurrency();
	const { walletIsMatch } = useWallet();
	const { getNetwork } = useMetaNetwork();
	const { unlistHandler } = useTradeMatic();
	const { approveToken } = useApproveEyes();
	const [convertedWon, setConvertedWon] = useState(null);

	const checkIsUserLogedIn = () => {
		if (!authUser) {
			handleShowModal(MODAL_TYPES.GO_TO_LOGIN);
		} else {
			handleShowModal(MODAL_TYPES.CREATE_BIDS, {
				setBids,
				title: artDetail?.artworkName,
				price: Web3.utils.fromWei(artDetail?.auction.price.toString(), "ether"),
				currency: artDetail.currency,
				fileType: artDetail.fileType,
				creator_avatar: artDetail?.authorProfileImg,
				creator: artDetail?.authorName,
				thumbnail_url: artDetail?.thumbnailUrl2x,
				wei: artDetail?.auction.price,
				imageUrl: artDetail?.imageUrl,
				auction: artDetail?.auction,
				id: artDetail?.id,
				isAuction: artDetail?.isAuction,
				tamtamApproved: artDetail?.tamtamApproved
			});
			setGlobalModalState(prev => ({ ...prev, getArtDetail: (e) => getArtDetail(e) }))

		}
	};

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

	function updateArtDetailPrice(changedPrice) {
		setArtDetail(prev => ({
			...prev,
			price: changedPrice
		}))
	}

	function stopArtDetailPrice(cancelArtwork) {
		setArtDetail(prev => ({
			...prev,
			type: cancelArtwork
		}))
	}

	function handleChangePriceCancel() {
		handleShowModal(MODAL_TYPES.CHANGECANCELPRICE, {
			artwork: artDetail,
			fetchArtDetail: () => getArtDetail(artDetail?.id)
		});
		setGlobalModalState((prev) => ({
			...prev,
			artDetail: artDetail,
			updateArtDetailPrice,
			stopArtDetailPrice
		}));
	}

	function handleChangePriceAuctionCancel() {
		handleShowModal(MODAL_TYPES.CHANGECANCELPRICEAUCTION, {
			artwork: artDetail,
			fetchArtDetail: () => getArtDetail(artDetail?.id)
		});
		setGlobalModalState((prev) => ({
			...prev,
			artDetail: artDetail
		}));
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
		handleShowModal(MODAL_TYPES.MOBILE_LICENSE_REQUEST1)
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
			<div className="sm:hidden">
				<div className="artDetail w-full h-full overflow-hidden relative bg-[#252525] p-[15px] border border-[#252525] rounded-[5px]">
					{isAuction() ? (
						<div className="flex flex-col">
							<div className={`w-full`}>
								<div className="flex flex-col">
									<div>
										{artDetail?.isAuction && artDetail?.auction && (
											<Mark auction={artDetail?.auction} mini />
										)}
									</div>
									<div className="flex flex-row justify-between mt-[30px]">
										<div className="flex">
											<h5 className="text-[18px] text-[#fff] font-[500] w-full md:w-auto">
												{artDetail?.artworkName}
											</h5>
										</div>
										<MobileIconBtn
											hearted={artDetail?.hearted}
											heartCount={artDetail?.heartCount}
										/>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="flex justify-between">
							<div className="flex flex-col">
								{artDetail?.isAd &&
									<div className="sm:text-[16px] text-[13px] text-[#A6A6A6] font-[400] mb-[5px]">
										<span>{projectNameI18}</span>
									</div>
								}
								<div className="w-full text-[#333] ">
									<h5 className="font-[500] text-[18px] text-[#FFF]">
										{artDetail?.artworkName}
									</h5>
								</div>
							</div>
							<MobileIconBtn
								hearted={artDetail?.hearted}
								heartCount={artDetail?.heartCount}
							/>
						</div>
					)}
					<div className="w-full flex flex-row lg:gap-[60px] gap-[34px] items-center lg:mt-[22px] sm:mt-[22px] mt-[40px]">
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
							<MobileAuction />
						) : (
							<>
								<div className="w-full">
									<p className="text-[#fff] font-[400] mb-[5px] text-[14px] lg:mt-[74px] sm:mt-[40px] mt-[30px]">
										{priceI18}
									</p>
									<div className="flex items-start md:items-center justify-between flex-col md:flex-row">
										{isMarket() ? (
											<div className="flex items-start justify-between w-full">
												<div className="flex items-center gap-[5px]">
													<span className="flex justify-center w-[14.72px] h-[14.72px]">
														{checkCurrencyIco(artDetail?.currency)}
													</span>
													<p className="text-[#fff] text-[16px] font-bold">
														{toEthers(artDetail?.price)}{" "}
														{artDetail?.currency === "EYES" ? "EYES" : "MATIC"}
													</p>
												</div>
												<div className="flex flex-col items-end ">
													<div className="flex flex-row">
														<p className="font-[400] text-[#888] tracking-[-1px] text-[12px] ">
															{createrRoyalty}
														</p>{" "}
														<span className="font-[400] text-[#888] tracking-[-1px] text-[12px] ">
															{artDetail?.royalty} %
														</span>
													</div>
													<div className="flex items-center text-[#505050] text-[14px] font-[400]">
														<FaWonSign />
														<p className="text-[12px] font-normal text-[#505050]">
															{excreptWon(convertedWon)}
														</p>
													</div>
												</div>
											</div>
										) : (
											<div className="flex gap-2 items-center">
												<p className="text-[#888] lg:text-[22px] sm:text-[20px] text-[16px]">
													{isOwnedArtork()
														? isMarket()
															? ""
															: sellingPriceI18
														: !artDetail?.adDrop && artDetail?.isAd === true ? unDiscoveredWorksI18 : unRegisteredWorksI18}
												</p>
											</div>
										)}
										{/* {isMarket() ? (
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
										)} */}
									</div>
								</div>
							</>
						)}

					</div>
					{!isVM() &&
						<div className="pt-[5px] pb-4 w-full">
							{isEvent() ? (
								<EventDetailTab isEvent={isEvent()} />
							) : (
								<div className="">
									<div className="lg:py-[36px] py-[30px] w-full text-[#333] ">
										<h5 className="font-[500] lg:text-[18px] text-[14px] text-[#fff]">
											{certifiedWorkI18}
										</h5>
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
									<h5 className="font-[500] lg:text-[18px] text-[14px] mb-4 text-[#fff]">
										{licenceAvailableI18}
									</h5>
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
					}
				</div>
				<div className="flex flex-row w-full bg-[#161717] border-t border-t-[#404040] overflow-hidden fixed z-[100] bottom-0 gap-[17.81px]">
					<MobileMainInfoHeartBtn hearted={artDetail?.hearted} heartCount={artDetail?.heartCount} />
					<div className="flex-1 pr-[16px] pt-[14px] pb-[34px] flex flex-row gap-[8px]">
						{!isEvent() && (
							<div className="w-full gap-2">
								{!isLoggedIn() ? (
									<div className="flex flex-row gap-2">
										<div className="min-w-[141px] w-full">
											<BlueBtn text={`${licenseAppI18}`} height="42px" onClick={() => handleShowModal(MODAL_TYPES.LOGIN_POPUP)} />
										</div>
									</div>
								) : (
									<>
										{isOwnCreatedArtwork() ? (
											<div className="min-w-[141px] w-full">
												<BlueBtn
													text={`${licenseTknTradeRegI18}`}
													onClick={handleRegisterLicense}
												/>
											</div>
										) : artDetail?.marketStatus !== "MARKET_DENIED" ? (
											artDetail?.rights.length > 0 ? (
												<div className="min-w-[141px] w-full">
													<BlueBtn
														text={`${licenseAppI18}`}
														height="42px"
														onClick={handleGotoLicenseRequest}
													/>
												</div>
											) : (
												<div className="min-w-[141px] w-full">
													<BlueBtn text={unableToApllyI18} onClick={() => { }} />
												</div>
											)
										) : (
											<div className="min-w-[141px] w-full">
												<BlueBtn text={unableToApllyI18} onClick={() => { }} />
											</div>
										)}
									</>
								)}
							</div>
						)}
						{
							// худалдаанд гаргасан бөгөөд уг art - ийг өөрөө эзэмшиж буй үе
							isOwnedArtork() ? (
								isMarket() ? (
									// өөрөө эзэмшиж буй бөгөөд худалдаанд гаргасан буюу үнэ оруулсан үе
									isAuction() ? (
										<>
											<div className="sm:hidden min-w-[141px} w-full">
												<ColorfullBtn
													text={changePriceCancelI18}
													onClick={handleChangePriceAuctionCancel}
												/>
											</div>
											<div className="gap-2 hidden sm:block">
												<ColorfullBtn
													text={editSellPriceI18}
													onClick={handleChangePrice}
												/>
												<ColorOutlineBtn
													text={stop_sellingI18}
													onClick={handleCancelListing}
												/>
											</div>
										</>
									) : (
										<>
											<div className="sm:hidden min-w-[141px} w-full">
												<ColorfullBtn
													text={fixedPriceBtnI18}
													onClick={handleChangePriceCancel}
												/>
											</div>
											<div className="gap-2 hidden sm:block">
												<ColorfullBtn
													text={editSellPriceI18}
													onClick={handleChangePrice}
												/>
												<ColorOutlineBtn
													text={stop_sellingI18}
													onClick={handleCancelListing}
												/>
											</div>
										</>
									)
								) : (
									// өөрөө эзэмшиж буй бөгөөд худалдаанд гаргаагүй буюу үнэ оруулаагүй үе
									<>
										<div className="sm:hidden min-w-[141px} w-full">
											<ColorfullBtn
												text={salesRegistrationI18}
												onClick={() => push("/art/sellart-for-marketplace/" + artDetail?.id)}
											/>
										</div>
										<div className="gap-2 hidden sm:block">
											<ColorfullBtn
												text={editSellPriceI18}
												onClick={() => push("/art/sellart-for-marketplace/" + artDetail?.id)}
											/>
											<ColorOutlineBtn
												text={stop_sellingI18}
												onClick={handleCancelListing}
											/>
										</div>
									</>
								)
							) : isMarket() ? (
								// өөрөө эзэмшээгүй  бөгөөд худалдаанд гаргасан үе
								<div className="min-w-[141px] w-full">
									{/*<ColorfullBtn
										text={`${purchaseWorksI18}`}
										onClick={handleOrderPaymentPre}
							/>*/}
									{init ? (
										<div className="w-full h-16 flex gap-2">
											<div className="w-full h-[47px] rounded-md bg-gray-700 animate-pulse" />
										</div>
									) : authUser?.id === artDetail?.ownerId ? (
										<>
											{artDetail?.auction?.status === "ONGOING" && (
												<button
													disabled
													type="button"
													className={`detailBtn w-full sm:h-[47px] h-[42px] bg-[#616161] text-white rounded-md py-2 px-4`}>
													<p className="font-[500  ] text-white sm:text-[19px] text-[15px]">{auctionInProgressI18}</p>
												</button>
											)}
										</>
									) : (
										artDetail?.auction?.status === "ONGOING" ? (
											// <Button
											//   width="w-full bg-gradient-to-r from-[#FE8243] via-[#FF5675] to-[#FE25D5} border-none"
											//   onClick={() => checkIsUserLogedIn()}
											//   value={`${bidButtonI18}`}
											// />
											<ColorfullBtn
												text={bidButtonI18}
												onClick={() => checkIsUserLogedIn()}
											/>
										) : (isMarket() ? (
											<ColorfullBtn
												text={`${purchaseWorksI18}`}
												onClick={handleOrderPaymentPre}
											/>
										) : (
											<div className="min-w-[141px] w-full">
												<LighterDarkBtn text={`${upComingAuctionI18}`} height="42px" onClick={() => hideAllModals()} />
											</div>
										)
										)
									)}
								</div>

							) : (
								// өөрөө эзэмшээгүй  бөгөөд худалдаанд гаргаагүй үе
								<>
									<div className="min-w-[141px] w-full hidden sm:flex overflow-hidden">
										<UnActiveBtn
											onClick={handleBuyRequest}
											text={notAvailableI18}
										/>
									</div>
									{!artDetail?.adDrop && artDetail?.isAd === true ? (
										<div className="min-w-[141px] w-full sm:hidden">
											<ColorfullBtn
												onClick={() => push("/events")}
												text={gotoFindWorksI18}
											/>
										</div>
									) : (
										<div className="min-w-[141px] w-full sm:hidden">
											<ColorfullBtn
												onClick={handleBuyRequest}
												text={notAvailableI18}
											/>
										</div>
									)}
								</>

							)
						}
					</div>
				</div>
			</div>
		);
	}
}
export default MobileMainInfo;
