import React, { useEffect, useState } from "react";
import useFee from "Components/entities/artwork/useFee";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import Image from "next/image";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import { PopContainer } from "Components/ui/popup/popupUi";
import usePopup from "Components/ui/popup/usePopup";
import useMypageTranslation from "locale/useMypageTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { LicenseRow, LicenseSubRow } from "./licensePopupUi/LicenseRow";
import H2 from "Components/ui/typography/H2";
import P from "Components/ui/typography/P";
import InputDark from "Components/ui/input/InputDark";
import LicenseCheckBox from "./licensePopupUi/LicenseCheckBox";
import CustomDatePicker from "Components/ui/datepicker/CustomDatePicker";
import LicenseBigTitle from "./licensePopupUi/LicenseBigTitle";
import { useGlobalContext } from "common/global/useGlobalContext";
import useLicense from "../useLicense";
import useCurrency from "common/metamask/useCurrency";
import { dateSimplify, formattedDate } from "utils/date";
import ArtworkFileViewer from "Components/entities/artwork/ArtworkFileViewer"
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from "./licensePopupUi/LicenseCol";

function LicenseRequestPopup() {
	const {
		allRightsI18,
		apply: applyI18,
		cancel: cancelI18,
		requestTitleI18,
		requesterNameI18,
		artworkCheckLayerTitleI18
	} = useArtworkTranslation();
	const {
		worknameI18,
		contractDetailsI18,
		contractAmountI18,
		applicantLegalEntityI18,
		applicantI18,
		paymentTimingI18,
		licensePeriodI18,
		contractualRightsI18,
		addressI18,
		contactI18,
		attribution_andI18,
		copyrightLicensorI18,
		license_payoutI18,
		sumI18,
		nameI18,
		purpose_to_useI18,
		method_paymentI18,
		lisenceAgreementFeeI18
	} = useMypageTranslation();
	const { authUser } = useGlobalContext()
	const [fee, setFee] = useState(0);
	const {
		handleShowModal,
		MODAL_TYPES,
		hideModal,
		setGlobalModalState,
		globalModalState
	} = usePopup();
	const {
		sendLicenseRequest,
		licenseRequestForm,
		setLicenseRequestForm,
		initialLicenseForm
	} = useLicense();
	const { toWon } = useCurrency()
	const [convertedWon, setConvertedWon] = useState(null);
	const [formValidation, setFormValidation] = useState({
		isEnableForm: false,
		isNoFormError: true,
		allFieldsWithValues: false
	})
	const [rightLists, setRightsLists] = useState(null);
	// const [licenseRequestFeePerc, setLicenseRequestFeePerc] = useState(0);
	const { getFee } = useFee();

	const handleChangeForm = (val, name) => {
		const regexPattern = /^[0-9.-]+$/;
		const theVal = val === '' ? null : name === "applicantContact" ? regexPattern.test(val) ? val : licenseRequestForm.applicantContact.value : val;
		setLicenseRequestForm(prev => ({
			...prev,
			[name]: {
				...prev[name],
				value: theVal,
				error: !theVal ? `${name}` : null
			}
		}));
		const isNoFormError = Object.entries(licenseRequestForm).every(item => item[1].error === null)
		const allFieldsWithValues = Object.entries(licenseRequestForm).every(item => item[1].value !== null)

		setFormValidation(prev => ({
			...prev,
			isNoFormError,
			allFieldsWithValues
		}))
	};

	function handleSelectRight(idx) {
		setRightsLists(prev => {
			const chosenRight = prev[idx]
			const updatedRight = { ...chosenRight, isChecked: !chosenRight.isChecked }
			const updatedRights = [...prev]
			updatedRights[idx] = updatedRight
			return updatedRights
		})
	}
	useEffect(() => {
		const selectedRights = rightLists?.filter(right => right.isChecked === true)
		setLicenseRequestForm(prev => ({ ...prev, rights: { value: selectedRights, error: null } }))
	}, [rightLists])

	useEffect(() => {
		const isNoFormError = Object.entries(licenseRequestForm).every(item => item[1].error === null)
		const allFieldsWithValues = Object.values(licenseRequestForm).every(item => item.value !== null)
		if (isNoFormError && allFieldsWithValues) {
			setFormValidation(prev => ({ ...prev, isEnableForm: true }))
		}
		if (!isNoFormError || !allFieldsWithValues) {
			setFormValidation(prev => ({ ...prev, isEnableForm: false }))
		}
	}, [licenseRequestForm])


	async function handleSendLicenseRequest() {
		const startDate = dateSimplify(licenseRequestForm?.licenseStart?.value)
		const endDate = dateSimplify(licenseRequestForm?.licenseEnd?.value)
		try {
			const isNoFormError = Object.entries(licenseRequestForm).every(item => item[1].error === null)
			const allFieldsWithValues = Object.values(licenseRequestForm).every(item => item.value !== null)

			if (licenseRequestForm.rights.value.length === 0) {
				alert('please choose one right at least!')
				return
			}

			const theRights = licenseRequestForm.rights.value.map((right) => {
				const obj = {
					id: right.id,
					forSell: right.forSell,
					code: right.code,
					regDate: right.regDate
				}
				return obj
			})
			const data = {
				applicantName: licenseRequestForm.applicantName.value,
				applicantAddress: licenseRequestForm.applicantAddress.value,
				applicantContact: licenseRequestForm.applicantContact.value,
				artworkId: globalModalState.artDetail?.id,
				licenseStart: startDate,
				licenseEnd: endDate,
				paymentAmount: +licenseRequestForm.paymentAmount.value,
				purpose: licenseRequestForm.purpose.value,
				rights: theRights,
			}
			const res = await sendLicenseRequest(data);
			if (!res?.success) {
				console.error(`error occurs when license request action is executing: ${res?.reason?.msg}`);
				if (res.error.response.data.message === 'check.price') {
					handleShowModal(MODAL_TYPES.ALERT, { message: '결제 금액이 0보다 큽니다.' })
				}
				setLicenseRequestForm(initialLicenseForm);
				return
			}
			setGlobalModalState(prev => ({
				...prev,
				licenseRequestForm
			}))
			handleShowModal(MODAL_TYPES.LICENSE_REQUEST_COMPLETED);
		} catch (e) {
			console.error('yu bolow: ', e)
		} finally {
			setLicenseRequestForm(initialLicenseForm);
		}
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
		if (globalModalState?.artDetail) {
			getLicenseFee(globalModalState?.artDetail?.currency);

			const defaultRights = globalModalState?.artDetail?.rights?.map(right => {
				const obj = {
					...right,
					isChecked: false
				}
				return obj
			})
			setRightsLists(defaultRights)
		}
	}, [globalModalState?.artDetail]);

	useEffect(() => {
		toWon(licenseRequestForm.paymentAmount.value, globalModalState.artDetail?.currency, true)
			.then(res => setConvertedWon(res))
	}, [globalModalState.artDetail, licenseRequestForm.paymentAmount.value])

	return (
		<MainPopup datePicker minWidth={360} width={1145} maxWidth={1145}>
			<PopContainer>
				<PopupHeader text={artworkCheckLayerTitleI18} />
				<PopupContent>
					<div className="w-full sm:pt-[50px] pt-[35px] pb-[50px]">
						<LicenseContainer>
							<LicenseFirstCol>
								<div className="h-[265px] w-[265px]">
									<ArtworkFileViewer
										artwork={globalModalState?.artDetail}
										square
										width={265}
										height={265}
									/>
								</div>
								<div className="flex justify-between py-[15px] border-t border-t-[#DDD] border-b border-b-[#4E4E4E]">
									<span className="text-[#B0B0B0] text-[16px]">{method_paymentI18}</span>
									<div className="flex flex-row gap-1">
										<div className="relative flex items-center justify-center">
											<Image
												width={17}
												height={17}
												src={globalModalState?.artDetail?.currency === "EYES" ? eyesicon : matic_logo}
												alt={globalModalState?.artDetail?.currency}
											/>
										</div>
										<span className="text-white">{globalModalState?.artDetail?.currency}</span>
									</div>
								</div>
							</LicenseFirstCol>
							<LicenseSecondCol>
								<LicenseBigTitle text={contractDetailsI18} />
								<LicenseRow>
									<div className="w-1/5 min-w-[150px]">
										<H2>{worknameI18}</H2>
									</div>
									<div className="w-4/5">
										<P>{globalModalState?.artDetail?.artworkName}</P>
									</div>
								</LicenseRow>
								<LicenseRow>
									<div className="w-1/5 min-w-[150px]">
										<H2>
											{attribution_andI18}<br />
											{copyrightLicensorI18}
										</H2>
									</div>
									<div className="w-4/5">
										<P>{globalModalState?.artDetail?.authorName}</P>
									</div>
								</LicenseRow>
								<LicenseRow>
									<div className="w-1/5 min-w-[150px]">
										<H2>{requesterNameI18}</H2>
									</div>
									<div className="w-4/5">
										<P>{authUser?.nickName}</P>
									</div>
								</LicenseRow>
								<LicenseRow>
									<div className="w-1/5 min-w-[150px]">
										<H2>{applicantI18}</H2>
									</div>
									<div className="w-4/5">
										<LicenseSubRow>
											<div className="w-1/5">
												<H2>{nameI18}{applicantLegalEntityI18}</H2>
											</div>
											<div className="w-3/5">
												<InputDark
													name='applicantName'
													value={licenseRequestForm.applicantName.value}
													onChange={handleChangeForm}
													borderColor={licenseRequestForm.applicantName.error && '#FB3873'}
												/>
											</div>
										</LicenseSubRow>
										<LicenseSubRow>
											<div className="w-1/5">
												<H2>{addressI18}</H2>
											</div>
											<div className="w-3/5">
												<InputDark
													name='applicantAddress'
													value={licenseRequestForm.applicantAddress.value}
													onChange={handleChangeForm}
													borderColor={licenseRequestForm.applicantAddress.error && '#FB3873'}
												/>
											</div>
										</LicenseSubRow>
										<LicenseSubRow>
											<div className="w-1/5">
												<H2>{contactI18}</H2>
											</div>
											<div className="w-3/5">
												<InputDark
													// pattern="-?\d+(\.\d+)?" 
													// step="any"
													// type='number'
													name='applicantContact'
													value={licenseRequestForm.applicantContact.value}
													onChange={handleChangeForm}
													borderColor={licenseRequestForm.applicantContact.error && '#FB3873'}
												/>
											</div>
										</LicenseSubRow>
									</div>
								</LicenseRow>
								<LicenseRow>
									<div className="w-1/5 min-w-[150px]">
										<H2>{contractualRightsI18}</H2>
									</div>
									<div className="w-4/5">
										<div className="flex gap-3 flex-wrap max-w-[400px]">
											{
												rightLists?.length > 0 &&
												rightLists.map((right, idx) => (
													<LicenseCheckBox
														key={'check-' + idx}
														checked={right.isChecked}
														label={allRightsI18[right.code]}
														handleChange={() => handleSelectRight(idx)}
													/>
												))
											}
										</div>
									</div>
								</LicenseRow>
								<LicenseRow>
									<div className="w-1/5 min-w-[150px]">
										<H2>{licensePeriodI18}</H2>
									</div>
									<div className="w-4/5">
										<div className="flex items-center gap-5">
											<CustomDatePicker
												name="licenseStart"
												dateValue={licenseRequestForm.licenseStart.value}
												onChange={handleChangeForm}
											/>
											~
											<CustomDatePicker
												name="licenseEnd"
												dateValue={licenseRequestForm.licenseEnd.value}
												onChange={handleChangeForm}
											/>
										</div>
									</div>
								</LicenseRow>
								<LicenseRow yCenter>
									<div className="w-1/5 min-w-[150px]">
										<H2>{purpose_to_useI18}</H2>
									</div>
									<div className="w-3/5">
										<InputDark
											name='purpose'
											value={licenseRequestForm.purpose.value}
											onChange={handleChangeForm}
											borderColor={licenseRequestForm.purpose.error && '#FB3873'}
										/>
									</div>
								</LicenseRow>
								<div className="pt-[50px]">
									<LicenseBigTitle text={contractAmountI18} />
								</div>
								<LicenseRow yCenter>
									<div className="w-1/5 min-w-[150px]">
										<H2>{license_payoutI18}</H2>
									</div>
									<div className="w-4/5">
										<div className="flex gap-2 items-center">
											<div className="w-[144px]">
												<InputDark
													type="number"
													name='paymentAmount'
													value={licenseRequestForm.paymentAmount.value}
													onChange={handleChangeForm}
													borderColor={licenseRequestForm.paymentAmount.error && '#FB3873'}
												/>
											</div>
											<div className="text-[16px] text-white">
												{globalModalState?.artDetail?.currency}
											</div>
											<span className="text-[#B0B0B0] text-[14px] font-[400]">({sumI18})</span>
										</div>
									</div>
								</LicenseRow>
								<LicenseRow yCenter>
									<div className="w-1/5 min-w-[150px]">
										<H2>{paymentTimingI18}</H2>
									</div>
									<div className="w-4/5">
										<p className="text-[#CF6081] text-[16px] font-[400]">
											계약 완료 시점으로부터 1일 (24시간)
										</p>
									</div>
								</LicenseRow>
								<LicenseRow yCenter>
									<div className="w-1/5 min-w-[150px]">
										<H2>{lisenceAgreementFeeI18}</H2>
									</div>
									<div className="w-4/5 flex gap-[4px]">
										<p className="text-[#FFF] sm:text-[16px] text-[14px] font-[400]">
											{licenseRequestForm.paymentAmount.value ? ((fee / 100) * licenseRequestForm.paymentAmount.value).toFixed(2) : 0} {globalModalState?.artDetail?.currency}
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
					yes={handleSendLicenseRequest}
					disableYesBtn={!formValidation.isEnableForm}
					no={() => {
						hideModal()
						setLicenseRequestForm(initialLicenseForm)
					}}
					btnTexts={{ yes: applyI18, no: cancelI18 }}
				/>
			</PopContainer>
		</MainPopup>
	);
}

export default LicenseRequestPopup;
