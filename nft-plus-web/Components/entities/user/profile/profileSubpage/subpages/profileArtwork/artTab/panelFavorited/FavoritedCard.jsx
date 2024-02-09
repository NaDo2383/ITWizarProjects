import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import star from "public/star.png";
import defPro from "public/def_pro.png";
import verified from "public/verified.png";
import pink from "public/pink.png";
import { motion } from "framer-motion";
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWonSign } from "react-icons/fa";
import { subStr } from "utils/string";
import useCommonTranslation from "locale/useCommonTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useArtwork from 'Components/entities/artwork/useArtwork';
import useCurrency from 'common/metamask/useCurrency';

function FavoritedCard(props) {
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
    authorImage,
    authorId,
    authorName,
    heartCount,
    tradeCount,
    contractCount,
    isAuction,
    auction,
    fileType,
    imageUrl
  } = props
  const theName = artworkName || name;
  const { licenseAgreementI18, ownershipTransactionI18 } = useCommonTranslation();
  const { caseI18, currentPriceI18 } = useArtworkTranslation();
  const [won, setWon] = useState(null)
  const { toEthers, toWon, excreptWon } = useCurrency()
  const [isLis, setIsLis] = useState(false);
  const { sendHearth, unSendHearth, handleArtworkHeart } = useArtwork();
  const [recentArt, setRecentArt] = useState({
    heartCount: +heartCount,
    isHearted: hearted,
    convertedWon: null,
  });
  const isWei = isAuction ? (auction.price ? true : false) : false

  const heartHandler = async (artworkId, hearted) => {
    if (recentArt.isHearted) {
      unSendHearth(artworkId);
      setRecentArt({
        ...recentArt,
        isHearted: false,
        heartCount: +recentArt?.heartCount - 1
      });
    } else {
      sendHearth(artworkId);
      setRecentArt({
        ...recentArt,
        isHearted: true,
        heartCount: +recentArt?.heartCount + 1
      });
    }
  };

  const heartObj = {
    artwork: props,
    recentArt,
    setRecentArt
  }

  useEffect(() => {
    const newPrice = toEthers(price)
    toWon(price, currency, isWei).then(res => setWon(res))
  }, [])

  return (
    <div className={`hidden md:flex w-full h-full bg-white rounded-2xl overflow-hidden border recent-work max-h-[616px]`}>
      <div className="w-full h-2/3 relative">
        <div className="relative h-full w-full cursor-pointer">
          <Link passHref href={`/art/preview/${id}`}>
            {fileType !== "IMAGE" ? (
              fileType === "VIDEO" ? (
                <div className="relative h-full w-full flex justify-center">
                  <video
                    className={`rounded-xl object-cover`}
                    src={imageUrl}
                    loop
                    autoPlay
                    muted
                    playsInline
                    alt={imageUrl}>
                    <source src={imageUrl} type="video" />
                  </video>
                  <div className="absolute AUDIO bottom-0 left-[6px] p-2">
                    <PlayCircle
                      style={{ width: "24px", height: "24px" }}
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full flex justify-center">
                  <img
                    src={thumbnailUrl3x ? thumbnailUrl3x : '/art1.jpg'}
                    width="100%"
                    height="100%"
                    className="w-[160px] h-[135px] rounded-xl object-cover"
                    alt="thumbnailUrl3x"
                  />
                  <div className="absolute bottom-0 p-2">
                    <VolumeUp
                      style={{ width: "24px", height: "24px" }}
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                </div>
              )
            ) : (
              <a className="relative">
                <img
                  src={thumbnailUrl3x ? thumbnailUrl3x : '/art1.jpg'}
                  className="w-full h-full object-cover"
                  width="100%"
                  height="100%"
                  alt="thumbnailUrl3x"
                />
                {/* {isAuction && auction?.status === "ONGOING" && (
                  <AuctionDate auction={auction} />
                )} */}
              </a>
            )}
          </Link>
        </div>
        <div
          onMouseEnter={() => setIsLis(true)}
          onMouseLeave={() => setIsLis(false)}
          className={`absolute top-7 right-6 ${isLis ? "bg-white" : "bg-black"
            } py-[7.5px] px-[10px] rounded-full bg-opacity-50 cursor-pointer group transition duration-300 hover:bg-white flex items-center gap-1`}>
          <div
            className={`motion-dots ${isLis ? "bg-[#666]" : "bg-white"
              } transition duration-300`}></div>
          <div
            className={`motion-dots ${isLis ? "bg-[#666]" : "bg-white"
              } transition duration-300`}></div>
          <div
            className={`motion-dots ${isLis ? "bg-[#666]" : "bg-white"
              } transition duration-300`}></div>
          <motion.div
            transition={{ duration: 0.25, ease: "linear" }}
            animate={{
              scale: isLis ? [0, 1] : [1, 0]
            }}
            style={{ top: "calc(100% + 10px)", transformOrigin: "top right" }}
            className={`absolute w-[200px] transition duration-[350ms] ${!isLis ? "opacity-0" : "opacity-100"
              }  px-4 py-3 text-[#333] font-[500]  text-[15px] bg-white bg-opacity-80 right-0 rounded-xl`}>
            <div className="absolute border-y-[5px] border-x-8 border-white border-t-transparent border-l-transparent bottom-full right-4 border-opacity-80"></div>

            <div className="flex items-center justify-between">
              <p>{ownershipTransactionI18}</p>
              <p>
                {tradeCount ? tradeCount : 0}
                {caseI18}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>{licenseAgreementI18}</p>
              <p>
                {contractCount ? contractCount : 0}
                {caseI18}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className={`p-5 flex-1 rounded-b-2xl`}>
        <div className="w-full flex flex-col text-left h-full">
          <div
            id="status"
            className="flex-col flex md:flex-row-reverse justify-between">
            <div className="flex mt-1 gap-[5px]">
              {copyrightRegistered && (
                <div className="icon">
                  <Image layout="fill" objectFit="cover" src={pink} alt="pink" />
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
            <h4
              className={`text-[20px] font-[600] md:text-[18px] mr-10 h-[54px]`}>
              <Link href={`/art/preview/${id}`} passHref>
                <a className="text-[20px]">{subStr(theName, 20)}</a>
              </Link>
            </h4>
          </div>
          {isAuction && auction?.status === "ONGOING" && (
            <span>{currentPriceI18}</span>
          )}
          <div className="market mt-[6px] pb-[10px]">
            <div
              className={`flex gap-1 justify-between w-full sm:items-start flex-row`}>
              {isAuction && auction?.status !== "ONGOING" ? (
                <div className="mb-[13px]">
                  <h4 className="text-[24px] text-[#C2C2C2] font-[700] leading-9 h-[35px]">
                    {auction?.startDate.split("-")[1]}
                    {monthI18}
                    {auction?.startDate.split("-")[2].split("T")[0]}
                    {datePriceI18}
                  </h4>
                </div>
              ) : (
                <div className="flex gap-1 text-[20px] text-[#4E4949] font-[700]">
                  <div className="relative flex items-center justify-center mr-[5px]">
                    <Image
                      width={21}
                      height={21}
                      src={currency === "EYES" ? eyesicon : matic_logo}
                      alt="currency"
                    />
                  </div>
                  <p>{toEthers(isAuction ? auction?.price : price)}</p>
                  {currency}
                </div>
              )}
              <div className="flex items-center text-[18px] text-[#8E8E8E] font-[400]">
                <FaWonSign />
                {excreptWon(won)}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-stretch">
            <div className="flex flex-1 w-full items-center">
              <div
                className={`card-avatarImg relative items-center`}>
                <Image
                  unoptimized
                  alt="authorImage"
                  layout="fill"
                  objectFit="cover"
                  src={authorImage ? authorImage : defPro}
                />
              </div>
              <p className="ml-2 text-[#444] text-base md:text-lg truncate flex-1 sm:text-lg  font-[400]">
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
                  className={`text-[16px] font-[400] text-[#555] md:text-[16px] ml-px`}>
                  {heartCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoritedCard