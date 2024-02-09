import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import star from "public/star.png";
import defPro from "public/def_pro.png";
import verified from "public/verified.png";
import pink from "public/pink.png";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { subStr } from "utils/string";
import useCurrency from "common/metamask/useCurrency";
import RecentCartImage from "../artwork/RecentCartImg";
import AuctionDate from "../artwork/AuctionDate";
import useArtwork from "../artwork/useArtwork";
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import { FaWonSign } from "react-icons/fa";

const EventArtCard = (props) => {
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
		auction,
		imageUrl,
		isAuction,
		fileType,
		artworkId,
		hearted,
		adDrop,
		type
	} = props;
	const theName = artworkName || name;
	const { currentPriceI18, undiscoveredWorkI18, unsoldWorkI18 } = useArtworkTranslation();
	const [won, setWon] = useState(null);
	const { toEthers, toWon, excreptWon } = useCurrency();
	const [recentArt, setRecentArt] = useState({
		heartCount: +heartCount,
		isHearted: hearted,
		convertedWon: null
	});
	const thePrice = isAuction ? auction?.price : price;
	const { handleArtworkHeart } = useArtwork();
	// const heartHandler = async (artworkId, hearted) => {
	// 	if (recentArt.isHearted) {
	// 		unSendHearth(artworkId);
	// 		setRecentArt({
	// 			...recentArt,
	// 			isHearted: false,
	// 			heartCount: +recentArt?.heartCount - 1
	// 		});
	// 	} else {
	// 		sendHearth(artworkId);
	// 		setRecentArt({
	// 			...recentArt,
	// 			isHearted: true,
	// 			heartCount: +recentArt?.heartCount + 1
	// 		});
	// 	}
	// };
	useEffect(() => {
		const thePrice = isAuction ? auction?.price : price;
		toWon(thePrice, currency).then((res) => setWon(res));
		setRecentArt({
			...recentArt,
			isHearted: hearted,
			heartCount: heartCount
		});
	}, [props]);

	const heartObj = {
		artwork: props,
		recentArt,
		setRecentArt
	}

	return (
		<div className={`w-full sm:h-[515px] h-[257px] bg-black sm:rounded-[20px] rounded-[9.576px] overflow-hidden recent-work`}>
			<div className="w-full sm:h-[330px] h-[158px] relative overflow-hidden">
				<div className="absolute h-full w-full top-0">
					<div className="relative h-full w-full cursor-pointer">
						<Link passHref href={`/events/${artworkId}`}>
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
								{!adDrop && (
									<div className="">
										<span className="absolute bottom-0 left-0 w-[100%] h-full py-[19px] xl:px-[4px] md:px-0 text-center justify-center text-white xl:text-[16px] sm:text-[14px] text-[10px] bg-[rgba(0,0,0,0.6)] align-middle flex content-center items-center">
											{undiscoveredWorkI18}
										</span>
									</div>
								)}
								{isAuction && auction?.status === "ONGOING" && (
									<AuctionDate auction={auction} />
								)}
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className={`sm:p-4 p-[7px_9.58px_9.68px_9.57px] rounded-b-2xl h-[99px] sm:h-auto z-0 bg-black`}>
				<div className="w-full flex h-full flex-col justify-between">
					<div className="flex h-[32px] sm:h-auto">
						<div className={`font-[500] sm:mr-10 sm:h-[64px] h-[28px] sm:w-full w-[123px] flex items-start`}>
							<Link href={`/events/${artworkId}`} passHref>
								<a className="sm:text-[16px] text-[10px] text-white">{subStr(theName, 20)}</a>
							</Link>
						</div>
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
					</div>
					<div className="">
						{
							adDrop ? (
								<div
									className={`flex gap-1 justify-between w-full flex-col items-start sm:flex-row mb-[10px] mt-[6px] `}>
									{type === "NOT_SELL" && !isAuction ? (
										<p className="sm:text-[18px] text-[10px] text-[#404040] font-[500]">{unsoldWorkI18}</p>
									) : !isAuction ? (
										<div className="flex gap-1 text-sm sm:text-[18px] text-[#DDD] font-bold">
											<div className="relative flex items-center justify-center mr-[5px]">
												<Image
													width={17}
													height={17}
													src={currency === "EYES" ? eyesicon : matic_logo}
													alt="currency"
												/>
											</div>
											<p className="sm:text-[18px] text-[10px] font-bold text-[#DDD]">
												{toEthers(thePrice)}
											</p>
											<p className="sm:text-[18px] text-[10px] font-bold text-[#DDD]">
												{currency}
											</p>
										</div>
									) : auction?.status === "ONGOING" ? (
										<div className="flex text-sm sm:text-[18px] text-[#DDD] font-bold gap-[5px]">
											<p className="sm:text-[16px] text-[10px] text-white font-[300] mt-[2px]">
												{currentPriceI18}
											</p>
											<div className="relative flex items-center justify-center">
												<Image
													width={17}
													height={17}
													src={currency === "EYES" ? eyesicon : matic_logo}
													alt="currency"
												/>
											</div>
											<p className="sm:text-[18px] text-[10px] font-bold text-[#DDD]">
												{toEthers(thePrice)}
											</p>
											<p className="sm:text-[18px] text-[10px] font-bold text-[#DDD]">
												{currency}
											</p>
										</div>
									) : (
										<div className="flex">
											<div className="flex flex-row">
												<span>✨</span>
												<span className="sm:text-[18px] text-[10px] font-[500] text-[#9039FE]">
													{new Date(auction.startDate).getMonth() + 1 < 10 && "0"}
													{new Date(auction.startDate).getMonth() + 1}
												</span>
												<span className="sm:text-[18px] text-[10px] font-[500] text-[#9039FE]">
													{monthI18}
												</span>
												<span className="sm:text-[18px] text-[10px] font-[500] text-[#9039FE]">
													{new Date(auction.startDate).getDate() < 10 && "0"}
													{new Date(auction.startDate).getDate()}{" "}
												</span>
												<span className="sm:text-[18px] text-[10px] font-[500] text-[#9039FE]">
													{dayI18}
												</span>
												<span className="mx-1 sm:text-[18px] text-[10px] font-[500] text-[#9039FE]">
													가격공개 예정 !
												</span>
											</div>
										</div>
									)}
									{(isAuction ? auction?.status !== "UPCOMING" : type !== "NOT_SELL") &&
										<div className="flex items-center text-sm text-[#5E5E5E] font-[400] my-1">
											{thePrice !== "0" && (
												<>
													<FaWonSign />
													{excreptWon(won, id)}
												</>
											)}
										</div>
									}
								</div>
							) : (
								<div className="sm:h-[42px]">
									{""}
								</div>
							)
						}
					</div>
					<div className=" flex h-[29.77px] sm:h-auto flex-row items-stretch border-t border-[#4E4E4E] sm:pt-[16px] pt-[5.24px]">
						<div className="flex flex-1 w-full h-full items-center">
							<div
								className={`sm:w-[28px] sm:h-[28px] w-[14.842px] h-[14.842px] ${authorImage ? "relative items-center" : "items-end"
									} flex justify-center overflow-hidden bg-[#333] rounded-full border-[#999] border`}>
								<Image
									width={!authorImage && 30}
									height={!authorImage && 30}
									unoptimized
									alt="authorImage"
									layout={authorImage && "fill"}
									objectFit="cover"
									src={authorImage ? authorImage : defPro}
								/>
							</div>
							<p className="sm:ml-2 ml-[3.83px] text-[#fff] sm:text-[14px] text-[10px] truncate flex-1 font-[400]">
								<Link href={`/artist/${authorId}`} passHref>
									<a>{subStr(authorName || "Unknown", 8)}</a>
								</Link>
							</p>
							{tamtamApproved && (
								<div className="lg:w-[17px] lg:h-[16px] md:w-[17px] md:h-[16px] w-[9px] h-[9px] overflow-hidden relative ml-1 flex justify-center items-center  sm:mt-1 ">
									<Image layout="fill" objectFit="cover" src={star} alt="star" />
								</div>
							)}
						</div>
						<div className="flex sm:gap-2 gap-[3.58px] justify-end w-full items-center">
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
							</div>
							<p className={`sm:text-[14px] text-[8px] mb-[2px] font-[400] text-[#ABABAB]`}>
								{recentArt?.heartCount}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventArtCard;
