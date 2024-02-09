/**
 * @createdBy duka
 */
import React, { useEffect, useState } from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useAlertTranslation from "locale/useAlertTranslation";
import { FaWonSign } from "react-icons/fa";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import useCurrency from "common/metamask/useCurrency";
import { useGlobalContext } from "common/global/useGlobalContext";
import useMetaNetwork from "common/metamask/useMetaNetwork";
import useApproveEyes from "common/metamask/eyes/useApproveEyes";
import useTradeMatic from "common/metamask/matic/useTradeMatic";
import useWallet from "common/metamask/useWallet";
import useArtDetail from "../useArtDetail";
import CreatorProfile from "../CreatorProfile";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import Image from "next/image";

function MobileEditSellPricePopup({id}) {
    const { editSellPriceI18, editChangePriceI18, cancel, changeAmount, bidgsI18, currentPriceI18 } =
        useArtworkTranslation();
    const { notOwnTokensInWalletAddressI18, registerYourWalletI18 } =
        useAlertTranslation();    
    const {
        handleShowModal,
        MODAL_TYPES,
        getCurrentModalprops,
        popupProps,
        hideModal,
        hideAllModals,
        globalModalState,
        setGlobalModalState
    } = usePopup();
    const { updateArtworkPrice} = useArtDetail();
    const { approveToken } = useApproveEyes();
    const { editPriceButtonHandler } = useTradeMatic();
    const [won, setWon] = useState(null);
    const [newC, setNewC] = useState(false);
    const { getNetwork } = useMetaNetwork();
    const { toWon, toEthers, toWei, excreptWon } = useCurrency();
    const [newPrice, setNewPrice] = useState();
    const [convertedWon, setConvertedWon] = useState(0);
    const { setGlobalLoading } = useGlobalContext();
    const { walletIsMatch } = useWallet();
    const [ longChangedPrice, setLongChangedPrice ] = useState(null)
    const thePrice =  popupProps?.artwork?.price
    
    function handleNewPrice(e) {
        const inputPrice = e.target.value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*)\./g, "$1");
        setNewC(true);
        setNewPrice(inputPrice);
        const weiPrice = toWei(inputPrice);
        setLongChangedPrice(weiPrice)
        toWon(weiPrice, popupProps?.artwork?.currency).then((convertedValue) => setConvertedWon(convertedValue));
    }

    async function handleChangePrice() {
        setGlobalLoading(true);
        try {
            if (!newC) {
                alert("old price must be changed!");
                return;
            }
            const { price, currency, tokenId, id } = popupProps?.artwork;
            const currentNetworkId = await getNetwork();
            if (currentNetworkId !== process.env.MATIC_CHAIN_ID) {
                handleShowModal(MODAL_TYPES.SWITCHMAINNET);
                return;
            }

            const { isMatchWallet, currentMetaWallet } = await walletIsMatch();
            if (!isMatchWallet) {
                alert(registerYourWalletI18);
                return;
            }
            if (currentMetaWallet === "notFound") {
                alert(registerYourWalletI18);
                return;
            }

            if (!tokenId) {
                alert("tokenId not found");
                return;
            }

            const { result, failure, contractHash } = await editPriceButtonHandler(tokenId, +newPrice);
            const updatedWeiPrice = toWei(newPrice);
            if (!failure) {
                await updateArtworkPrice(id, updatedWeiPrice);
                // await popupProps?.fetchArtDetail();
                globalModalState.updateArtDetailPrice(longChangedPrice)
                hideAllModals();
            }
            if (failure === "execution reverted: you must own target token") {

                alert(noTokensInWalletI18);
                return;
            } else if (failure === "tokenId is not registered on current wallet.") {
                alert(notOwnTokensInWalletAddressI18);
                return;
            } else if (failure === 'cancelled') {
                alert(`${failure}`)
                return;
            }

        } catch (e) {
            console.error("eeeeeeeeeeeeeeeeee", e);
        } finally {
            setGlobalLoading(false);
        }
    }

    useEffect(() => {
        getCurrentModalprops();
    }, []);

    useEffect(() => {
        toWon(popupProps?.artwork?.price, popupProps?.artwork?.currency, false, popupProps?.artwork?.id).then((res) => setWon(res));
    }, [popupProps?.artwork]);

    return (
        <div className="sm:hidden">
            <MainPopup width={530}>
                <PopupContainer>
                    <PopupHeader text={editSellPriceI18} />
                    <PopupContent>
                        <div className="mb-[30px]">
                            <div className="mt-[35px] mb-[45px]">
                                <CreatorProfile
                                    thumbnail_url={popupProps?.artwork.thumbnailUrl3x}
                                />
                                <div className="flex flex-col items-center mt-[10px]">
                                    <p className="text-[#fff] text-[14px] font-[400]">{popupProps?.artwork?.artworkName}</p>
                                    <span className="text-[#B0B0B0] text-[14px] font-[500]">{popupProps?.artwork?.authorName}</span>
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-[45px] border-b border-[#2E2E2E] pb-[20px] gap-[10px]">
                                    <div className="flex text-[14px] text-[#DDD] font-medium">
                                        {currentPriceI18}
                                    </div>
                                    <div className="bg-[#0F1111] flex flex-col justify-center py-[19px]">
                                        <div className="flex justify-center text-[16px] text-white font-[500] items-center gap-[2px]">
                                            <div className="relative flex items-center justify-center">
                                                <Image
                                                    width={14}
                                                    height={14}
                                                    src={popupProps?.artwork?.currency === "EYES" ? eyesicon : matic_logo}
                                                    alt="artwork-currency"
                                                />
                                            </div>
                                            <p className="sm:text-[18px] text-[16px]">{toEthers(thePrice)}</p>
                                            {popupProps?.artwork?.currency}
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
                            <div className="flex items-center py-[10px] font-normal text-[15px] ">
                                <h6 className="text-[14px] text-[#DDD] font-medium">{changeAmount}</h6>
                            </div>
                            <div className="flex flex-row">
                                <input
                                    value={newC ? newPrice : ''}
                                    onChange={(e) => handleNewPrice(e)}
                                    inputMode="numeric"
                                    placeholder="변경할 금액을 입력해주세요"
                                    pattern="[0-9]+"
                                    className="w-full bg-black border border-[#FB3873] font-[400] text-[#808080] sm:text-[16px] text-[12px] rounded-[5px] px-[14px] pt-[6px] pb-[8px]"
                                />{" "}
                                <span className="pl-2 flex justify-end mt-1 md:mt-0 text-[14px] text-[#fff] font-[400] md:justify-center items-center">
                                    {popupProps?.artwork?.currency}
                                </span>
                            </div>
                            <div className="flex justify-end  text-[14px] mt-1 md:mt-0">
                                <div className="flex items-center text-[ #5E5E5E] text-[12px]">
                                    <FaWonSign />
                                    {+convertedWon?.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </PopupContent>
                    <PopupActionButtons
                        yes={() => handleChangePrice()}
                        no={() => hideModal()}
                        btnTexts={{ yes: editChangePriceI18, no: cancel }}
                    />
                </PopupContainer>
            </MainPopup>
        </div>
    );
}

export default MobileEditSellPricePopup;
