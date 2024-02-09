import React, { useEffect, useState, useRef } from 'react'
import Link from "next/link";
import Image from "next/image";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import star from "public/star.png";
import defPro from "public/def_pro.png";
import verified from "public/verified.png";
import pink from "public/pink.png";
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWonSign } from "react-icons/fa";
import { subStr } from "utils/string";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useArtwork from 'Components/entities/artwork/useArtwork';
import useCurrency from 'common/metamask/useCurrency';

function ArtistRecentArtworkCard({ artwork }) {
    const {
        id,
        thumbnailUrl3x,
        artworkName,
        name, // зарим artwork - той холбоотой api нь artworkName эсвэл name гэж ирж бган бна
        tamtamApproved,
        currency,
        copyrightRegistered,
        exposeVerify,
        price,
        authorProfileImg,
        authorId,
        authorName,
        heartCount,
        isAuction,
        auction,
        fileType,
        imageUrl,
        ipfsUrl,
        imageFile,
        hearted,
        type,
    } = artwork
    const theName = artworkName || name;
    const thePrice = isAuction ? auction?.price : price
    const { unsoldWorkI18 } = useArtworkTranslation();
    const [won, setWon] = useState(null)
    const { toEthers, toWon, excreptWon } = useCurrency()
    const { handleArtworkHeart } = useArtwork();
    const [isHeighter, setIsHeighter] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const [imgWidth, setImgWidth] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const [recentArt, setRecentArt] = useState({
        heartCount: +heartCount,
        isHearted: hearted,
        convertedWon: null
    });
    const imageRef = useRef(null);
    const videoRef = useRef();
    const containerRef = useRef();
    const heartObj = {
        artwork: artwork,
        recentArt,
        setRecentArt
    }

    useEffect(() => {
        if (typeof window !== undefined) {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.offsetHeight);
                setContainerWidth(containerRef.current.offsetWidth);
            }
        }
    }, [isHeighter]);

    const onLoadImg = ({ target: img }) => {
        if (imageRef) {
            if (img.naturalWidth > img.naturalHeight) {
                setIsHeighter(false);
            } else {
                setIsHeighter(true);
            }
        }
        setImgWidth(img.naturalWidth);
        setImgHeight(img.naturalHeight);
    };

    const onLoadVideo = () => {
        if (videoRef.current && fileType === "VIDEO") {
            if (videoRef.current.videoWidth > videoRef.current.videoHeight) {
                setIsHeighter(false);
            } else {
                setIsHeighter(true);
            }
            setImgWidth(videoRef.current.videoWidth);
            setImgHeight(videoRef.current.videoHeight);
        }
    };

    useEffect(() => {
        if (videoRef.current && fileType === "VIDEO") {
            setImgWidth(videoRef.current.videoWidth);
            setImgHeight(videoRef.current.videoHeight);
        }
    }, [videoRef, videoRef.current]);

    useEffect(() => {
        toWon(thePrice, currency).then(res => setWon(res))
        setRecentArt({
            ...recentArt,
            isHearted: hearted,
            heartCount: heartCount
        });
    }, [])

    return (
        <div className={`hidden md:flex w-full sm:rounded-[20px] rounded-[9.576px] overflow-hidden recent-work lg:h-[515px] sm:h-[515px] h-[258px] bg-black`}>
            <div className="w-full lg:min-h-[330px] sm:min-h-[330px] min-h-[158px] relative sm:max-h-[330px] max-h-[158px]">
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    ref={containerRef}
                    className="relative h-full w-full cursor-pointer">
                    <Link passHref href={`/art/preview/${id}`}>
                        {fileType === "VIDEO" ? (
                            <div className={`flex justify-center items-center ${isHover && "sm:rounded-[20px] rounded-[9.756px]"
                                } overflow-hidden  w-full h-full object-cover`}>
                                <video
                                    className={` relative sm:rounded-t-[20px] rounded-t-[9.576px] z-0 ${isHover && "sm:rounded-[20px] rounded-[9.756px]"
                                        } transform transition duration-500 object-cover`}
                                    src={imageUrl}
                                    loop
                                    autoPlay
                                    muted
                                    ref={videoRef}
                                    playsInline
                                    style={{
                                        height: imgHeight
                                            ? isHover
                                                ? isHeighter
                                                    ? `100%`
                                                    : `${(((imgHeight * containerWidth) / imgWidth) * 100) /
                                                    containerHeight
                                                    }%`
                                                : isHeighter ? `${(((imgHeight * containerWidth) / imgWidth) * 100 * 1.1) /
                                                    containerHeight
                                                    }%` : `100%`
                                            : "min-content",
                                        width: imgWidth
                                            ? isHover
                                                ? !isHeighter
                                                    ? `100%`
                                                    : `${(((imgWidth * containerHeight) / imgHeight) * 100) /
                                                    containerWidth
                                                    }%`
                                                : !isHeighter ? `${(((imgWidth * containerHeight) / imgHeight) * 100) * 1.1 /
                                                    containerWidth
                                                    }%` : `100%`
                                            : "min-content",
                                        overflow: "hidden",
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                    onLoadedData={onLoadVideo}
                                    alt={imageUrl}>
                                    <source src={imageUrl} type="video"
                                        style={{
                                            height: imgHeight
                                                ? isHover
                                                    ? isHeighter
                                                        ? `100%`
                                                        : `${(((imgHeight * containerWidth) / imgWidth) * 100) /
                                                        containerHeight
                                                        }%`
                                                    : isHeighter ? `${(((imgHeight * containerWidth) / imgWidth) * 100 * 1.1) /
                                                        containerHeight
                                                        }%` : `100%`
                                                : "min-content",
                                            width: imgWidth
                                                ? isHover
                                                    ? !isHeighter
                                                        ? `100%`
                                                        : `${(((imgWidth * containerHeight) / imgHeight) * 100) /
                                                        containerWidth
                                                        }%`
                                                    : !isHeighter ? `${(((imgWidth * containerHeight) / imgHeight) * 100) * 1.1 /
                                                        containerWidth
                                                        }%` : `100%`
                                                : "min-content",
                                            overflow: "hidden",
                                            transition: "all 0.3s ease-in-out",
                                        }}
                                    />
                                </video>
                                <div className="absolute AUDIO bottom-0 left-[6px] p-2">
                                    <PlayCircle
                                        style={{ width: "24px", height: "24px" }}
                                        className="w-[24px] h-[24px]"
                                    />
                                </div>
                            </div>
                        ) : fileType === "AUDIO" ? (
                            <div
                                className={`flex justify-center items-center ${isHover && "sm:rounded-[20px] rounded-[9.756px]"
                                    } overflow-hidden w-full h-full object-cover`}>
                                <img
                                    className={`relative sm:rounded-t-[20px] rounded-t-[9.576px] z-0 ${isHover && "rounded-[20px]"} transform transition duration-500 object-cover`}
                                    src={thumbnailUrl3x ? thumbnailUrl3x : def}
                                    alt="work1"
                                    onLoad={onLoadImg}
                                    ref={imageRef}
                                    style={{
                                        height: imgHeight
                                            ? isHover
                                                ? isHeighter
                                                    ? `100%`
                                                    : `${(((imgHeight * containerWidth) / imgWidth) * 100) /
                                                    containerHeight
                                                    }%`
                                                : isHeighter ? `${(((imgHeight * containerWidth) / imgWidth) * 100 * 1.1) /
                                                    containerHeight
                                                    }%` : `100%`
                                            : "min-content",
                                        width: imgWidth
                                            ? isHover
                                                ? !isHeighter
                                                    ? `100%`
                                                    : `${(((imgWidth * containerHeight) / imgHeight) * 100) /
                                                    containerWidth
                                                    }%`
                                                : !isHeighter ? `${(((imgWidth * containerHeight) / imgHeight) * 100) * 1.1 /
                                                    containerWidth
                                                    }%` : `100%`
                                            : "min-content",
                                        overflow: "hidden",
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                />
                                <div className="absolute AUDIO bottom-0 left-[6px]  p-2">
                                    <VolumeUp
                                        style={{ width: "24px", height: "24px" }}
                                        className="w-[24px] h-[24px]"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={`flex justify-center items-center h-full object-cover `}>
                                <img
                                    className={`relative sm:rounded-t-[20px] rounded-t-[9.576px] z-0 ${isHover && "sm:rounded-[20px] rounded-[9.756px]"
                                        } transform transition duration-500  object-cover p-0 m-0`}
                                    ref={imageRef}
                                    src={thumbnailUrl3x ? thumbnailUrl3x : def}
                                    onLoad={onLoadImg}
                                    alt="work1"
                                    style={{
                                        height: imgHeight
                                            ? isHover
                                                ? isHeighter
                                                    ? `100%`
                                                    : `${(((imgHeight * containerWidth) / imgWidth) * 100) /
                                                    containerHeight
                                                    }%`
                                                : isHeighter ? `${(((imgHeight * containerWidth) / imgWidth) * 100 * 1.1) /
                                                    containerHeight
                                                    }%` : `100%`
                                            : "min-content",
                                        width: imgWidth
                                            ? isHover
                                                ? !isHeighter
                                                    ? `100%`
                                                    : `${(((imgWidth * containerHeight) / imgHeight) * 100) /
                                                    containerWidth
                                                    }%`
                                                : !isHeighter ? `${(((imgWidth * containerHeight) / imgHeight) * 100) * 1.1 /
                                                    containerWidth
                                                    }%` : `100%`
                                            : "min-content",
                                        overflow: "hidden",
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                />
                            </div>
                        )}
                    </Link>
                </div>
            </div>
            <div className={`lg:py-[15px] sm:py-[15px] py-[7px] lg:px-[20px] sm:px-[20px] px-[10px] flex-1 bg-black z-0`}>
                <div className="w-full flex flex-col text-left h-full">
                    <div
                        id="status"
                        className="flex flex-row-reverse justify-between">
                        <div className="flex mt-1 gap-[5px]">
                            {copyrightRegistered && (
                                <div className="icon">
                                    <Image layout="fill" objectFit="cover" src={pink} alt="coverIcon" />
                                </div>
                            )}
                            {exposeVerify && (
                                <div className="icon">
                                    <Image
                                        layout="fill"
                                        objectFit="cover"
                                        src={verified}
                                        alt="verified"
                                    />
                                </div>
                            )}
                        </div>
                        <h5
                            className={`lg:text-[16px] sm:text-[16px] text-[10px] text-[#fff] font-medium lg:h-[46px] sm:h-[46px] h-[28px] lg:mb-[37px] sm:mb-[37px] mb-[10px]`}>
                            <Link href={`/art/preview/${id}`} passHref>
                                <a>{subStr(theName, 20)}</a>
                            </Link>
                        </h5>
                    </div>
                    {/* {isAuction && auction?.status === "ONGOING" && (
            <span>{currentPriceI18}</span>
         )} */}
                    <div className="market">
                        <div
                            className={`flex gap-1 justify-between w-full sm:items-start flex-row`}>
                            {isAuction && auction?.status !== "ONGOING" ? (
                                <div className="mb-[13px]">
                                    <h3 className="text-[24px] text-[#C2C2C2] font-[700] leading-9 h-[35px]">
                                        {auction?.startDate.split("-")[1]}
                                        {monthI18}
                                        {auction?.startDate.split("-")[2].split("T")[0]}
                                        {datePriceI18}
                                    </h3>
                                </div>
                            ) : (
                                <>
                                    {type == "NOT_SELL" ? (
                                        <div
                                            className={`flex gap-1 justify-between w-full sm:items-start flex-row sm:mb-[10px] mb-[4px]`}>
                                            <div className="flex gap-1 lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDDDDD] font-bold">
                                                <p className="lg:text-[18px] sm:text-[18px] text-[10px] text-[#7C7C7C] font-[500]">{unsoldWorkI18}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div
                                                className={`flex gap-1 justify-between w-full sm:items-start flex-row sm:mb-[10px] sm:mt-[6px]`}>
                                                <div className="flex items-center gap-1 lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDDDDD] font-bold">
                                                    <div className="relative flex items-center justify-center mr-[5px] sm:w-[17px] sm:h-[17px] w-[8px] h-[8px]">
                                                        <Image
                                                            src={currency === "EYES" ? eyesicon : matic_logo}
                                                            alt="currency"
                                                        />
                                                    </div>
                                                    <p className="lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold">{toEthers(isAuction ? auction?.price : price)}</p>
                                                    <p className="lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold">
                                                        {currency}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            {(isAuction ? auction?.status !== "UPCOMING" : type !== "NOT_SELL")
                                &&
                                <div className="flex items-center lg:text-[14px] sm:text-[14px] text-[10px] text-[#5E5E5E] font-[400] sm:mb-[10px] sm:mt-[6px]">
                                    <FaWonSign />
                                    {excreptWon(won)}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row items-stretch border-t border-[#656565] pt-[10px] xs:pt-[5px] pb-[15px]">
                        <div className="flex flex-1 w-full items-center">
                            <div
                                className={`card-avatarImg relative items-center`}>
                                <Image
                                    unoptimized
                                    alt="authorProfileImg"
                                    layout="fill"
                                    objectFit="cover"
                                    src={authorProfileImg ? authorProfileImg : defPro}
                                />
                            </div>
                            <p className="ml-2 sm:text-[#fff] text-[#B1B1B1] lg:text-[14px] sm:text-[14px] text-[10px] flex-1 font-[400] whitespace-nowrap">
                                <Link href={`/artist/${authorId}`} passHref>
                                    <a>{subStr(authorName, 8)}</a>
                                </Link>
                            </p>
                            {tamtamApproved && (
                                <div className="icon">
                                    <Image layout="fill" objectFit="cover" src={star} alt="star" />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 justify-end w-full items-center">
                            <div className="flex items-center gap-1">
                                {recentArt.isHearted ? (
                                    <AiFillHeart
                                        onClick={() => handleArtworkHeart(heartObj)}
                                        className="heartIcon"
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        onClick={() => handleArtworkHeart(heartObj)}
                                        className="heartIcon"
                                    />
                                )}
                                <p
                                    className={`font-[400] text-[#ABABAB] lg:text-[14px] sm:text-[14px] text-[10px]`}>
                                    {recentArt?.heartCount}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistRecentArtworkCard;