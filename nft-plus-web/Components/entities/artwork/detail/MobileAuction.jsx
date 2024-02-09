import Image from "next/image";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AuctionInformation from "./AuctionInformation";
import useCommonTranslation from "locale/useCommonTranslation";
import pen from "public/icon-pen.svg";
import stop from "public/stop.png";
import correct from "public/correct.png";
import BiddingStatus from "./BiddingStatus";
import { FaWonSign } from "react-icons/fa";
import Web3 from "web3";
import { useRouter } from "next/router";
// import useAuction
import { useGlobalContext } from "common/global/useGlobalContext";
import usePopup from "Components/ui/popup/usePopup";
import useArtDetail from "./useArtDetail";
import useCurrency from "common/metamask/useCurrency";
import { ColorfullBtn } from "Components/ui/button/colorfullBtn";

const MobileAuction = ({ id, init }) => {
    const {
        auctionInformationI18,
        biddingStatusI18,
        bidButtonI18,
        auctionInProgressI18
    } = useArtworkTranslation();
    const { MODAL_TYPES, handleShowModal, hideModal, setGlobalModalState } = usePopup();
    const { artDetail, isOwnedArtork, getArtDetail } = useArtDetail();
    const [tab, setTab] = useState(true);
    const { authUser } = useGlobalContext();
    const [bids, setBids] = useState("");
    const [remove, setRemove] = useState(false);

    const checkIsUserLogedIn = () => {
        if (!authUser) {
            handleShowModal(MODAL_TYPES.GO_TO_LOGIN);
        } else {
            handleShowModal(MODAL_TYPES.CREATE_BIDS, {
                setBids,
                title: artDetail?.artworkName,
                price: Web3.utils.fromWei(artDetail?.auction.price.toString(), "ether"),
                currency: artDetail.currency,
                fileType: artDetail.fileType,
                creator_avatar: artDetail?.authorProfileImg,
                creator: artDetail?.authorName,
                thumbnail_url: artDetail?.thumbnailUrl2x,
                wei: artDetail?.auction.price,
                imageUrl: artDetail?.imageUrl,
                auction: artDetail?.auction,
                id: artDetail?.id,
                isAuction: artDetail?.isAuction,
                tamtamApproved: artDetail?.tamtamApproved
            });
            setGlobalModalState(prev => ({ ...prev, getArtDetail: (e) => getArtDetail(e) }))

        }
    };

    return (
        <div className="pt-[30px] sm:pb-2 w-full">
            <div className="">
                <AuctionInformation
                    id={id}
                    price={artDetail?.auction.price}
                    type={artDetail?.type}
                    currency={artDetail?.currency}
                    auction={artDetail?.auction}
                />
            </div>
            <div className="mt-[30px]">
                <BiddingStatus auction={artDetail?.auction} />
            </div>
         {/*<div className="py-2 w-full gap-2">
                {init ? (
                    <div className="w-full h-16 flex gap-2">
                        <div className="w-full h-[47px] rounded-md bg-gray-700 animate-pulse" />
                    </div>
                ) : authUser?.id === artDetail?.ownerId ? (
                    <>
                        {artDetail?.auction.status === "ONGOING" && (
                            <button
                                disabled
                                type="button"
                                className={`detailBtn w-full sm:h-[47px] h-[42px] bg-[#616161] text-white rounded-md py-2 px-4`}>
                                <p className="font-[500  ] text-white sm:text-[19px] text-[15px]">{auctionInProgressI18}</p>
                            </button>
                        )}
                    </>
                ) : (
                    artDetail?.auction.status === "ONGOING" && (
                        // <Button
                        //   width="w-full bg-gradient-to-r from-[#FE8243] via-[#FF5675] to-[#FE25D5} border-none"
                        //   onClick={() => checkIsUserLogedIn()}
                        //   value={`${bidButtonI18}`}
                        // />
                        <ColorfullBtn
                            text={bidButtonI18}
                            onClick={() => checkIsUserLogedIn()}
                        />
                    )
                )}
            </div>
                    */}
        </div>
    );
};

const AuctionHoverButton = ({ auction, id, setRemove, currency }) => {
    const router = useRouter();
    const { cahngeTermI18, stopSaleI18 } = useCommonTranslation();
    const [show, setShow] = useState(false);
    const { MODAL_TYPES, handleShowModal } = usePopup();
    const { getArtDetail, artDetail } = useArtDetail();
    const chargeTerm = () => {
        if (auction?.bids?.length > 0 || auction?.bidRegist) {
            handleShowModal(MODAL_TYPES.AUCTION_SALE_CONDITION);
            return;
        }
        router.push(`/art/sellart-for-marketplace/${artDetail?.id}`);
    };

    const stopAuction = () => {
        if (auction.bids.length > 0) {
            handleShowModal(MODAL_TYPES.AUCTION_SALE_CONDITION);
        } else {
            handleShowModal(MODAL_TYPES.REMOVE_AUCTION, {
                auction: auction,
                currency: currency,
                artworkId: id,
                upDateArtDetail: () => getArtDetail(artDetail?.id)
            });
            setRemove(true);
        }
    };

    return (
        <div
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className={`absolute bottom-0 right-0 p-[5px] rounded-full bg-opacity-50  group transition duration-300 flex items-center`}>
            <div className="h-[26px] relative flex">
                <Image
                    src={pen.src}
                    width="26px"
                    height="26px"
                    alt="pen"
                    className="block"
                />
            </div>
            <motion.div
                transition={{ duration: 0.25, ease: "linear" }}
                animate={{
                    scale: show ? [0, 1] : [1, 0]
                }}
                style={{ top: "calc(100%)", transformOrigin: "top right" }}
                className={`absolute w-[147px] transition duration-[350ms] ${!show ? "opacity-0" : "opacity-100"
                    } px-[10px] py-[15px] text-white font-[500] text-[16px]  bg-[rgba(0,0,0,0.75)] right-0 rounded-[10px] drop-shadow-xl`}>
                <div
                    className="flex items-center h-full cursor-pointer gap-[5px] pb-[8px]"
                    onClick={chargeTerm}>
                    <Image
                        src={correct.src}
                        width="14px"
                        height="14px"
                        alt="pen"
                        className="block"
                    />
                    <p className="text-[16px] text-white font-[500]">{cahngeTermI18}</p>
                </div>
                <div
                    className="flex items-center h-full cursor-pointer gap-[5px]"
                    onClick={stopAuction}>
                    <Image
                        src={stop.src}
                        width="14px"
                        height="14px"
                        alt="pen"
                        className="block"
                    />
                    <p className="text-[16px] text-white font-[500]">{stopSaleI18}</p>
                </div>
            </motion.div>
        </div>
    );
};

export const ArtworkWallet = ({ currency, price }) => {
    // const { maticAsWon, converting, eyesAsWon } = useConverter(currency);
    const [convertedWon, setConvertedWon] = useState(null);
    const { toWon } = useCurrency();

    useEffect(() => {
        toWon(price).then((res) => setConvertedWon(res));
    }, []);

    return (
        <div className="flex items-center justify-center text-[#999] text-[14px] font-[400] ">
            <FaWonSign />
            {convertedWon}
        </div>
    );
};

export default MobileAuction;
