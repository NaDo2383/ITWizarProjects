import React, { useEffect, useState } from "react";
import useFee from "Components/entities/artwork/useFee";
import MainPopup from "Components/ui/popup/MainPopup";
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
import P from "Components/ui/typography/P";
import InputDark from "Components/ui/input/InputDark";
import LicenseBigTitle from "./licensePopupUi/LicenseBigTitle";
import { useGlobalContext } from "common/global/useGlobalContext";
import useLicense from "../useLicense";
import useCurrency from "common/metamask/useCurrency";
import ArtworkFileViewer from "Components/entities/artwork/ArtworkFileViewer"
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from "./licensePopupUi/LicenseCol";

function MobileLicenseRequestPopup4() {
    const {
        apply: applyI18,
        cancel: cancelI18,
        charge,
        titles2I18
    } = useArtworkTranslation();
    const {
        contractAmountI18,
        paymentTimingI18,
        license_payoutI18,
        sumI18,
        application_btnI18,
        method_paymentI18,
        placeHolderI18
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
        initialLicenseForm,
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

    function handleNextRequest4() {
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
            licenseRequestForm.paymentAmount.value !== null
        ) {
            handleShowModal(MODAL_TYPES.MOBILE_LICENSE_REQUEST_CONFIRM)
        } else {
            alert("Please enter payout amount");
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
        }
    }, [globalModalState?.artDetail]);

    useEffect(() => {
        toWon(licenseRequestForm.paymentAmount.value, globalModalState.artDetail?.currency, true)
            .then(res => setConvertedWon(res))
    }, [globalModalState.artDetail, licenseRequestForm.paymentAmount.value])
    
    return (
        <MainPopup minWidth={360}>
            <PopContainer>
                <PopupHeader text={titles2I18} />
                <PopupContent>
                    <div className="w-full sm:pt-[50px] pt-[35px] pb-[60px]">
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
                                <div className="">
                                    <LicenseBigTitle text={contractAmountI18} />
                                </div>
                                <LicenseRow>
                                    <div className="flex flex-col gap-[10px]">
                                        <h2 className="text-[#DDD] text-[14px] font-[500]">{license_payoutI18}</h2>
                                        <div className="w-full">
                                            <div className="flex gap-2 items-center">
                                                <div className="min-w-[238px] sm:w-full">
                                                    <InputDark
                                                        type="number"
                                                        name='paymentAmount'
                                                        value={licenseRequestForm.paymentAmount.value}
                                                        onChange={handleChangeForm}
                                                        borderColor={licenseRequestForm.paymentAmount.error && '#FB3873'}
                                                        placeholder={placeHolderI18}
                                                    />
                                                </div>
                                                <div className="flex flex-row items-center gap-1">
                                                    <div className="text-[14px] text-[#FEFEFE] font-[400]">
                                                        {globalModalState?.artDetail?.currency}
                                                    </div>
                                                    <span className="text-[#B0B0B0] text-[10px] font-[400] whitespace-nowrap ">({sumI18})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </LicenseRow>
                                <LicenseRow yCenter>
                                    <div className="w-1/5 min-w-[150px]">
                                        <h2 className="text-[#DDD] text-[14px] font-[500]">{paymentTimingI18}</h2>
                                    </div>
                                    <div className="w-4/5">
                                        <p className="text-[#CF6081] text-[13px] font-[400]">
                                            계약 완료 시점으로부터 1일 (24시간)
                                        </p>
                                    </div>
                                </LicenseRow>
                                <LicenseRow yCenter>
                                    <div className="w-1/5 min-w-[150px]">
                                        <h2 className="text-[#DDD] text-[14px] font-[500]">{charge}</h2>
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
                                <LicenseRow>
                                    <div className="w-1/5 min-w-[150px]">
                                        <h2 className="text-[#DDD] text-[14px] font-[500]">{method_paymentI18}</h2>
                                    </div>
                                    <div className="w-4/5 flex gap-[4px]">
                                        <div className="flex flex-row gap-1">
                                            <div className="relative flex items-center justify-center w-[14px] h-[14px] mt-[2px]">
                                                <Image
                                                    width={17}
                                                    height={17}
                                                    src={globalModalState?.artDetail?.currency === "EYES" ? eyesicon : matic_logo}
                                                    alt="globalModalState?.artDetail?.currency"
                                                />
                                            </div>
                                            <span className="text-white text-[14px] font-[400]">{globalModalState?.artDetail?.currency}</span>
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
                                ...prev, paymentAmount: {
                                    value: null,
                                    error: null
                                }
                            }))
                        }}
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{cancelI18}</h4>
                    </button>
                    <button
                        className={`min-w-[74px] bg-[#FB3873]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                        onClick={handleNextRequest4}
                        type='submit'
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{application_btnI18}</h4>
                    </button>
                </div>
            </PopContainer>
        </MainPopup>
    );
}

export default MobileLicenseRequestPopup4;
