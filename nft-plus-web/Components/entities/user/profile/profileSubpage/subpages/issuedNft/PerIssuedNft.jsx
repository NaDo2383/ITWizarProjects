import React, { useEffect } from "react";
import useMyPageTranslation from "locale/useMypageTranslation";
import { PlayCircle } from "@mui/icons-material";
import { VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import defPro from "public/def_pro.png";
import verified from "public/verified.png";
import { FaWonSign } from "react-icons/fa";
import pink from "public/pink.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { subStr } from "utils/string";
import useArtwork from "Components/entities/artwork/useArtwork";
import mintIcon1 from "public/mintIcon1.svg";
import mintIcon2 from "public/mintIcon2.svg";
import { useGlobalContext } from "common/global/useGlobalContext";
import usePopup from "Components/ui/popup/usePopup";
import useProfile from "../../../useProfile";
import useCurrency from "common/metamask/useCurrency";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { IcoDownload } from "Components/ui/icon/icons";
import { downloadImage } from "utils/file";

function PerArtProgress(props) {
  const {
    id,
    thumbnailUrl3x,
    artworkName,
    copyrightRegistered,
    exposeVerify,
    authorProfileImg,
    authorId,
    authorName,
    hearted,
    heartCount,
    imageUrl,
    fileType,
    currency,
    mintStatus,
    price,
    isAuction,
    auction,
    ipfsUrl,
    imageFile,
    type,
    url,
    status
  } = props;
  const thePrice = isAuction ? auction?.price : price;
  const [won, setWon] = useState(null);
  const [theStatus, setTheStatus] = useState(props.status)
  // console.log(id,props.status);
  const {
    setDeletionArtwork,
    getArtworksRegProgress,
    handleArtworkHeart
  } = useArtwork();
  const { unsoldWorkI18 } = useArtworkTranslation()
  const { setGlobalItems } = useGlobalContext()
  const { toWon, excreptWon, toEthers } = useCurrency()
  const {
    reviewI18,
    denialApproval1I18,
    denialApproval2I18,
    minting1I18,
    minting2I18
  } = useMyPageTranslation()
 
  const { handleShowModal, MODAL_TYPES, setGlobalModalState, hideAllModals, hideModal } = usePopup()
  const { profileUser, activeWallets } = useProfile()
  const [recentArt, setRecentArt] = useState({
    heartCount: +heartCount,
    isHearted: hearted,
    convertedWon: null
  });


  function showArtworkCheckPopup() {
    handleShowModal(MODAL_TYPES.ARTWORK_CHECK, {
      artwork: props,
      profileUser,
      activeWallets,
      updateStatus: async (val) => setTheStatus(val)
    })
    setGlobalModalState(prev => ({
      ...prev,
      updateStatus: (val) => setTheStatus(val),
      showSwitchNetworkModal : (modalType) => {
        hideModal();
        handleShowModal(modalType);
      }
    }))
    // hideAllModals();
  }

  function showArtworkReviewPopup() {
    handleShowModal(MODAL_TYPES.ARTWORK_REVIEW, { artwork: props, profileUser, activeWallets })
    setGlobalModalState(prev => ({
      ...prev,
      showSwitchNetworkModal : (modalType) => {
        hideModal();
        handleShowModal(modalType);
      }
  }))
  }

  function showArtworkApprovalPopup() {
    handleShowModal(MODAL_TYPES.ARTWORK_APPROVAL, { artwork: props })
    setGlobalItems(prev => ({
      ...prev,
      changeArtworkDeletion: () => setDeletionArtwork(state => ({ ...state, deletedArtwork: !state }))
    }))
  }

  useEffect(() => {
    toWon(thePrice, currency).then((res) => setWon(res));
    setRecentArt({
      ...recentArt,
      isHearted: hearted,
      heartCount: heartCount
    });
  }, []);
  const heartObj = {
    artwork: props,
    recentArt,
    setRecentArt
  }

  return (
    <div
      className={`w-full lg:h-[515px] sm:h-[515px] h-[258px] bg-[#000000] text-white rounded-2xl overflow-hidden rounded-t-[20px] recent-work`}>
      <a className="w-full lg:min-h-[330px] sm:min-h-[330px] min-h-[158px] relative sm:max-h-[330px] max-h-[158px]">
        <div onClick={() => status === "ADMIN_PENDING" ? showArtworkReviewPopup : status === "ADMIN_DENIED" ? showArtworkApprovalPopup : status === "GASFEE_PENDING" ? showArtworkCheckPopup : status === "GASFEE_PENDING" && router.push('/art/preview/' + id)} className="flex justify-center w-full h-full">
          {fileType !== "IMAGE" ? (
            fileType === "VIDEO" ? (
              <div className="relative h-full w-full flex">
                <video
                  className={`w-full h-full object-cover`}
                  src={imageUrl}
                  loop
                  autoPlay
                  muted
                  playsInline
                  alt={imageUrl}>
                  <source src={imageUrl} type="video" />
                </video>
                <div className="absolute bottom-0 p-2 mr-[16rem]">
                  <PlayCircle
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full flex justify-center">
                <img
                  src={thumbnailUrl3x ? thumbnailUrl3x : "/art1.jpg"}
                  width="100%"
                  height="100%"
                  className="w-full h-full object-cover"
                  alt="artworkThumb3x"
                />
                <div className="absolute bottom-2 left-2">
                  <VolumeUp
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </div>
            )
          ) : (
            <img
              src={thumbnailUrl3x ? thumbnailUrl3x : "/art1.jpg"}
              width="100%"
              height="100%"
              className="w-full h-full object-cover"
              alt="artworkThumb3x"
            />
          )}
        </div>
        {status === "ADMIN_PENDING" ? (
          <div className="w-full" onClick={showArtworkReviewPopup}>
            <h4 className="absolute bottom-0 left-0 w-[100%] h-full py-[19px] xl:px-[4px] md:px-0 text-center justify-center text-white xl:text-[16px] sm:text-[14px] text-[10px] bg-[rgba(0,0,0,0.6)] align-middle flex content-center items-center">{reviewI18}</h4>
          </div>
        ) : status === "ADMIN_DENIED" ? (
          <div onClick={showArtworkApprovalPopup}>
            <h4 className="absolute bottom-0 left-0 w-[100%] h-full py-[19px] xl:px-[4px] md:px-0 text-center justify-center text-white xl:text-[16px] sm:text-[14px] text-[10px] bg-[rgba(0,0,0,0.8)] align-middle flex flex-col content-center items-center">{denialApproval1I18}
              <span> {denialApproval2I18}</span>
            </h4>
          </div>
        ) : status === "GASFEE_PENDING" ? (
          <>
            <div className="w-full">
              <div className="absolute top-0">
                <Image src={mintIcon1} alt="mintIcon1" />
              </div>
              <div className="absolute bottom-0 flex justify-end right-0">
                <Image src={mintIcon2} alt="mintIcon2" />
              </div>
              <h4 onClick={showArtworkCheckPopup} className="absolute h-full bottom-0 left-0 w-[100%] py-[19px] xl:px-[4px] md:px-0 text-center justify-center text-white xl:text-[16px] sm:text-[14px] text-[10px] bg-[rgba(143,0,86,0.6)] align-middle flex flex-col content-center items-center whitespace-pre">
                    {
                      mintStatus === 'MINTING' ?  minting2I18 : minting1I18  
                    }
                    {/* minting1I18   */}
                {/* <span>{minting2I18}</span> */}
              </h4>
            </div>
          </>
        ) : status === "GASFEE_PAID" && (
          <>
            <div className="absolute z-40 top-[10px] right-[10px]">
              <button
                onClick={() => {
                  downloadImage(
                    imageFile,
                    ipfsUrl,
                    fileType
                  );
                }}
                className="rounded-full bg-[rgba(0,0,0,0.25)] p-[7px]"
              >
                <div className="w-[15px] h-[15px] flex justify-center items-center">
                  <IcoDownload />
                </div>
              </button>
            </div>
            <Link href={'/art/preview/' + id} passHref>
              <h4 className="absolute bottom-0 left-0 w-[100%] h-full py-[19px] xl:px-[4px] md:px-0 text-center justify-center text-white xl:text-[16px] sm:text-[14px] text-[10px] align-middle flex flex-col content-center items-center">
              </h4>
            </Link>
          </>
        )}
      </a>
      <div className={`lg:py-[15px] sm:py-[15px] py-[7px] lg:px-[20px] sm:px-[20px] px-[10px] flex-1 rounded-b-[20px]`}>
        <div className="w-full flex flex-col text-left h-full">
          <div
            id="status"
            className="flex flex-row-reverse justify-between">
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
              className={`lg:text-[16px] sm:text-[16px] text-[10px] text-[#fff] font-medium lg:h-[46px] sm:h-[46px] h-[28px] lg:mb-[37px] sm:mb-[37px] mb-[10px]`}>
              <a>{artworkName}</a>
            </h4>
          </div>
          <div className="market">
            {
              <>

                {type === "NOT_SELL" ? 
                status === "ADMIN_PENDING"  || theStatus === "GASFEE_PENDING" ||  theStatus === "ADMIN_DENIED" ? 
                  <div className="lg:min-h-[26px] sm:min-h-[26px] min-h-[10px] h-full mb-[10px]"></div> 
                :
                (
                  <div
                    className={`flex gap-1 justify-between w-full flex-col items-start sm:flex-row lg:mb-[10px] mb-[5px] sm:mb-[10px]`}>
                    <div className="flex gap-1 lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold">
                      <p className="lg:text-[18px] sm:text-[18px] text-[10px] text-[#7C7C7C] font-[500]">{unsoldWorkI18}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`flex gap-1 justify-between w-full flex-col items-start sm:flex-row mb-[10px] mt-[6px] `}>
                      <div className="flex gap-1 lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold">
                        <div className="relative flex items-center justify-center mr-[5px]">
                          <Image
                            width={17}
                            height={17}
                            src={currency === "EYES" ? eyesicon : matic_logo}
                            alt="currency"
                          />
                        </div>
                        <p className="lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold">{toEthers(thePrice)}</p>
                        <p className="lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold">
                          {currency}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex items-center lg:text-[14px] sm:text-[14px] text-[10px] text-[#5E5E5E] font-[400]">
                  {(isAuction ? auction?.status !== "UPCOMING" : type !== "NOT_SELL") && (
                    <>
                      <FaWonSign />
                      {excreptWon(won, id)}
                    </>
                  )}
                </div>
              </>
            }
        </div>
        <div className="flex-1 flex flex-row border-t border-[#656565]">
          <div className="flex flex-1 w-full lg:mt-[10px] mt-[10px] xs:mt-[5px] justify-center items-center">
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
            <p className="lg:ml-2 sm:ml-2 ml-1 text-[#fff] lg:text-[14px] sm:text-[14px] text-[10px] truncate flex-1 font-[400]">
              <Link href={`/artist/${authorId}`} passHref>
                <a>{subStr(authorName, 8)}</a>
              </Link>
            </p>
            {/*{tamtamApproved && (
                <div className="icon">
                  <Image layout="fill" objectFit="cover" src={star} alt="star" />
                </div>
              )}*/}
          </div>
          <div className="flex gap-2 justify-end w-full lg:mt-[10px] mt-[10px] xs:mt-[5px]">
            <div className="flex items-center gap-1 xs:gap-[2px]">
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
                className={`lg:text-[14px] sm:text-[14px] text-[10px] font-[400] text-[#ABABAB] ml-px`}>
                {recentArt?.heartCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/*	<td>
				<div className="flex flex-col justify-center">
					{tamtamApproved && (
						<StampTamTam src={"/star.png"} height={32} width={32} />
					)}
					<h2 className="text-[17px] mt-1 mb-2 font-[500]  text-black tracking-0">
						{artworkName}
					</h2>
					<ArtCreator data={{ authorName, authorProfileImg }} />
				</div>
			</td>
			<td>{createdDate.split(" ")[0]}</td>
			<td>
				<DisplayProgressBtn {...props} />
          </td> */}
    </div >
  );
}

export default PerArtProgress;
