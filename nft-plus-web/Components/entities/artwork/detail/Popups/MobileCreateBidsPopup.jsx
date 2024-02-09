import useArtworkTranslation from "locale/useArtworkTranslation";
import { useEffect, useState } from "react";
import usePopup from "Components/ui/popup/usePopup";
import { FaWonSign } from "react-icons/fa";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import useCurrency from "common/metamask/useCurrency";
const { default: MainPopup } = require("Components/ui/popup/MainPopup");
const { default: CreatorProfile } = require("../CreatorProfile");
import Image from "next/image";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";

const MobileCreateBidsPopup = ({
    creator_avatar,
    creator,
    thumbnail_url,
    title,
    fileType,
    imageUrl,
    price,
    currency,
    isAuction,
    auction,
    id
}) => {
    const { cancel, bidgsI18, bidButtonI18, placeBidI18 } = useArtworkTranslation();
    const [won, setWon] = useState(null);
    const [convertedWon, setConvertedWon] = useState(0);
    const { toWon, toWei, excreptWon, toEthers } = useCurrency();
    const [newC, setNewC] = useState(false);
    const thePrice = popupProps?.price
    const {
        handleShowModal,
        hideModal,
        MODAL_TYPES,
        getCurrentModalprops,
        popupProps
    } = usePopup();
    const [error, setError] = useState(false);
    const [newPrice, setNewPrice] = useState("");

    function handleNewPrice(e) {
        const inputPrice = e.target.value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*)\./g, "$1");
        setNewC(true);
        setNewPrice(inputPrice);
        const weiPrice = toWei(inputPrice);
        toWon(weiPrice, popupProps?.currency).then(res => {
            setConvertedWon(res)
        })
    }

    useEffect(() => {
        getCurrentModalprops();
        toWon(popupProps?.price, popupProps?.currency, true).then((res) =>
            setWon(res)
        );
    }, [popupProps]);

    function handleShowConfirmModal() {
        if (+newPrice <= +popupProps?.price) {
            setError(true);
            return;
        }
        handleShowModal(MODAL_TYPES.CREATE_CONFIRM_BID, {
            title: popupProps?.title,
            currency: popupProps?.currency,
            creator_avatar: popupProps?.creator_avatar,
            creator: popupProps?.creator,
            thumbnail_url: popupProps?.thumbnail_url,
            fileType: popupProps?.fileType,
            imageUrl: popupProps?.imageUrl,
            wei: popupProps?.wei,
            bids: newPrice,
            setBids: popupProps?.setBids,
            auction: popupProps?.auction,
            isAuction: popupProps?.isAuction,
            id: popupProps?.id,
            price: popupProps?.price,
            won: +convertedWon?.toFixed(2)
        });
    }

    return (
        <>
            <MainPopup width={360}>
                <PopupContainer>
                    <PopupHeader text={placeBidI18} />
                    {popupProps && (
                        <PopupContent>
                            <div className="flex flex-col items-center justify-center pt-[35px] mb-[60px]">
                                <div className="sm:mb-[25px] sm:bg-black sm:max-w-[470px]">
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
                                <div className="flex flex-col w-full mt-[15px]">
                                    <div className="flex text-[14px] text-[#DDD] font-medium">
                                        {bidgsI18}
                                    </div>
                                    <div className="mt-[10px]">
                                        <div className="h-full">
                                            <div className="flex flex-col justify-end sm:mb-[30px]">
                                                <div className="flex gap-[5px] border-b border-[#2E2E2E] pb-[20px]">
                                                    <input
                                                        value={newPrice}
                                                        maxLength={10}
                                                        onChange={handleNewPrice}
                                                        className={`w-full bg-black border ${error ? "border-[#FB3873]" : "border-[#5C5C5C]"
                                                            } font-[400] text-[#808080] sm:text-[16px] text-[12px] rounded-[5px] px-[10px] pt-[6px] pb-[8px]`}
                                                        placeholder="입찰가를 입력해주세요"
                                                    />
                                                    <div className="flex flex-row">
                                                        <div className="flex items-center justify-center text-[#5E5E5E] text-[12px] font-[400]">
                                                            {popupProps?.currency === "MATIC" ? (
                                                                <FaWonSign />
                                                            ) : (
                                                                <FaWonSign />
                                                            )}
                                                        </div>
                                                        <div className="flex items-center justify-center text-[#5E5E5E] text-[12px] font-[400]">
                                                            {+convertedWon?.toFixed(2)}
                                                        </div>
                                                    </div>
                                                    <span className="flex items-center text-[#fff] font-[700] text-[14px]">
                                                        {popupProps?.currency}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PopupContent>
                    )}
                    <PopupActionButtons
                        yes={handleShowConfirmModal}
                        no={() => hideModal()}
                        btnTexts={{ no: cancel, yes: bidButtonI18 }}
                    />
                </PopupContainer>
            </MainPopup>
        </>
    );
};

export default MobileCreateBidsPopup;
