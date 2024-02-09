import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import defPro from "public/def_pro.png";
import { FaWonSign } from "react-icons/fa";
import pink from "public/pink.png";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useArtwork from "../artwork/useArtwork";
import useCurrency from "common/metamask/useCurrency";
import { subStr } from "utils/string";
import { useGlobalContext } from "common/global/useGlobalContext";
import usePopup from "Components/ui/popup/usePopup";
import { MODAL_TYPES } from "Components/ui/popup/popupRegistration";
import useCommonTranslation from "locale/useCommonTranslation";
import RecentCartImage from "../artwork/RecentCartImg";

const CompetitionCard = (props) => {
  const {
    id,
    thumbnailUrl3x,
    artworkName,
    name, // зарим artwork - той холбоотой api нь artworkName эсвэл name гэж ирж бган бна
    currency,
    copyrightRegistered,
    exposeVerify,
    price,
    isAuction,
    auction,
    authorProfileImg,
    authorId,
    authorName,
    hearted,
    heartCount,
    status,
    imageUrl,
    fileType,
    mintStatus,
    competitionId
  } = props
  const thePrice = isAuction ? auction?.price : price;
  const theName = artworkName || name;
  const [won, setWon] = useState(null);
  const { caseI18, unsoldWorkI18 } = useArtworkTranslation()
  const { pleaseLoginI18 } = useCommonTranslation()
  const { toWon, excreptWon, toEthers } = useCurrency()
  const { handleArtworkHeart } = useArtwork();
  const { authUser } = useGlobalContext()
  const { handleShowModal } = usePopup()
  const [recentArt, setRecentArt] = useState({
    heartCount: +heartCount,
    isHearted: hearted,
    convertedWon: null,
  });

  useEffect(() => {
    // console.log(id, props?.hearted, props?.heartCount)
    toWon(price, currency).then(res => setWon(res))
    setRecentArt(
      prev => ({
        ...prev,
        isHearted: hearted,
        heartCount: props?.heartCount
      })
    );
  }, [props])


  function handleHeart() {
    if (!authUser) {
      handleShowModal(MODAL_TYPES.ALERT, { message: `${pleaseLoginI18} !` })
      return
    }
    // setHeartBtnClicked(prev => !prev)
    const heartData = {
      artworkId: id,
      recentArt,
      setRecentArt,
    }
    handleArtworkHeart(heartData)
  }

  const heartObj = {
    artwork: props,
    recentArt,
    setRecentArt
  }

  useEffect(() => {
    setRecentArt({
      heartCount: +heartCount,
      isHearted: hearted,
      convertedWon: null
    })
  }, [authUser?.id])

  return (
    <div
      className={`w-full lg:min-h-[515px] sm:min-h-[515px] min-h-[257px] bg-[#000000] text-white rounded-[20px] overflow-hidden recent-work`}>
      <div className="w-full xl:h-[330px] lg:h-[330px] sm:h-[330px] h-[158px] relative">
        <div className="h-full w-full">
          {status === "ADMIN_PENDING" || status === "GASFEE_PENDING" ? (
            <a className="relative">
              <RecentCartImage
                status={status}
                imageUrl={imageUrl}
                def={defPro}
                thumbnail={thumbnailUrl3x}
                name={name}
                fileType={fileType}
              />
            </a>
          ) : (
            <Link passHref href={`/art/preview/${id}`}>
              <a className="relative">
                <RecentCartImage
                  status={status}
                  imageUrl={imageUrl}
                  def={defPro}
                  thumbnail={thumbnailUrl3x}
                  name={name}
                  fileType={fileType}
                  mintStatus={mintStatus}
                />
              </a>
            </Link>
          )}
        </div>
      </div>
      <div className={`lg:p-4 sm:p-2 p-[7px] flex-1 rounded-b-2xl z-0 bg-black ${mintStatus === "NOT_MINTED" ? " pointer-events-none" : "cursor-pointer"}`}>
        <div className="w-full flex flex-col text-left h-full">
          <div
            id="status"
            className="flex justify-between w-full">
            <h5
              className={`text-[10px] sm:text-[16px] text-[#fff] font-medium truncate sm:h-[46px] h-[28px] w-[80%]`}>
              <Link href={`/art/preview/${id}`} passHref>
                <a>{theName}</a>
              </Link>
            </h5>
            <div className="flex w-[20%] justify-end">
              {copyrightRegistered && (
                <div className="lg:w-[17px] lg:h-[16px] md:w-[17px] md:h-[16px] w-[9px] h-[9px] overflow-hidden relative sm:mt-2 mt-1">
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
          </div>
          <div className="market">
            <div
              className={`flex gap-1 justify-between w-full items-start sm:flex-row sm:mb-[10px] sm:mt-[6px]`}>
              {
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-1 text-[14px] text-[#DDDDDD] font-bold">
                    {price == "0" ? (
                      <p className="text-[10px] sm:text-[18px] text-[#7C7C7C] font-[500] leading-[26px]">{unsoldWorkI18}</p>
                    ) : (
                      <div className="flex gap-1 text-[#DDDDDD] font-bold sm:items-center text-[10px] sm:text-[18px] leading-[26px]">
                        <div className="relative flex items-center justify-center sm:mr-[5px] mr-[2px] sm:w-[17px] sm:h-[17px] w-[10px] h-[10px] sm:mt-0 mt-[4px]">
                          <Image
                            width={17}
                            height={17}
                            src={currency === "EYES" ? eyesicon : matic_logo}
                            alt="currency"
                          />
                        </div>
                        {toEthers(thePrice)}
                        {currency}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-[14px] text-[#5E5E5E] font-[400]">
                    {thePrice !== "0" && (
                      <div className="flex items-center lg:text-[14px] sm:text-[14px] text-[8px] text-[#5E5E5E] font-[400]">
                        <FaWonSign />
                        {excreptWon(won, id)}
                      </div>
                    )}
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="flex-1 flex flex-row items-stretch border-t border-[#4E4E4E]">
            <div className="flex flex-1 w-full items-center pt-2">
              <div
                className={`card-avatarImg relative items-center`}>
                <Image
                  width={!authorProfileImg && 30}
                  height={!authorProfileImg && 30}
                  unoptimized
                  alt="authorProfileImg"
                  layout="fill"
                  objectFit="cover"
                  src={authorProfileImg ? authorProfileImg : defPro}
                />
              </div>
              <p className="ml-2 text-[#B1B1B1] text-[10px] sm:text-[14px] truncate flex-1  font-[400]">
                {status === "ADMIN_PENDING" || status === "GASFEE_PENDING" ? (
                  <a>{subStr(authorName, 8)}</a>
                ) : (
                  <Link href={`/artist/${authorId}`} passHref>
                    <a>{subStr(authorName, 8)}</a>
                  </Link>
                )
                }
              </p>
            </div>
            <div className="flex gap-2 justify-end w-full items-center pt-2">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
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
                </div>
                <p className={`lg:text-[14px] sm:text-[14px] text-[8px] mb-[2px] font-[400] text-[#ABABAB]`}>
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
export default CompetitionCard;
