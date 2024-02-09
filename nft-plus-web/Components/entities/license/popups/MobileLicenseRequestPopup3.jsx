import React, { useEffect, useState } from "react";
import useFee from "Components/entities/artwork/useFee";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import { PopContainer } from "Components/ui/popup/popupUi";
import usePopup from "Components/ui/popup/usePopup";
import useMypageTranslation from "locale/useMypageTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { LicenseRow, LicenseSubRow } from "./licensePopupUi/LicenseRow";
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

function MobileLicenseRequestPopup3() {
    const {
        allRightsI18,
        apply: applyI18,
        cancel: cancelI18,
        requestTitleI18,
        titles1I18
    } = useArtworkTranslation();
    const {
        licensePeriodI18,
        contractualRightsI18,
        purpose_to_useI18,
        licensePeriodMobileI18,
        placeHolderI18,
        selectContractI18,
        nextI18
    } = useMypageTranslation();
    const { authUser } = useGlobalContext();
    const [fee, setFee] = useState(0);
    const {
        handleShowModal,
        MODAL_TYPES,
        hideModal,
        setGlobalModalState,
        globalModalState,
        modalHistory
    } = usePopup();
    const {  
        licenseRequestForm, 
        setLicenseRequestForm,
        rightLists,
        setRightsLists
    } = useLicense()

    const { toWon } = useCurrency()
    const [convertedWon, setConvertedWon] = useState(null);
    const [formValidation, setFormValidation] = useState({
        isEnableForm: false,
        isNoFormError: true,
        allFieldsWithValues: false
    })
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

    function handleNextRequest3() {
        setGlobalModalState(prev => (
            {
                ...prev,
                artDetail: globalModalState?.artDetail,
                showSwitchNetworkModal: (modalType) => {
                    hideModal();
                    handleShowModal(modalType);
                }
            }
        ))
        if (
            licenseRequestForm.purpose.value !== null
        ) {
            if (licenseRequestForm.rights.value.length !== 0) {
                handleShowModal(MODAL_TYPES.MOBILE_LICENSE_REQUEST4)
            } else {
                alert('please choose one right at least!')
            }
        } else {
            alert("Please enter purpose of use fields");
        }
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
				if(res.error.response.data.message === 'check.price') {
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
        <MainPopup datePicker minWidth={360}>
            <PopContainer>
                <PopupHeader text={titles1I18} />
                <PopupContent>
                    <div className="w-full sm:pt-[50px] pt-[35px] pb-[50px]">
                        <LicenseContainer>
                            <LicenseFirstCol>
                            <div className="bg-[#141313] rounded-[18px] p-[15px]">
                                <ArtworkFileViewer
                                    artwork={globalModalState?.artDetail}
                                    square
                                    width={70}
                                    height={70}
                                />
                                <div className="flex flex-col justify-center items-center mt-[10px]">
                                    <P>{globalModalState?.artDetail?.artworkName}</P>
                                    <p className="text-[14px] text-[#B0B0B0] font-[500]">{authUser?.nickName}</p>
                                </div>
                                </div>
                            </LicenseFirstCol>
                            <LicenseSecondCol>
                                <LicenseBigTitle text={contractualRightsI18} />
                                <LicenseRow>
                                    <div className="">
                                        <span className="text-[14px] text-[#DDD] font-[350]">{selectContractI18}</span>
                                        <div className="flex gap-x-[18px] gap-y-[20px] flex-wrap mt-[22px]">
                                            {
                                                globalModalState?.artDetail?.rights?.length > 0 &&
                                                globalModalState?.artDetail?.rights?.map((right, idx) => (
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
                                <LicenseBigTitle text={licensePeriodMobileI18} />
                                <LicenseRow>
                                    <div className="flex flex-col gap-[10px]">
                                        <h2 className="text-[#DDD] text-[14px] font-[500]">{licensePeriodI18}</h2>
                                        <div className="mb-[14px]">
                                            <div className="flex items-center gap-[5px]">
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
                                    </div>
                                </LicenseRow>
                                <LicenseRow>
                                    <div className="flex flex-col gap-[10px] w-full">
                                        <h2 className="text-[#DDD] text-[14px] font-[500]">{purpose_to_useI18}</h2>
                                        <div className="mb-[14px] w-full">
                                            <InputDark
                                                name='purpose'
                                                value={licenseRequestForm.purpose.value}
                                                onChange={handleChangeForm}
                                                borderColor={licenseRequestForm.purpose.error && '#FB3873'}
                                                placeholder={placeHolderI18}
                                            />
                                        </div>
                                    </div>
                                </LicenseRow>
                            </LicenseSecondCol>
                        </LicenseContainer>
                    </div>
                </PopupContent>
                <div className="w-full flex flex-row sm:justify-end md:justify-end justify-center font-[300] gap-[10px] right-[30px]">
                    <button
                        className="min-w-[74px] bg-[#333] text-white py-[6px] text-center rounded-[5px] cursor-pointer"
                        onClick={() => {
                            hideModal()
                            setLicenseRequestForm((prev) => ({
                                ...prev, purpose: {
                                    value: null,
                                    error: null
                                }
                            }))
                        }}
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{cancelI18}</h4>
                    </button>
                    <button
                        className={`min-w-[74px] bg-[#6319FF]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                        onClick={handleNextRequest3}
                        type='submit'
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{nextI18}</h4>
                    </button>
                </div>
            </PopContainer>
        </MainPopup>
    );
}

export default MobileLicenseRequestPopup3;
