/**
 * @createdBy duka
 */
import React, { useEffect, useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupHeader from 'Components/ui/popup/popupMaterials/PopupHeader';
import PopupActionButtons from 'Components/ui/popup/popupMaterials/PopupActionButtons';
import usePopup from 'Components/ui/popup/usePopup';
import useMyPageTranslation from 'locale/useMypageTranslation';
import useAlertTranslation from 'locale/useAlertTranslation';
import useWallet from "common/metamask/useWallet";
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';
import { LicenseRow } from './licensePopupUi/LicenseRow';
import H2 from 'Components/ui/typography/H2';
import P from 'Components/ui/typography/P';
import { LicenseSubRow } from './licensePopupUi/LicenseRow';
import useArtworkTranslation from 'locale/useArtworkTranslation';
import LicenseRightBtn from 'Components/ui/button/LicenseRightBtn';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from './licensePopupUi/LicenseCol';
import useFee from 'Components/entities/artwork/useFee';
import MobileLicenseCheckPopup from './MobileLicenseCheckPopup';
import useCommonTranslation from 'locale/useCommonTranslation';
import { useGlobalContext } from 'common/global/useGlobalContext';

function LicenseCheckPopup() {
	const { browserWindow } = useGlobalContext()
	const {
		hideModal,
		MODAL_TYPES,
		handleShowModal,
		globalModalState,
	} = usePopup();
	const {
		layerTitleI18,
		confirmContractI18,
		contractApproval24hoursI18,
		paymentTimingI18,
		contractAmoutI18,
		lisenceAgreementFeeI18,
		method_paymentI18,
		worknameI18,
		attribution_andI18,
		copyrightLicensorI18,
		applicantI18,
		addressI18,
		contactI18,
		contractualRightsI18,
		licensePeriodI18,
		purpose_to_useI18,
		sumI18
	} = useMyPageTranslation();
	const {
		notOwnTokensInWalletAddressI18,
		registerYourWalletI18
	} = useAlertTranslation()
	const {
		requesterNameI18,
		corparateNameI18
	} = useCommonTranslation()
	const { cancel: cancelI18 } = useArtworkTranslation()
	const { walletIsMatch } = useWallet();
	const pendingLicense = globalModalState.license
	const { getFee } = useFee()
	const [fee, setFee] = useState(0)

	const showCheckConfirmContractPopup = async () => {
		const { isMatchWallet, currentMetaWallet } = await walletIsMatch()
		if (!isMatchWallet) {
			alert(registerYourWalletI18)
			return
		}
		if (currentMetaWallet) {
			handleShowModal(MODAL_TYPES.LICENSE_CHECK_CONFIRM_CONTRACT)
		} else {
			alert(notOwnTokensInWalletAddressI18);
		}
		handleShowModal(MODAL_TYPES.LICENSE_CHECK_CONFIRM_CONTRACT)
	}

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

	console.log(pendingLicense)
	return (
		<>
			{
				browserWindow.innerWidth > 600 ?
					<div className='hidden sm:flex sm:flex-col overflow-hidden'>
						<MainPopup minWidth={360} width={1145} maxWidth={1145}>
							<PopupContainer>
								<PopupHeader text={layerTitleI18} />
								<PopupContent>
									<div className="w-full sm:pt-[50px] pt-[35px] pb-[50px]">
										<LicenseContainer>
											<LicenseFirstCol>
											<div className="h-[265px] w-[265px]">
												<ArtworkFileViewer
													artwork={pendingLicense} 
													square
													width={265}
													height={265}
												/>
										
												</div>
												<div className="flex w-full justify-between border-y border-[#DDD]">
													<span>{method_paymentI18}</span>
													<span>{pendingLicense?.artworkCurrency}</span>
												</div>
											</LicenseFirstCol>
											<LicenseSecondCol>
												<LicenseBigTitle text={"계약 내용"} />
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
															{attribution_andI18} <br />
															{copyrightLicensorI18}
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
															<div className="w-1/5">
																<H2>{corparateNameI18}</H2>
															</div>
															<div className="w-4/5">
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
														<div className="flex gap-1 flex-wrap">
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
													<LicenseBigTitle text={"계약 금액"} />
												</div>
												<LicenseRow yCenter>
													<div className="w-1/5">
														<H2>{contractAmoutI18}</H2>
													</div>
													<div className="w-4/5">
														<div className="flex gap-2 items-center">
															<p>{pendingLicense?.paymentAmount}</p>
															<p>{pendingLicense?.artworkCurrency} <span className='text-[#B0B0B0] text-[14px]'>({sumI18})</span></p>
														</div>
													</div>
												</LicenseRow>
												<LicenseRow yCenter>
													<div className="w-1/5">
														<H2>{paymentTimingI18}</H2>
													</div>
													<div className="w-4/5">
														<p className="text-[#CF6081]">
															{contractApproval24hoursI18}
														</p>
													</div>
												</LicenseRow>
												<LicenseRow yCenter>
													<div className="w-1/5 min-w-[150px]">
														<H2>{lisenceAgreementFeeI18}</H2>
													</div>
													<div className="w-4/5 flex gap-[4px]">
														<p className="text-[#FFF] sm:text-[16px] text-[14px]font-[400]">
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
								<PopupActionButtons
									yes={showCheckConfirmContractPopup}
									no={() => hideModal()}
									btnTexts={{ no: cancelI18, yes: confirmContractI18 }}
								/>
							</PopupContainer>
						</MainPopup>
					</div>
					:
					<MobileLicenseCheckPopup />
			}
		</>
	)
}

export default LicenseCheckPopup;