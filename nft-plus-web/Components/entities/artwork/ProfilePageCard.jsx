/**
 * @createdBy duka
 */
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
import ProfilePageAuction from "./ProfilePageAuction";
import useArtwork from "./useArtwork";
import useCurrency from "common/metamask/useCurrency";
import ProfilePageCardImg from "./ProfilePageCardImg";
import useMarket from "./useMarket";

const ProfilePageCard = (props) => {
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
    isAuction,
    auction,
    hearted,
    heartCount,
    imageUrl,
    fileType,
    type
  } = props;
  const theName = artworkName || name;
  const {unsoldWorkI18} = useArtworkTranslation();
  const { sendHearth, unSendHearth } = useArtwork();
  const { marketArts } = useMarket()
  const { toEthers, toWon, excreptWon } = useCurrency();
  const thePrice = isAuction ? auction?.price : price;
  const [won, setWon] = useState(null);
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
    toWon(thePrice, currency, false, id).then((res) => setWon(res));
  }, [marketArts]);

  return (
    <div className={`w-full lg:min-h-[515px] sm:min-h-[515px] min-h-[257px] bg-[#000000] text-white rounded-[20px] overflow-hidden recent-work`}>
      <div className="w-full xl:h-[330px] lg:h-[330px] sm:h-[330px] h-[158px] relative">
        <div className="h-full w-full">
          <Link passHref href={`/art/preview/${id}`}>
            <a className="relative">
              <ProfilePageCardImg
                imageUrl={imageUrl}
                auction={auction}
                def={defPro}
                thumbnail={thumbnailUrl3x}
                name={name}
                isAuction={isAuction}
                fileType={fileType}
              />
              {isAuction && auction?.status === "ONGOING" && (
                <ProfilePageAuction auction={auction} />
              )}
            </a>
          </Link>
        </div>
      </div>
      <div className={`sm:px-[20px] sm:py-[15px] p-[7px_10px_10px_10px] flex-1 rounded-b-[20px] sm:h-auto h-[99px] z-0 bg-black`}>
        <div className="w-full flex flex-col text-left h-full">
          <div id="status" className="flex flex-row justify-between">
            <h6 className={`text-[10px] sm:h-[54px] h-[28px] truncate`}>
              <Link href={`/art/preview/${id}`} passHref>
                <a className="text-[10px] sm:text-[16px] text-white font-[500]">{theName}</a>
              </Link>
            </h6>
            <div className="flex sm:mt-1 gap-[5px]">
              {copyrightRegistered && (
                <div className="icon">
                  <Image layout="fill" objectFit="cover" src={pink} alt="pink"  />
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
          </div>
          <div className="market">
            <div
              className={`flex gap-1 justify-between w-full flex-row items-start sm:mb-[9px] mt-[6px]`}>
              {
                <>
                  <div className="flex gap-1 lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold items-center">
                    {type === "NOT_SELL"  ? (
                      <p className="text-[10px] sm:text-[18px] text-[#7C7C7C] font-[500] sm:h-auto h-[20px]">{unsoldWorkI18}</p>
                    ) : (
                      <div className="flex sm:gap-1   text-[#DDDDDD] font-bold items-center">
                        <div className="relative flex items-center justify-center mr-[5px]  sm:w-[17px] sm:h-[17px] w-[10px] h-[10px] ">
                          <Image
                            width={17}
                            height={17}
                            src={currency === "EYES" ? eyesicon : matic_logo}
                            alt="artwork-currency"
                          />
                        </div>
                        <span className="auctionPrice">{toEthers(thePrice)}</span>
                        <span className="auctionPrice">{currency}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center sm:text-[14px] text-[8px] text-[#5E5E5E] font-[400]">
                    {(isAuction ? auction?.status !== "UPCOMING" : type !== "NOT_SELL")  && (
                      <>
                        <FaWonSign />
                        {excreptWon(won, id)}
                      </>
                    )}
                  </div>
                </>
              }
            </div>
          </div>
          <div className="flex-1 flex flex-row items-stretch border-t border-[#4E4E4E] sm:pt-[10px]">
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
              <p className="ml-2 text-[#fff] truncate text-[14px] font-[400]">
                <Link href={`/artist/${authorId}`} passHref>
                  <a className="text-[10px] sm:text-[14px]">{subStr(authorName, 8)}</a>
                </Link>
              </p>
              {tamtamApproved && (
                <div className="icon">
                  <Image width={17} height={17} className="object-cover" src={star} alt="icon" />
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end w-full items-center">
              <div className="flex items-center gap-1">
                {recentArt.isHearted ? (
                  <AiFillHeart
                    onClick={() => heartHandler(id, recentArt.isHearted)}
                    className="heartIcon"
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() => heartHandler(id, recentArt.isHearted)}
                    className="heartIcon"
                  />
                )}
                <p
                  className={`sm:text-[14px] text-[8px] font-[400] text-[#ABABAB] ml-px`}>
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

export default ProfilePageCard;
