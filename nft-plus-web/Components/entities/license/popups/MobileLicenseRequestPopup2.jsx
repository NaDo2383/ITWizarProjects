import React, { useEffect, useState } from "react";
import useFee from "Components/entities/artwork/useFee";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import { PopContainer } from "Components/ui/popup/popupUi";
import usePopup from "Components/ui/popup/usePopup";
import useMypageTranslation from "locale/useMypageTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import P from "Components/ui/typography/P";
import InputDark from "Components/ui/input/InputDark";
import LicenseBigTitle from "./licensePopupUi/LicenseBigTitle";
import { useGlobalContext } from "common/global/useGlobalContext";
import useLicense from "../useLicense";
import useCurrency from "common/metamask/useCurrency";
import ArtworkFileViewer from "Components/entities/artwork/ArtworkFileViewer"
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from "./licensePopupUi/LicenseCol";

function MobileLicenseRequestPopup2() {
    const {
        apply: applyI18,
        cancel: cancelI18,
        requestTitleI18
    } = useArtworkTranslation();
    const {
        applicantLegalEntityI18,
        applicantI18,
        addressI18,
        contactI18,
        nameI18,
        placeHolderI18,
        nextI18
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
    const { sendLicenseRequest, licenseRequestForm, setLicenseRequestForm } = useLicense()
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

    function handleNextRequest2() {
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
            licenseRequestForm.applicantName.value !== null &&
            licenseRequestForm.applicantAddress.value !== null &&
            licenseRequestForm.applicantContact.value !== null
        ) {
            handleShowModal(MODAL_TYPES.MOBILE_LICENSE_REQUEST3)
        } else {
            alert("Please enter all fields");
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
        <MainPopup width={360}>
            <PopContainer>
                <PopupHeader text={requestTitleI18} />
                <PopupContent>
                    <div className="w-full sm:pt-[50px] pt-[35px] pb-[50px]">
                        <LicenseContainer>
                            <LicenseFirstCol>
                                <div className="bg-[#141313] rounded-[10px] p-[15px] mb-[10px] flex flex-col justify-center items-center">
                                    <ArtworkFileViewer
                                        artwork={globalModalState?.artDetail}
                                        square
                                        width={70}
                                        height={70}
                                        className="rounded-[5px]"
                                    />
                                    <div className="flex flex-col justify-center items-center mt-[10px]">
                                        <P>{globalModalState?.artDetail?.artworkName}</P>
                                        <p className="text-[14px] text-[#B0B0B0] font-[500]">{authUser?.nickName}</p>
                                    </div>
                                </div>
                            </LicenseFirstCol>
                            <LicenseSecondCol>
                                <div className="w-full min-w-[250px]">
                                    <LicenseBigTitle text={applicantI18} />
                                    <div className="flex flex-col gap-[10px] border-b border-[#2E2E2E] mb-[15px] mt-[25px]">
                                        <div className="">
                                            <h2 className="text-[#DDD] text-[14px] font-[500]">{nameI18}{applicantLegalEntityI18}</h2>
                                        </div>
                                        <div className="mb-[14px]">
                                            <InputDark
                                                name='applicantName'
                                                value={licenseRequestForm.applicantName.value}
                                                onChange={handleChangeForm}
                                                borderColor={licenseRequestForm.applicantName.error && '#FB3873'}
                                                placeholder={placeHolderI18}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[10px] border-b border-[#2E2E2E] mb-[15px]">
                                        <div className="">
                                            <h2 className="text-[#DDD] text-[14px] font-[500]">{addressI18}</h2>
                                        </div>
                                        <div className="mb-[14px] w-full">
                                            <InputDark
                                                name='applicantAddress'
                                                value={licenseRequestForm.applicantAddress.value}
                                                onChange={handleChangeForm}
                                                borderColor={licenseRequestForm.applicantAddress.error && '#FB3873'}
                                                placeholder={placeHolderI18}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[10px] border-b border-[#2E2E2E] mb-[15px]">
                                        <div className="">
                                            <h2 className="text-[#DDD] text-[14px] font-[500]">{contactI18}</h2>
                                        </div>
                                        <div className="mb-[14px] w-full">
                                            <InputDark
                                                // pattern="-?\d+(\.\d+)?" 
                                                // step="any"
                                                // type='number'
                                                name='applicantContact'
                                                value={licenseRequestForm.applicantContact.value}
                                                onChange={handleChangeForm}
                                                borderColor={licenseRequestForm.applicantContact.error && '#FB3873'}
                                                placeholder={placeHolderI18}
                                            />
                                        </div>
                                    </div>
                                </div>
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
                                ...prev,
                                applicantName: {
                                    value: null,
                                    error: null
                                },
                                applicantAddress: {
                                    value: null,
                                    error: null
                                },
                                applicantContact: {
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
                        onClick={handleNextRequest2}
                        type='submit'
                    >
                        <h4 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{nextI18}</h4>
                    </button>
                </div>
            </PopContainer>
        </MainPopup>
    );
}

export default MobileLicenseRequestPopup2;
