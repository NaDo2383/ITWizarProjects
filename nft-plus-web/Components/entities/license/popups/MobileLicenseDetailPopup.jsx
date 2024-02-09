/**
 * @createdBy duka
 */
import React, { useEffect, useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupActionButtons from 'Components/ui/popup/popupMaterials/PopupActionButtons';
import usePopup from 'Components/ui/popup/usePopup';
import useMyPageTranslation from 'locale/useMypageTranslation';
import useAlertTranslation from 'locale/useAlertTranslation';
import useWallet from "common/metamask/useWallet";
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';
import { LicenseRow } from './licensePopupUi/LicenseRow';
import H2 from 'Components/ui/typography/H2';
import P from 'Components/ui/typography/P';
import useArtworkTranslation from 'locale/useArtworkTranslation';
import LicenseRightBtn from 'Components/ui/button/LicenseRightBtn';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import { LicenseContainer, LicenseFirstCol, LicenseSecondCol } from './licensePopupUi/LicenseCol';
import useFee from 'Components/entities/artwork/useFee';
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import Image from 'next/image';

function MobileLicenseDetailPopup() {
    const {
        hideModal,
        MODAL_TYPES,
        handleShowModal,
        globalModalState,
    } = usePopup();
    const {
        layerTitleI18,
        confirmI18,
        contractApproval24hoursI18,
        paymentTimingI18,
        worknameI18,
        applicantI18,
        contractualRightsI18,
        licensePeriodI18,
        purpose_to_useI18,
        contactI18,
        addressI18,
        copyrightLicensorI18,
        attribution_andI18,
        corparateNameI18,
        contractDetailsI18,
        licensePeriodMobileI18,
        contractAmountI18,
        license_payoutI18,
        method_paymentI18
    } = useMyPageTranslation();
    const {
        notOwnTokensInWalletAddressI18,
        registerYourWalletI18
    } = useAlertTranslation()
    const {
        cancel: cancelI18,
        requesterNameI18,
        charge
    } = useArtworkTranslation()
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

    return (
        <div className='sm:hidden'>
            <MainPopup>
                <PopupContainer>
                    <h3 className='sm:text-[22px] text-[20px] text-[#E0E6E8] font-[500] text-center mt-[15px]'>{layerTitleI18}</h3>
                    <PopupContent>
                        <div className="w-full pt-[35px] pb-[50px]">
                            <LicenseContainer>
                                <LicenseFirstCol>
                                    <ArtworkFileViewer artwork={pendingLicense} square />
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
                    <PopupActionButtons
                                yes={() => hideModal()}
                                no={() => hideModal()}
                                btnTexts={{ no: cancelI18, yes: confirmI18 }}
                            />
                </PopupContainer>
            </MainPopup>
        </div>
    )
}

export default MobileLicenseDetailPopup;