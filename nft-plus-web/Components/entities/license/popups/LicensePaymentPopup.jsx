/**
 * @createdBy duka
 */
import React, { useEffect, useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupHeader from 'Components/ui/popup/popupMaterials/PopupHeader';
import usePopup from 'Components/ui/popup/usePopup';
import useMyPageTranslation from 'locale/useMypageTranslation';
import useAlertTranslation from 'locale/useAlertTranslation';
import useWallet from "common/metamask/useWallet";
import { useGlobalContext } from 'common/global/useGlobalContext';
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';
import { LicenseRow } from './licensePopupUi/LicenseRow';
import H2 from 'Components/ui/typography/H2';
import P from 'Components/ui/typography/P';
import { LicenseSubRow } from './licensePopupUi/LicenseRow';
import useArtworkTranslation from 'locale/useArtworkTranslation';
import LicenseRightBtn from 'Components/ui/button/LicenseRightBtn';
import useLicense from '../useLicense';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import { useCountdown } from 'utils/useCount';
import useTradeEyes from 'common/metamask/eyes/useTradeEyes';
import useTradeMatic from 'common/metamask/matic/useTradeMatic';
import useMetaNetwork from 'common/metamask/useMetaNetwork';
import useCurrency from 'common/metamask/useCurrency';
import { useRouter } from 'next/router';
import Image from 'next/image';
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from './licensePopupUi/LicenseCol';
import useFee from 'Components/entities/artwork/useFee';
import MobileLicensePaymentPopup from './MobileLicensePaymentPopup';

function LicensePaymentPopup() {
	const { browserWindow } = useGlobalContext()
	const {
		layerTitleI18,
		cancelI18,
		confirmContractI18,
		paymentI18,
		purpose_to_useI18,
		worknameI18,
		contractDetailsI18,
		applicantI18,
		corparateNameI18,
		addressI18,
		contactI18,
		contractualRightsI18,
		licensePeriodI18,
		license_payoutI18,
		sumI18,
		paymentTimingI18,
		contractAmoutI18,
		lisenceAgreementFeeI18
	} = useMyPageTranslation();
	const {
		notOwnTokensInWalletAddressI18,
		registerYourWalletI18
	} = useAlertTranslation()
	const { requesterNameI18 } = useArtworkTranslation()
	const {
		selectPaymentMethod: selectPaymentMethodI18,
		dayfromcontractCompletionI18
	} = useArtworkTranslation()
	const { walletIsMatch } = useWallet();
	const { globalItems, setGlobalLoading } = useGlobalContext()
	const { eyeLicenseHelperAPI } = useLicense()
	const { tradeLicenseWithEyes } = useTradeEyes()
	const { tradeLicenseHandler } = useTradeMatic()
	const { push } = useRouter()
	const {
		hideModal,
		MODAL_TYPES,
		handleShowModal,
		setGlobalModalState,
		globalModalState,
		getCurrentModalprops,
	} = usePopup();
	const pendingLicense = globalModalState?.license
	const [days, hours, minutes, seconds] = useCountdown(pendingLicense?.paymentDeadLine)
	const { getNetwork } = useMetaNetwork()
	const { toWei } = useCurrency()
	const { getFee } = useFee()
	const [fee, setFee] = useState(0)

	async function handleLicensePayment() {
		setGlobalLoading(true)
		try {
			const { id, artworkId, paymentAmount, walletAddress } = pendingLicense
			const price = toWei(pendingLicense?.paymentAmount)
			const { isMatchWallet, currentMetaWallet } = await walletIsMatch()
			if (!isMatchWallet) {
				alert(registerYourWalletI18)
				return
			}
			if (!currentMetaWallet) {
				alert(notOwnTokensInWalletAddressI18);
				return
			}
			const currentNetworkId = await getNetwork()

			const chainId = pendingLicense?.artworkCurrency === "EYES" ? process.env.ETH_CHAIN_ID : process.env.MATIC_CHAIN_ID;
			if (currentNetworkId !== chainId) {
				if (pendingLicense?.artworkCurrency === "EYES") {
					handleShowModal(MODAL_TYPES.SWITCHETHERIUMNET);
				} else {
					handleShowModal(MODAL_TYPES.SWITCHMAINNET);
				}
				return;
			}

			if (pendingLicense?.artworkCurrency === "EYES") {
				const licenseId = id.toString();
				const workId = artworkId.toString();

				const { txHash, seller, failure } = await tradeLicenseWithEyes(
					licenseId,
					workId,
					walletAddress,
					price
				)
				if (failure) {
					alert(failure)
					return
				}

				const formData = {
					txHash: txHash,
					licenseId: id.toString(),
					workId: artworkId.toString(),
					buyer: currentMetaWallet,
					seller: walletAddress,
					price: price
				};
				const helperApi = await eyeLicenseHelperAPI(formData)
				if (helperApi === 'success') {
					// const res = await buyLicense({ licenseRequestId: pendingLicense.id })
					globalModalState?.changeSubtab(1)
					handleShowModal(MODAL_TYPES.LICENSE_PAYMENT_COMPLETED)
					setTimeout(() => {
						push("/mypage?subpage=licenseAgreement&extrasubpage=completed-contracts")
					}, [500])
				}
				return
			}
			if (pendingLicense?.artworkCurrency === "MATIC") {
				const { contractHash, result, failure } = await tradeLicenseHandler(id, artworkId, paymentAmount, walletAddress)
				if (failure) {
					alert(failure)
					return
				}
				//	await buyLicense({ licenseRequestId: pendingLicense.id })
				globalModalState?.changeSubtab(1)
				setTimeout(() => {
					push("/mypage?subpage=licenseAgreement&extrasubpage=completed-contracts")
				}, [500])
				handleShowModal(MODAL_TYPES.LICENSE_PAYMENT_COMPLETED)
			}
		} catch (e) {
			console.error(e)
		} finally {
			setGlobalLoading(false)
		}
	}

	function showLicenseCheckContractPopup() {
		handleShowModal(MODAL_TYPES.LICENSE_CHECK_CONTRACT2)
		setGlobalModalState(prev => ({
			...prev,
			noActionsButtons: true
		}))
	}

	const targetDate = new Date(pendingLicense?.paymentDeadLine); // Replace this with your target date
	const calculateTimeRemaining = () => {
		const currentTime = new Date();
		const timeRemaining = targetDate.getTime() - currentTime.getTime();
		// Calculate days, hours, minutes, and seconds remaining
		const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

		return { days, hours, minutes, seconds };
	};

	const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeRemaining(calculateTimeRemaining());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		async function getLicenseFee(currency) {
			const { result, failure } = await getFee('LICENSE_ISSUANCE', currency);
			if (failure) {
				if (failure !== 'switchnetwork') {
					alert(failure);
				}
				return;
			}
			setFee(result);
		}
		if (globalModalState?.license) {
			getLicenseFee(globalModalState?.license?.artworkCurrency)
		}
	}, [globalModalState.license]);

	return (
		<>
			{
				browserWindow.innerWidth > 600 ?
					<MainPopup minWidth={360} maxWidth={1145}>
						<PopupContainer>
							<PopupHeader text={layerTitleI18} />
							<PopupContent>
								<div className="w-full sm:pt-[50px] pt-[35px] pb-[50px]">
									<LicenseContainer>
										<LicenseFirstCol>
											<ArtworkFileViewer
												artwork={pendingLicense}
												square
											/>
											<div className="flex justify-between mt-[44px] border-t border-t-[#DDD] border-b border-b-[#4E4E4E] py-[15px]">
												<span>{selectPaymentMethodI18}</span>
												<div className='flex flex-row gap-2'>
													<div className="relative flex items-center justify-center">
														<Image
															width={14}
															height={14}
															src={globalItems?.artDetail?.currency === "EYES" ? eyesicon : matic_logo}
															alt={globalItems?.artDetail?.currency}
														/>
													</div>
													<span>{pendingLicense?.artworkCurrency}</span>
												</div>
											</div>
										</LicenseFirstCol>
										<LicenseSecondCol>
											<LicenseBigTitle text={contractDetailsI18} />
											<LicenseRow>
												<div className="w-1/5">
													<H2>{worknameI18}</H2>
												</div>
												<div className="w-4/5">
													<P>{pendingLicense?.artworkName}</P>
												</div>
											</LicenseRow>
											<LicenseRow>
												<div className="w-1/5">
													<H2>
														저작자 및<br />
														저작권 이용허락자
														{/* {author_and_copyright_licenserI18} */}
													</H2>
												</div>
												<div className="w-4/5">
													<P>{pendingLicense?.artworkOwnerFullname}</P>
												</div>
											</LicenseRow>
											<LicenseRow>
												<div className="w-1/5">
													<H2>{requesterNameI18}</H2>
												</div>
												<div className="w-4/5">
													<P>{pendingLicense?.buyerFullname}</P>
												</div>
											</LicenseRow>
											<LicenseRow>
												<div className="w-1/5">
													<H2>{applicantI18}</H2>
												</div>
												<div className="w-4/5">
													<LicenseSubRow>
														<div className="w-[20%]">
															<H2>{corparateNameI18}</H2>
														</div>
														<div className="w-[80%]">
															<p>{pendingLicense?.applicantAddress}</p>
														</div>
													</LicenseSubRow>
													<LicenseSubRow>
														<div className="w-1/5">
															<H2>{addressI18}</H2>
														</div>
														<div className="w-4/5">
															<p>{pendingLicense?.applicantContact}</p>
														</div>
													</LicenseSubRow>
													<LicenseSubRow>
														<div className="w-1/5">
															<H2>{contactI18}</H2>
														</div>
														<div className="w-4/5">
															<p>{pendingLicense?.applicantName}</p>
														</div>
													</LicenseSubRow>
												</div>
											</LicenseRow>
											<LicenseRow>
												<div className="w-1/5">
													<H2>{contractualRightsI18}</H2>
												</div>
												<div className="w-4/5">
													<div className="flex gap-3 flex-wrap">
														{
															pendingLicense?.rights?.length > 0 &&
															pendingLicense?.rights?.map((right, idx) => (
																<LicenseRightBtn key={'right-' + idx} text={right?.code} />
															))
														}
													</div>
												</div>
											</LicenseRow>
											<LicenseRow>
												<div className="w-1/5">
													<H2>{licensePeriodI18}</H2>
												</div>
												<div className="w-4/5">
													<div className="flex items-center gap-5">
														<p>
															{pendingLicense?.permissionPeriod}
														</p>
													</div>
												</div>
											</LicenseRow>
											<LicenseRow yCenter>
												<div className="w-1/5">
													<H2>{purpose_to_useI18}</H2>
												</div>
												<div className="w-4/5">
													<p>{pendingLicense?.purpose}</p>
												</div>
											</LicenseRow>
											<div className="pt-[50px]">
												<LicenseBigTitle text={contractAmoutI18} />
											</div>
											<LicenseRow yCenter>
												<div className="w-1/5">
													<H2>{license_payoutI18}</H2>
												</div>
												<div className="w-4/5">
													<div className="flex gap-2 items-center">
														<div className='flex items-center gap-2'>
															<p>{pendingLicense?.paymentAmount}</p>
															<p>{pendingLicense?.artworkCurrency} </p>
														</div>
														<span className='text-[#B0B0B0] text-[14px] mt-[2px]'>
															({sumI18})
														</span>
													</div>
												</div>
											</LicenseRow>
											<LicenseRow yCenter>
												<div className="w-1/5">
													<H2>{paymentTimingI18}</H2>
												</div>
												<div className="w-4/5">
													<div className='flex gap-[10px]'>
														<p className="text-[#CF6081]">
															{dayfromcontractCompletionI18}
														</p>
														<p>
															{`Time remaining ${timeRemaining?.hours}:${timeRemaining?.minutes}:${timeRemaining?.seconds}`}
														</p>
													</div>
												</div>
											</LicenseRow>
											<LicenseRow yCenter>
												<div className="w-1/5 min-w-[150px]">
													<H2>{lisenceAgreementFeeI18}</H2>
												</div>
												<div className="w-4/5 flex gap-[4px]">
													<p className="text-[#FFF] sm:text-[16px] text-[14px] font-[400]">
														{pendingLicense?.paymentAmount ? ((fee / 100) * pendingLicense?.paymentAmount).toFixed(2) : 0} {pendingLicense?.artworkCurrency}
													</p>
													<p className="text-[#B0B0B0] sm:text-[16px] text-[14px] font-[400]">
														({fee}%)
													</p>
												</div>
											</LicenseRow>
										</LicenseSecondCol>
									</LicenseContainer>
								</div>
							</PopupContent>
							{/* <PopupActionButtons 
					yes={ showCheckConfirmContractPopup } 
					no={ () => hideModal() } 
					btnTexts={ { no: cancelI18, yes: confirmContractI18 } } 
				/> */}
							<div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px]">
								<button className="max-w-[107px] w-full bg-[#333] text-white py-[6px] text-center rounded-[5px] cursor-pointer" onClick={() => hideModal()}>
									<h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">{cancelI18}</h4>
								</button>
								<button className="max-w-[107px] w-full bg-[#6319FF] cursor-pointer text-white py-[6px] focus:outline-none text-center rounded-[5px]" onClick={showLicenseCheckContractPopup}>
									<h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">{confirmContractI18}</h4>
								</button>
								<button className="max-w-[107px] w-full bg-[#FB3873] cursor-pointer text-white py-[6px] focus:outline-none text-center rounded-[5px]" onClick={handleLicensePayment}>
									<h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">{paymentI18}</h4>
								</button>
							</div>
						</PopupContainer>
					</MainPopup>
					:
					<MobileLicensePaymentPopup />
			}
		</>

	)
}

export default LicensePaymentPopup;