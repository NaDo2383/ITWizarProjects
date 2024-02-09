import React, { useEffect, useState } from "react";
import useFee from "Components/entities/artwork/useFee";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import Image from "next/image";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import usePopup from "Components/ui/popup/usePopup";
import useMypageTranslation from "locale/useMypageTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { LicenseRow, LicenseSubRow } from "./licensePopupUi/LicenseRow";
import H2 from "Components/ui/typography/H2";
import P from "Components/ui/typography/P";
import LicenseRightBtn from 'Components/ui/button/LicenseRightBtn';
import LicenseBigTitle from "./licensePopupUi/LicenseBigTitle";
import { useGlobalContext } from "common/global/useGlobalContext";
import useLicense from "../useLicense";
import useCurrency from "common/metamask/useCurrency";
import { dateSimplify, formattedDate } from "utils/date";
import ArtworkFileViewer from "Components/entities/artwork/ArtworkFileViewer"
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from "./licensePopupUi/LicenseCol";

function MobileLicenseConfirmPopup() {
    const {
        cancel: cancelI18,
        requesterNameI18,
        charge
    } = useArtworkTranslation();
    const {
        layerTitleI18,
        confirmContractI18,
        contractApproval24hoursI18,    
        corparateNameI18,
        licensePeriodMobileI18,
        worknameI18,
        contractDetailsI18,
        contractAmountI18,
        applicantI18,
        paymentTimingI18,
        licensePeriodI18,
        contractualRightsI18,
        addressI18,
        contactI18,
        attribution_andI18,
        copyrightLicensorI18,
        license_payoutI18,
        purpose_to_useI18,
        method_paymentI18,
        lisenceAgreementFeeI18,
        placeHolderI18,
        nextI18,
        confirmTitleI18
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
    const chosenRights = licenseRequestForm?.rights?.value;
    const startDate = dateSimplify(licenseRequestForm?.licenseStart?.value)
    const endDate = dateSimplify(licenseRequestForm?.licenseEnd?.value)

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
            handleShowModal(MODAL_TYPES.MOBILE_LICENSE_REQUEST_COMPLETED);
        } catch (e) {
            console.error('yu bolow: ', e)
        } finally {
            setLicenseRequestForm(initialLicenseForm)
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
            <MainPopup datePicker>
                <PopupContainer>
                    <h3 className='text-[20px] text-[#E0E6E8] font-[500] text-center mt-[15px]'>{confirmTitleI18}</h3>
                    <PopupContent>
                        <div className="w-full pt-[35px] pb-[50px]">
                            <LicenseContainer>
                                <LicenseFirstCol>
                                <ArtworkFileViewer
                                    artwork={globalModalState?.artDetail}
                                    square
                                    width={70}
                                    height={70}
                                />
                                    <div className='flex flex-col text-center justify-center mb-[5px]'>
                                        <P>{globalModalState?.artDetail?.artworkName}</P>
                                        <p className='text-[#B0B0B0] text-[14px]'>
                                            {authUser?.nickName}
                                        </p>
                                    </div>
                                </LicenseFirstCol>
                                <LicenseSecondCol>
                                    <LicenseBigTitle text={contractDetailsI18} />
                                    <LicenseRow>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{worknameI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <p className="text-[15px] text-[#fff] font-[400]">{globalModalState?.artDetail?.artworkName}</p>
                                        </div>
                                    </LicenseRow>
                                    <LicenseRow>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>
                                                {attribution_andI18} <br />
                                                {copyrightLicensorI18}
                                            </H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <P>{globalModalState?.artDetail?.authorName}</P>
                                        </div>
                                    </LicenseRow>
                                    <LicenseRow>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{requesterNameI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <P>{licenseRequestForm?.applicantName.value}</P>
                                        </div>
                                    </LicenseRow>
                                    <LicenseBigTitle text={applicantI18} />
                                    <LicenseRow>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{corparateNameI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <P>{licenseRequestForm?.applicantName.value}</P>
                                        </div>
                                    </LicenseRow>
                                    <LicenseRow>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{addressI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <P>{licenseRequestForm?.applicantAddress.value}</P>
                                        </div>
                                    </LicenseRow>
                                    <LicenseRow>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{contactI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <P>{licenseRequestForm?.applicantContact.value}</P>
                                        </div>
                                    </LicenseRow>
                                    <LicenseBigTitle text={contractualRightsI18} />
                                    <LicenseRow>
                                        <div className="flex gap-1 flex-wrap">
                                            {
                                                chosenRights?.length > 0 &&
                                                chosenRights?.map((right, idx) => (
                                                    <LicenseRightBtn key={'right-' + idx} text={right?.code} />
                                                ))
                                            }
                                        </div>
                                    </LicenseRow>
                                    <LicenseBigTitle text={licensePeriodMobileI18} />
                                    <LicenseRow>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{licensePeriodI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <div className="flex items-center gap-5">
                                                <P>
                                                    {startDate+"~"+endDate}
                                                </P>
                                            </div>
                                        </div>
                                    </LicenseRow>
                                    <LicenseRow yCenter>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{purpose_to_useI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <P>{licenseRequestForm?.purpose.value}</P>
                                        </div>
                                    </LicenseRow>
                                    <LicenseBigTitle text={contractAmountI18} />
                                    <LicenseRow yCenter>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{license_payoutI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <div className="flex gap-2 items-center">
                                                <P>{licenseRequestForm?.paymentAmount.value}</P>
                                                <P>{} </P>
                                            </div>
                                        </div>
                                    </LicenseRow>
                                    <LicenseRow yCenter>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{paymentTimingI18}</H2>
                                        </div>
                                        <div className="w-3/5 ">
                                            <p className="text-[#CF6081] text-[14px]">
                                                {contractApproval24hoursI18}
                                            </p>
                                        </div>
                                    </LicenseRow>
                                    <LicenseRow yCenter>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{charge}</H2>
                                        </div>
                                        <div className="w-3/5 flex gap-[4px]">
                                            <P className="text-[#FFF] sm:text-[16px] text-[14px]font-[400]">
                                                {licenseRequestForm?.paymentAmount.value ? ((fee / 100) * licenseRequestForm?.paymentAmount.value).toFixed(2) : 0} {globalModalState?.artDetail?.currency}
                                            </P>
                                            <P className="text-[#B0B0B0] sm:text-[16px] text-[14px] font-[400]">
                                                ({fee}%)
                                            </P>
                                        </div>
                                    </LicenseRow>
                                    <LicenseRow yCenter>
                                        <div className="w-2/5 min-w-[150px]">
                                            <H2>{method_paymentI18}</H2>
                                        </div>
                                        <div className="w-3/5 flex flex-row gap-2">
                                            <div className='w-[14px] h-[14px]'>
                                                <Image
                                                    src={
                                                        globalModalState?.artDetail?.currency == "EYES"
                                                            ? eyesicon
                                                            : matic_logo
                                                    }
                                                    alt={globalModalState?.artDetail?.currency}
                                                />
                                            </div>
                                            <P>
                                                {globalModalState?.artDetail?.currency}
                                            </P>
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
                                setLicenseRequestForm((prev) => ({ ...prev, purpose: {
                                    value: null,
                                    error: null
                                }}))
                            }}
                        >
                            <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{cancelI18}</h3>
                        </button>
                        <button
                            className={`min-w-[74px] bg-[#6319FF]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                            onClick={handleSendLicenseRequest}
                            type='submit'
                        >
                            <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{nextI18}</h3>
                        </button>
                    </div>
                </PopupContainer>
            </MainPopup>
    )
}

export default MobileLicenseConfirmPopup;