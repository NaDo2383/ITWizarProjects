/**
 * @createdBy duka
 */
import React, { useEffect, useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import usePopup from 'Components/ui/popup/usePopup';
import useMyPageTranslation from 'locale/useMypageTranslation';
import useAlertTranslation from 'locale/useAlertTranslation';
import useWallet from "common/metamask/useWallet";
import { useGlobalContext } from 'common/global/useGlobalContext';
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';
import { LicenseRow } from './licensePopupUi/LicenseRow';
import H2 from 'Components/ui/typography/H2';
import P from 'Components/ui/typography/P';
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

function MobileLicensePaymentPopup() {
    const {
        layerTitleI18,
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
        paymentTimingI18,
        copyrightLicensorI18,
        attribution_andI18,
        licensePeriodMobileI18,
        contractAmountI18,
        method_paymentI18
    } = useMyPageTranslation();
    const {
        notOwnTokensInWalletAddressI18,
        registerYourWalletI18
    } = useAlertTranslation()
    const {
        requesterNameI18,
        charge,
        cancel
    } = useArtworkTranslation()
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
        <MainPopup maxWidth={1145}>
            <PopupContainer>
                <h3 className='sm:text-[22px] text-[20px] text-[#E0E6E8] font-[500] text-center mt-[15px]'>
                    {layerTitleI18}
                </h3>
                <PopupContent>
                    <div className="w-full sm:pt-[50px] pt-[35px] sm:pb-[50px] pb-[60px]">
                        <LicenseContainer>
                            <LicenseFirstCol>
                                <ArtworkFileViewer
                                    artwork={pendingLicense}
                                    square
                                />
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
                                <div className="sm:pt-[50px]">
                                    <LicenseBigTitle text={contractAmountI18} />
                                </div>
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
                                    <div className="w-3/5">
                                        <div className='flex sm:flex-row flex-col gap-[10px]'>
                                            <p className="text-[#fff] text-[12px] font-[400]">
                                                {dayfromcontractCompletionI18}
                                            </p>
                                            <p className='text-[12px] text-[#CF6081] font-[400]'>
                                                {`Time remaining ${timeRemaining?.hours}:${timeRemaining?.minutes}:${timeRemaining?.seconds}`}
                                            </p>
                                        </div>
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
                                        <P className="text-[#B0B0B0] text-[16px] font-[400]">
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
                {/* <PopupActionButtons 
					yes={ showCheckConfirmContractPopup } 
					no={ () => hideModal() } 
					btnTexts={ { no: cancelI18, yes: confirmContractI18 } } 
				/> */}
                <div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px]">
                    <button className="max-w-[107px] w-full bg-[#333] text-white py-[6px] text-center rounded-[5px] cursor-pointer" onClick={() => hideModal()}>
                        <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">{cancel}</h3>
                    </button>
                    <button className="max-w-[107px] w-full bg-[#6319FF] cursor-pointer text-white py-[6px] focus:outline-none text-center rounded-[5px]" onClick={showLicenseCheckContractPopup}>
                        <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">{confirmContractI18}</h3>
                    </button>
                    <button className="max-w-[107px] w-full bg-[#FB3873] cursor-pointer text-white py-[6px] focus:outline-none text-center rounded-[5px]" onClick={handleLicensePayment}>
                        <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">{paymentI18}</h3>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default MobileLicensePaymentPopup;