/**
 * @createdBy duka
 */
import React, { useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import usePopup from 'Components/ui/popup/usePopup';
import useMyPageTranslation from 'locale/useMypageTranslation';
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';
import { LicenseRow } from './licensePopupUi/LicenseRow';
import H2 from 'Components/ui/typography/H2';
import P from 'Components/ui/typography/P';
import useArtworkTranslation from 'locale/useArtworkTranslation';
import LicenseRightBtn from 'Components/ui/button/LicenseRightBtn';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import Image from 'next/image';
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from './licensePopupUi/LicenseCol';

function MobileLicenseExpritionPopup() {
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
        paymentTimingI18,
        confirmI18,
        timeEndingTitleI18,
        contractApproval24hoursI18,
        copyrightLicensorI18,
        attribution_andI18,
        licensePeriodMobileI18,
        method_paymentI18,
        contractAmountI18
    } = useMyPageTranslation();
    const { requesterNameI18, charge } = useArtworkTranslation()
    const [fee, setFee] = useState(0)
    const { globalModalState, hideModal } = usePopup();
    const pendingLicense = globalModalState?.license

    return (
        <MainPopup>
            <PopupContainer>
                <h3 className='sm:text-[22px] text-[20px] text-[#E0E6E8] font-[500] text-center mt-[15px]'>{timeEndingTitleI18}</h3>
                <PopupContent>
                    <div className="w-full pt-[35px] pb-[50px]">
                        <LicenseContainer>
                            <LicenseFirstCol>
                                <div className='grayscale'>
                                    <ArtworkFileViewer artwork={pendingLicense} square />
                                </div>
                                <div className='flex flex-col text-center justify-center mb-[5px]'>
                                    <P>{pendingLicense?.artworkName}</P>
                                    <p className='text-[#B0B0B0] text-[14px]'>
                                        {pendingLicense?.artworkOwnerFullname}
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
                                        <P>{pendingLicense?.artworkName}</P>
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
                                        <P>{pendingLicense?.artworkOwnerFullname}</P>
                                    </div>
                                </LicenseRow>
                                <LicenseRow>
                                    <div className="w-2/5 min-w-[150px]">
                                        <H2>{requesterNameI18}</H2>
                                    </div>
                                    <div className="w-3/5 ">
                                        <P>{pendingLicense?.buyerFullname}</P>
                                    </div>
                                </LicenseRow>
                                <LicenseBigTitle text={applicantI18} />
                                <LicenseRow>
                                    <div className="w-2/5 min-w-[150px]">
                                        <H2>{corparateNameI18}</H2>
                                    </div>
                                    <div className="w-3/5 ">
                                        <P>{pendingLicense?.applicantAddress}</P>
                                    </div>
                                </LicenseRow>
                                <LicenseRow>
                                    <div className="w-2/5 min-w-[150px]">
                                        <H2>{addressI18}</H2>
                                    </div>
                                    <div className="w-3/5 ">
                                        <P>{pendingLicense?.applicantContact}</P>
                                    </div>
                                </LicenseRow>
                                <LicenseRow>
                                    <div className="w-2/5 min-w-[150px]">
                                        <H2>{contactI18}</H2>
                                    </div>
                                    <div className="w-3/5 ">
                                        <P>{pendingLicense?.applicantName}</P>
                                    </div>
                                </LicenseRow>
                                <LicenseBigTitle text={contractualRightsI18} />
                                <LicenseRow>
                                    <div className="flex gap-1 flex-wrap">
                                        {
                                            pendingLicense?.rights?.length > 0 &&
                                            pendingLicense?.rights?.map((right, idx) => (
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
                                                {pendingLicense?.permissionPeriod}
                                            </P>
                                        </div>
                                    </div>
                                </LicenseRow>
                                <LicenseRow yCenter>
                                    <div className="w-2/5 min-w-[150px]">
                                        <H2>{purpose_to_useI18}</H2>
                                    </div>
                                    <div className="w-3/5 ">
                                        <P>{pendingLicense?.purpose}</P>
                                    </div>
                                </LicenseRow>
                                <LicenseBigTitle text={contractAmountI18} />
                                <LicenseRow yCenter>
                                    <div className="w-2/5 min-w-[150px]">
                                        <H2>{license_payoutI18}</H2>
                                    </div>
                                    <div className="w-3/5 ">
                                        <div className="flex gap-2 items-center">
                                            <P>{pendingLicense?.paymentAmount}</P>
                                            <P>{pendingLicense?.artworkCurrency} </P>
                                        </div>
                                    </div>
                                </LicenseRow>
                                <LicenseRow yCenter>
                                    <div className="w-2/5 min-w-[150px]">
                                        <H2>{paymentTimingI18}</H2>
                                    </div>
                                    <div className="w-3/5 ">
                                        <p className="text-[#fff] text-[14px]">
                                            {contractApproval24hoursI18}
                                        </p>
                                    </div>
                                </LicenseRow>
                                <LicenseRow yCenter>
                                    <div className="w-2/5 min-w-[150px]">
                                        <H2>{charge}</H2>
                                    </div>
                                    <div className="w-3/5 flex gap-[4px]">
                                        <P className="text-[#FFF] sm:text-[16px] text-[14px] font-[400]">
                                            {pendingLicense?.paymentAmount ? ((fee / 100) * pendingLicense?.paymentAmount).toFixed(2) : 0} {pendingLicense?.artworkCurrency}
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
                                                    pendingLicense?.artworkCurrency == "EYES"
                                                        ? eyesicon
                                                        : matic_logo
                                                }
                                                alt={pendingLicense?.artworkCurrency}
                                            />
                                        </div>
                                        <P>
                                            {pendingLicense?.artworkCurrency}
                                        </P>
                                    </div>
                                </LicenseRow>
                            </LicenseSecondCol>
                        </LicenseContainer>
                    </div>
                </PopupContent>
                <div className="flex justify-center mb-[20px]">
                    <button
                        onClick={() => hideModal()}
                        className="font-[500] h-[35px] bg-[#404040] text-white undefined rounded-md py-2 px-[20px]"
                    >
                        <p className='text-[14px] text-white font-bold'>{confirmI18}</p>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default MobileLicenseExpritionPopup;