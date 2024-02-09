/**
 * @createdBy duka
 */
import React from 'react'
import MainPopup from 'Components/ui/popup/MainPopup';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupActionButtons from 'Components/ui/popup/popupMaterials/PopupActionButtons';
import usePopup from 'Components/ui/popup/usePopup';
import useMyPageTranslation from 'locale/useMypageTranslation';
import { useGlobalContext } from 'common/global/useGlobalContext';
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';
import { LicenseRow } from './licensePopupUi/LicenseRow';
import H2 from 'Components/ui/typography/H2';
import P from 'Components/ui/typography/P';
import { LicenseSubRow } from './licensePopupUi/LicenseRow';
import useArtworkTranslation from 'locale/useArtworkTranslation';
import LicenseRightBtn from 'Components/ui/button/LicenseRightBtn';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import Image from 'next/image';
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import MobileLicenseExpritionPopup from './MobileLicenseExpritionPopup';

function LicenseExpritionPopup() {
	const { browserWindow } = useGlobalContext()
	const {
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
		confirmI18,
		closeI18,
		copyright_userI18,
		copyrightLicensorI18
	} = useMyPageTranslation();
	const { requesterNameI18, paymentPeriodHasEndedI18 } = useArtworkTranslation()
	const {
		selectPaymentMethod: selectPaymentMethodI18,
		dayfromcontractCompletionI18
	} = useArtworkTranslation()
	const { globalItems, authUser } = useGlobalContext()
	const { globalModalState, hideModal } = usePopup();
	const pendingLicense = globalModalState?.license

	return (
		<>
			{
				browserWindow.innerWidth > 600 ?
					<MainPopup>
						{/* <LicensePopupTable /> */}
						<PopupContainer>
							<div className="w-full sm:pt-[50px] pt-[35px] pb-[50px]">
								<div className="flex gap-[30px] w-full">
									<div className="flex flex-col gap-4 w-[25%]">
										<ArtworkFileViewer artwork={pendingLicense} />
										<div className="flex justify-between mt-[44px] border-t border-t-[#DDD] border-b border-b-[#4E4E4E] py-[15px]">
											<span>{selectPaymentMethodI18}</span>
											<div className='flex flex-row gap-2'>
												<div className="relative flex items-center justify-center">
													<Image
														width={14}
														height={14}
														src={globalItems?.artDetail?.currency === "EYES" ? eyesicon : matic_logo}
														alt="artDetail-currency"
													/>
												</div>
												<span>{pendingLicense?.artworkCurrency}</span>
											</div>
										</div>
									</div>
									<div className="w-[75%]">
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
													{copyright_userI18}<br />
													{copyrightLicensorI18}
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
													<p className="text-[#CF6081] text-[16px]">
														{paymentPeriodHasEndedI18}.
													</p>
												</div>
											</div>
										</LicenseRow>
									</div>
								</div>
							</div>
							<PopupActionButtons
								yes={() => hideModal()}
								no={() => hideModal()}
								btnTexts={{ yes: confirmI18, no: closeI18 }}
							/>
						</PopupContainer>
					</MainPopup>
					:
					<MobileLicenseExpritionPopup />
			}
		</>

	)
}

export default LicenseExpritionPopup;