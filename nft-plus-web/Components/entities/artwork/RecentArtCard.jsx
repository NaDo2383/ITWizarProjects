import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import star from "public/star.png";
import defPro from "public/def_pro.png";
import verified from "public/verified.png";
import pink from "public/pink.png";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWonSign } from "react-icons/fa";
import { subStr } from "utils/string";
import AuctionDate from "./AuctionDate";
import useCurrency from "common/metamask/useCurrency";
import RecentCartImage from "./RecentCartImg";
import useArtwork from "./useArtwork";

const RecentArtCard = (props) => {
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
    authorId,
    authorName,
    isAuction,
    auction,
    hearted,
    heartCount,
    imageUrl,
    fileType,
    authorImage
  } = props;
  const theName = artworkName || name;
  const { currentPriceI18 } = useArtworkTranslation();
  const [won, setWon] = useState(null);
  const { sendHearth, unSendHearth } = useArtwork();
  const { toEthers, toWon, excreptWon } = useCurrency();
  const [recentArt, setRecentArt] = useState({
    heartCount: +heartCount,
    isHearted: hearted,
    convertedWon: null
  });

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

  useEffect(() => {
    const thePrice = isAuction ? auction?.price : price;
    toWon(thePrice, currency, false, id).then((res) => setWon(res));
  }, []);

  return (
    <div
      className={`w-full h-full bg-black rounded-[20px] overflow-hidden recent-work`}>
      <div className="w-full h-2/3 relative">
        <div className="absolute h-full w-full top-0">
          <div className="relative h-full w-full cursor-pointer">
            <Link passHref href={`/art/preview/${id}`}>
              <a className="relative h-full">
                <RecentCartImage
                  imageUrl={imageUrl}
                  auction={auction}
                  def={defPro}
                  thumbnail={thumbnailUrl3x}
                  name={name}
                  isAuction={isAuction}
                  fileType={fileType}
                />
                {isAuction && auction?.status === "ONGOING" && (
                  <AuctionDate auction={auction} />
                )}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={`p-4 flex-1 rounded-b-2xl`}>
        <div className="w-full flex flex-col text-left h-full">
          <div
            id="status"
            className="flex-col flex md:flex-row-reverse justify-between">
            <div className="flex mt-1 gap-[5px]">
              {copyrightRegistered && (
                <div className="icon">
                  <Image  layout="fill" objectFit="cover" src={pink} alt="pink" />
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
            <h6
              className={`text-[16px] text-white font-[500] mr-10 h-[54px]`}>
              <Link href={`/art/preview/${id}`} passHref>
                <a>{subStr(theName, 20)}</a>
              </Link>
            </h6>
          </div>
          {isAuction && auction?.status === "ONGOING" && (
            <span className="pb-[20px]">{currentPriceI18}</span>
          )}
          <div className="market mt-[6px] pb-[10px]">
            <div
              className={`flex gap-1 justify-between w-full flex-col items-start sm:flex-row`}>
              {isAuction && auction?.status !== "ONGOING" ? (
                <div className="mb-[13px]">
                  <h2 className="text-[24px] text-[#C2C2C2] font-[700] leading-9 h-[35px]">
                    {auction?.startDate.split("-")[1]}
                    {monthI18}
                    {auction?.startDate.split("-")[2].split("T")[0]}
                    {datePriceI18}
                  </h2>
                </div>
              ) : (
                <div className="flex gap-1 text-[18px] text-[#DDD] font-[700]">
                  <div className="relative flex items-center justify-center mr-[5px]">
                    <Image
                      width={17}
                      height={17}
                      src={currency === "EYES" ? eyesicon : matic_logo}
                      alt="artwork-currency"
                    />
                  </div>
                  <p>{toEthers(price)}</p>
                  {currency}
                </div>
              )}
              <div className="flex items-center text-[14px] text-[#5E5E5E] font-[400]">
                <FaWonSign />
                {excreptWon(won)}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-stretch border-t border-[#4E4E4E] pt-4">
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
              <p className="ml-2 text-[#B1B1B1] text-[14px] truncate flex-1 font-[400]">
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
                    onClick={() => heartHandler(recentArt.isHearted)}
                    className="heartIcon"
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() => heartHandler(recentArt.isHearted)}
                    className="heartIcon"
                  />
                )}
                <p
                  className={`text-[14px] font-[400] text-[#ABABAB] ml-px`}>
                  {recentArt?.heartCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentArtCard;
