/**
 * @createdBy duka
 */
import React, { useState, useEffect } from "react";
import { PopContainer } from "Components/ui/popup/popupUi";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import Image from "next/image";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import usePopup from "Components/ui/popup/usePopup";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import Checkbox from "Components/ui/checkbox/Checkbox";
import { MODAL_TYPES } from "Components/ui/popup/popupRegistration";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useWallet from "common/metamask/useWallet";
import useCrud from "common/axios/crud";
import { useGlobalContext } from "common/global/useGlobalContext";
import Web3 from "web3";
import useAuction from "common/metamask/useAuction";
import { useRouter } from "next/router";
import { delay } from "utils/date";
import useCurrency from "common/metamask/useCurrency";
const { default: CreatorProfile } = require("../CreatorProfile");
const { FaWonSign } = require("react-icons/fa");


function MobileCreateConfirmBidsPopup({ id }) {
    const { excreptWon, toWon } = useCurrency();
    const [won, setWon] = useState(null);
    const query = useRouter().query;
    const { postModel } = useCrud();
    const { setGlobalLoading } = useGlobalContext();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptTermsError, setAcceptTermsError] = useState(false);
    const { orderPaymentI18, cancel, bidButtonI18, placeBidI18, bidgsI18, paymentModalI18 } = useArtworkTranslation();
    const { total, checkAllTermsI18 } = useCommonTranslation();
    const {
        getCurrentModalprops,
        popupProps,
        handleShowModal,
        hideAllModals,
        hideModal,
        globalModalState
    } = usePopup();
    const { walletIsMatch } = useWallet();
    const { bidButtonHandler, bidEyesButtonHandler } = useAuction();
    const { getNetwork } = useMetaNetwork();
    const thePrice = popupProps?.price

    async function handlePayment() {
        const currentNetwork = await getNetwork();
        const networkId =
            popupProps?.currency === "EYES"
                ? process.env.ETH_CHAIN_ID
                : process.env.MATIC_CHAIN_ID;

        const modalType =
            popupProps?.currency === "EYES"
                ? MODAL_TYPES.SWITCHETHERIUMNET
                : MODAL_TYPES.SWITCHMAINNET;
        if (currentNetwork !== networkId) {
            handleShowModal(modalType);
            return;
        }
        if (!acceptTerms) {
            setAcceptTermsError(true);
            alert(checkAllTermsI18);
            return;
        }

        const { isMatchWallet, currentMetaWallet } = await walletIsMatch();
        if (!isMatchWallet) {
            alert("wallet aa burtguulne uu");
            return;
        }
        setGlobalLoading(true);
        try {
            const result = await postModel(
                "/bid",
                {
                    auctionId: popupProps.auction.id,
                    price: Web3.utils.toWei(popupProps.bids.toString(), "ether"),
                    transactionHash: "",
                    walletAddress: currentMetaWallet,
                    tokenId: popupProps.auction?.tokenId
                },
                true
            );
            const bid = {
                bidId: result.data.result.id,
                auctionId: popupProps.auction.id,
                bidPrice: Web3.utils.toWei(popupProps.bids.toString(), "ether"),
                tokenId: popupProps.auction?.tokenId

            };

            if (popupProps.currency === "EYES") {
                const { contractHash, failure } = await bidEyesButtonHandler(bid);
                if (failure && failure !== "cancelled") {
                    alert(failure);
                }
            } else {
                const { contractHash, failure } = await bidButtonHandler(bid);
                if (failure && failure !== "cancelled") {
                    alert(failure);
                }
            }
        } catch (e) {
            alert(e);
        } finally {
            delay(1000).then(() => {
                setGlobalLoading(false);
                globalModalState.getArtDetail(query.id);
                hideAllModals();
            })
        }
        delay(1000).then(() => {
            setGlobalLoading(false);
            globalModalState.getArtDetail(query.id);
            hideAllModals();
        })
    }

    function updateAcceptTerms(e) {
        if (e.target.checked) {
            setAcceptTerms(true);
        } else {
            setAcceptTerms(false);
        }
    }

    useEffect(() => {
        if (acceptTerms) {
            setAcceptTermsError(false);
        }
    }, [acceptTerms]);

    useEffect(() => {
        getCurrentModalprops();
    }, [popupProps]);

    useEffect(() => {
        getCurrentModalprops();
        toWon(popupProps?.price, popupProps?.currency, true).then((res) =>
            setWon(res)
        );
    }, [popupProps]);

    return (
        <MainPopup width={572}>
            {popupProps && (
                <PopContainer>
                    <PopupHeader text={placeBidI18} />
                    <PopupContent>
                        <div className="mb-[60px]">
                            <div className="flex flex-col items-center justify-center first-letter:py-[16px] sm:mt-[20px] mt-[35px]">
                                <CreatorProfile
                                    auction={popupProps?.auction}
                                    thumbnail_url={popupProps?.thumbnail_url}
                                    title={popupProps?.title}
                                    creator={popupProps?.creator}
                                    creator_avatar={popupProps?.creator_avatar}
                                    fileType={popupProps?.fileType}
                                    imageUrl={popupProps?.imageUrl}
                                    currency={popupProps?.currency}
                                    price={popupProps?.price}
                                    isAuction={popupProps?.isAuction}
                                    id={popupProps?.id}
                                    won={popupProps?.won}
                                />
                                <div className="flex flex-col items-center mt-[10px]">
                                    <p className="text-[#fff] text-[14px] font-[400]">{popupProps?.title}</p>
                                    <span className="text-[#B0B0B0] text-[14px] font-[500]">{popupProps?.creator}</span>
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-[45px] border-b border-[#2E2E2E] pb-[20px] gap-[10px]">
                                <div className="flex text-[14px] text-[#DDD] font-medium">
                                    {bidgsI18}
                                </div>
                                <div className="bg-[#0F1111] flex flex-col justify-center py-[19px]">
                                    <div className="flex justify-center text-[16px] text-white font-[500] items-center gap-[2px]">
                                        <div className="relative flex items-center justify-center">
                                            <Image
                                                width={14}
                                                height={14}
                                                src={popupProps?.currency === "EYES" ? eyesicon : matic_logo}
                                                alt="currency"
                                            />
                                        </div>
                                        <p className="sm:text-[18px] text-[16px]">{popupProps?.price}</p>
                                        {popupProps?.currency}
                                    </div>
                                    <div className="flex items-center sm:text-[14px] text-[12px] text-[#5E5E5E] font-[400] justify-center gap-[2px]">
                                        {thePrice !== "0" && (
                                            <>
                                                <FaWonSign />
                                                {excreptWon(won, id)}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-[15px] gap-[10px]">
                                <div className="flex text-[14px] text-[#DDD] font-medium">
                                    {paymentModalI18}
                                </div>
                                <div className="bg-[#0F1111] mb-[25px] py-[15px] text-center">
                                    <div className="flex flex-row justify-center font-[500] gap-[2px] text-[#fff] text-[16px]">
                                        <div className="relative flex items-center justify-center">
                                            <Image
                                                width={14}
                                                height={14}
                                                src={popupProps?.currency === "EYES" ? eyesicon : matic_logo}
                                                alt="currency"
                                            />
                                        </div>
                                        <div>{popupProps?.bids}</div>
                                        {popupProps?.currency}
                                    </div>
                                    <div className="flex items-center gap-[4px] justify-center font-[400] text-[#5E5E5E] text-[12px]">
                                        <FaWonSign />
                                        {popupProps?.won}
                                    </div>
                                </div>
                            </div>
                            <PreCausionBox
                                updateAcceptTerms={updateAcceptTerms}
                                acceptTermsError={acceptTermsError}
                                acceptTerms={acceptTerms}
                            />
                        </div>
                    </PopupContent>
                    <PopupActionButtons
                        yes={() => handlePayment()}
                        no={() => hideModal()}
                        btnTexts={{ no: cancel, yes: bidButtonI18 }}
                    />
                </PopContainer>
            )}
        </MainPopup>
    );
}

function PreCausionBox({ updateAcceptTerms, acceptTerms, acceptTermsError }) {
    const {
        orderPurchaseI18,
        orderCheckboxI18,
        ifHighterI18,
        meteMaskComfirmI18,
        noticeI18
    } = useArtworkTranslation();

    return (
        <div>
            <h6 className="text-[14px] text-[#DDD] font-medium">
                {noticeI18}
            </h6>
            <ul
                style={{
                    backgroundColor: "#2F2E39",
                    color: "#DDD"
                }}
                className="p-[15px] my-[10px] mx-[5px] text-sm text-[14px] h-full max-w-[518px] gap-1 list-disc">
                <li className="text-[13px] mb-[10px] text-[#DDD] font-[400] mx-[15px]">
                    {ifHighterI18}
                </li>
                <li className="text-[13px] text-[#DDD] font-[400] mx-[15px]">
                    {meteMaskComfirmI18}
                </li>
            </ul>
            <div className="text-base flex justify-center mb-[50px]">
                <label htmlFor="check" className="inline-flex pointer items-center">
                    <Checkbox
                        id="check"
                        onClick={updateAcceptTerms}
                        checked={acceptTerms}
                    />
                    <p
                        className={`${acceptTermsError
                            ? " text-[#FB3873] text-[14px] font-[400]"
                            : " text-[#B0B0B0] text-[14px] font-[400]"
                            } mx-2`}>
                        {orderCheckboxI18}
                    </p>
                </label>
            </div>
        </div>
    );
}

export default MobileCreateConfirmBidsPopup;
