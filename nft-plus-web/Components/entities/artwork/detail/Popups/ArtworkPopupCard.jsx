/**
 * @createdBy Duka 2022/6
 */
import React, { useState, useEffect } from "react";
import { FaWonSign } from "react-icons/fa";
import usePopup from "Components/ui/popup/usePopup";
import Image from "next/image";
import Web3 from "web3";
import defpro from "public/def_pro.png";
import defart from "public/no_photo.png";
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import useCurrency from "common/metamask/useCurrency";
import useArtworkTranslation from "locale/useArtworkTranslation";

function ArtworkPopupCard(props) {
    const {currentPriceI18} = useArtworkTranslation();
    const { toWon, excreptWon } = useCurrency();
    const [won, setWon] = useState(null);
    const {
        getCurrentModalprops,
        popupProps
    } = usePopup();
    const {isEdittingPrice} = props

    useEffect(() => {
        getCurrentModalprops();
    }, []);

    useEffect(() => {
        toWon(popupProps?.artwork?.price, popupProps?.artwork?.currency, false, popupProps?.artwork?.id).then((res) => setWon(res));
    }, [popupProps]);

    return (
        <div className="flex items-center text-white justify-between py-[20px] px-[0px]">
            <div className="flex w-full gap-[16px] bg-black p-[15px]">
                <div className="relative w-1/3 max-w-[134px] max-h-[134px] overflow-hidden rounded-[5px]">
                    {popupProps?.artwork?.fileType !== "IMAGE" ? (
                        popupProps?.artwork?.fileType === "VIDEO" ? (
                            <div className="relative h-full w-full flex justify-center">
                                <video
                                    className={`w-full h-full rounded-[5px] object-cover bg-[#181A1A]`}
                                    src={
                                        popupProps?.artwork?.imageUrl
                                            ? popupProps?.artwork?.imageUrl
                                            : defpro
                                    }
                                    loop
                                    autoPlay
                                    muted
                                    playsInline
                                    alt={popupProps?.artwork?.imageUrl}>
                                    <source
                                        src={
                                            popupProps?.artwork?.imageUrl
                                                ? popupProps?.artwork?.imageUrl
                                                : defpro
                                        }
                                        type="video"
                                    />
                                </video>
                                <div className="absolute bottom-0 p-2 mr-28">
                                    <PlayCircle
                                        style={{ width: "24px", height: "24px" }}
                                        className="w-[24px] h-[24px]"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="relative h-full w-full flex justify-center">
                                <img
                                    src={
                                        popupProps?.artwork?.thumbnailUrl3x
                                            ? popupProps?.artwork?.thumbnailUrl3x
                                            : "/art1.jpg"
                                    }
                                    width="100%"
                                    height="100%"
                                    className="w-full h-full rounded-[5px] object-cover"
                                    alt="artwork-thumbnail"
                                />
                                <div className="absolute bottom-0 p-2 mr-28">
                                    <VolumeUp
                                        style={{ width: "24px", height: "24px" }}
                                        className="w-[24px] h-[24px]"
                                    />
                                </div>
                            </div>
                        )
                    ) : (
                        <Image
                            height={134}
                            width={134}
                            priority
                            layout="fill"
                            unoptimized
                            src={
                                popupProps?.artwork?.imageUrl
                                    ? popupProps?.artwork?.imageUrl
                                    : defart
                            }
                            objectFit="cover"
                            alt="imageUrl"
                        />
                    )}
                </div>
                <div className="w-2/3">
                    <h4 className="text-[16px] h-[46px]">
                        {popupProps?.artwork?.artworkName}
                    </h4>
                    <div className="flex flex-row justify-between">
                        <div className="flex gap-[4px] lg:mt-[11px] mt-[12px]">
                            {isEdittingPrice? (<div className="sm:text-[16px] text-[14px] font-[300] text-white mr-[4px] mt-[3px]">{currentPriceI18}</div>):("")}
                            <div className="relative flex items-center sm:h-[17px] sm:w-[17px] w-[14px] h-[14px] my-[6px]">
                                {popupProps?.artwork?.type === "NOT_SELL" ? null : (
                                    <Image
                                        src={
                                            popupProps?.artwork?.currency == "EYES"
                                                ? eyesicon
                                                : matic_logo
                                        }
                                        alt="artwork-currency"
                                    />
                                )}
                            </div>
                            <div className="flex flex-row">
                                <div className="lg:text-[18px] md:text-[16px] text-[14px] text-[#DDD] font-bold">
                                    {Web3.utils.fromWei(
                                        (popupProps?.artwork?.price || "0").toString(),
                                        "ether"
                                    )}
                                </div>{" "}
                                <div className="lg:text-[18px] md:text-[16px] text-[14px] text-[#DDD] font-bold">
                                    {popupProps?.artwork?.currency}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center lg:text-[14px] md:text-[14px] text-[10px] text-[#5E5E5E] font-[400] mt-4">
                            {popupProps?.artwork?.price !== "0" && (
                                <>
                                    <FaWonSign />
                                    {excreptWon(won, popupProps?.artwork?.id)}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center lg:mt-[11px] mt-[8px] border-t border-[#4E4E4E] pt-[10px] relative">
                        <div className="relative w-[31px] h-[31px] rounded-full overflow-hidden bg-[#333] border-[#999] border">
                            <Image
                                priority
                                unoptimized
                                layout="fill"
                                objectFit="cover"
                                src={
                                    popupProps?.artwork?.ownerProfileImg
                                        ? popupProps?.artwork?.ownerProfileImg
                                        : defpro
                                }
                                alt="ownerProfileImg"
                            />
                        </div>
                        <span className="font-normal ml-2 text-[#B1B1B1] lg:text-[14px] md:text-[14px] text-[10px]">
                            {popupProps?.artwork?.authorName}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtworkPopupCard;
