import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import star from "public/star.png";
import defPro from "public/def_pro.png";
import verified from "public/verified.png";
import pink from "public/pink.png";
import useCommonTranslation from "locale/useCommonTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaWonSign } from "react-icons/fa";
import { subStr } from "utils/string";
import AuctionDate from "./AuctionDate";
import useArtwork from "./useArtwork";
import useCurrency from "common/metamask/useCurrency";
import RecentCartImage from "./RecentCartImg";
import useMarket from "./useMarket";

const MarketCard = (props) => {
	const {
		id,
		thumbnailUrl3x,
		artworkName,
		name,
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
	const thePrice = isAuction ? auction?.price : price;
	const { monthI18, dayI18 } = useCommonTranslation();
	const { currentPriceI18, unsoldWorkI18 } = useArtworkTranslation();
	const { handleArtworkHeart } = useArtwork();
	const { marketArts } = useMarket();
	const { toEthers, toWon, excreptWon } = useCurrency();
	const [won, setWon] = useState(null);
	const [recentArt, setRecentArt] = useState({
		heartCount: +heartCount,
		isHearted: hearted,
		convertedWon: null,
	});

	useEffect(() => {
		toWon(thePrice, currency).then((res) => setWon(res));
		setRecentArt({
			...recentArt,
			isHearted: hearted,
			heartCount: heartCount
		});
	}, [marketArts]);

	const heartObj = {
		artwork: props,
		recentArt,
		setRecentArt
	}
	
	return (
		<div className={`w-full lg:min-h-[515px] sm:min-h-[515px] min-h-[257px] bg-[#000000] text-white rounded-[20px] overflow-hidden recent-work`}>
			<div className="w-full xl:h-[330px] lg:h-[330px] sm:h-[330px] h-[158px] relative">
				<div className="h-full w-full">
					<Link passHref href={`/art/preview/${id}`}>
						<a className="relative">
							<RecentCartImage
								imageUrl={imageUrl}
								auction={auction}
								def={defPro}
								thumbnail={thumbnailUrl3x}
								name={theName}
								isAuction={isAuction}
								fileType={fileType}
							// style={{width: "330px", height: "330px"}}
							/>
							{isAuction && auction && auction?.status === "ONGOING" && (
								<AuctionDate auction={auction} />
							)}
						</a>
					</Link>
				</div>
			</div>
			<div className={`lg:p-4 sm:p-2 p-[7px] flex-1 rounded-b-2xl z-0 bg-black`}>
				<div className="w-full flex flex-col text-left h-full">
					<div
						id="status"
						className="flex-row-reverse flex md:flex-row-reverse justify-between">
						<div className="flex gap-[5px]">
							{copyrightRegistered && (
								<div
									className="icon"
									style={{
										position: "relative"
									}}>
									<Image layout="fill" objectFit="contain" src={pink} alt="pink" />
								</div>
							)}
							{exposeVerify && (
								<div
									className="icon"
									style={{
										position: "relative"
									}}>
									<Image
										layout="fill"
										objectFit="contain"
										src={verified}
										alt="verified"
									/>
								</div>
							)}
						</div>
						<h5 className={`lg:text-[16px] sm:text-[16px] text-[10px] text-[#fff] font-medium lg:h-[46px] sm:h-[46px] h-[20px]`}>
							<Link href={`/art/preview/${id}`} passHref>
								<a>{subStr(theName, 20)}</a>
							</Link>
						</h5>
					</div>
					<div className="market lg:mt-[32px] md:mt-[32px] sm:mt-[10px]">
						<div
							className={`flex gap-1 justify-between w-full flex-row items-start sm:mb-[10px] mb-[5px] sm:mt-[6px] mt-[3px]`}>
							{type === "NOT_SELL" && !isAuction ? (
								<p className="lg:text-[18px] sm:text-[18px] text-[10px] text-[#7C7C7C] font-[500] sm:mt-0 mt-[22px]">{unsoldWorkI18}</p>
							) : !isAuction ? (
								<div className="flex gap-1 text-[#DDDDDD] font-bold sm:items-center sm:mt-0 mt-[15px] items-center">
									<div className="relative flex items-center justify-center sm:mr-[5px] mr-[2px] sm:w-[17px] sm:h-[17px] w-[10px] h-[10px] sm:mt-0 mt-[4px]">
										<Image
											width={17}
											height={17}
											src={currency === "EYES" ? eyesicon : matic_logo}
											alt="artwork-currency"
										/>
									</div>
									<p className="auctionPrice">
										{toEthers(thePrice)}
									</p>
									<p className="auctionPrice">
										{currency}
									</p>
								</div>
							) : auction?.status === "ONGOING" ? (
								<>
									<div className="sm:hidden flex flex-col text-sm lg:text-[18px] text-[#DDDDDD] font-bold sm:gap-[5px]">
										<p className="lg:text-[16px] sm:text-[16px] text-[10px] text-white font-[300] lg:mt-[2px] sm:mt-[2px]">
											{currentPriceI18}
										</p>
										<div className="flex flex-row gap-1 mt-2">
											<div className="relative flex items-center justify-center lg:w-[17px] lg:h-[17px] sm:w-[17px] sm:h-[17px] w-[10px] h-[10px] lg:mt-0 sm:mt-0 mt-[4px]">
												<Image
													width={17}
													height={17}
													src={currency === "EYES" ? eyesicon : matic_logo}
													alt="artwork-currency"
												/>
											</div>
											<p className="auctionPrice">
												{toEthers(thePrice)}
											</p>
											<p className="auctionPrice">
												{currency}
											</p>
										</div>
									</div>
									<div className=" hidden sm:flex overflow-hidden text-sm lg:text-[18px] text-[#DDDDDD] font-bold gap-[5px]">
										<p className="lg:text-[16px] sm:text-[16px] text-[10px] text-white font-[300] lg:mt-[2px] sm:mt-[2px]">
											{currentPriceI18}
										</p>
										<div className="relative flex items-center justify-center lg:w-[17px] lg:h-[17px] sm:w-[17px] sm:h-[17px] w-[10px] h-[10px] mt-[4px]">
											<Image
												width={17}
												height={17}
												src={currency === "EYES" ? eyesicon : matic_logo}
												alt="artwork-currency"
											/>
										</div>
										<p className="auctionPrice">
											{toEthers(thePrice)}
										</p>
										<p className="auctionPrice">
											{currency}
										</p>
									</div>
								</>
							) : (
								<div className="flex">
									<div className="flex flex-row sm:mt-0 mt-[13px]">
										<span className="sm:text-[14px] text-[10px]">✨</span>
										<span className="date">
											{new Date(auction.startDate).getMonth() + 1 < 10 && "0"}
											{new Date(auction.startDate).getMonth() + 1}
										</span>
										<span className="date">
											{monthI18}
										</span>
										<span className="date">
											{new Date(auction.startDate).getDate() < 10 && "0"}
											{new Date(auction.startDate).getDate()}{" "}
										</span>
										<span className="date">
											{dayI18}
										</span>
										<span className="mx-1 date">
											가격공개 예정 !
										</span>
									</div>
								</div>
							)}
							{(isAuction ? auction?.status !== "UPCOMING" : type !== "NOT_SELL") &&
								<div className="items-center lg:text-[14px] sm:text-[14px] text-[8px] text-[#5E5E5E] font-[400] lg:my-1 sm:my-1 hidden sm:flex overflow-hidden">
									{thePrice !== "0" && (
										<>
											<FaWonSign />
											{excreptWon(won, id)}
										</>
									)}
								</div>
							}
							{(isAuction ? auction?.status !== "UPCOMING" : type !== "NOT_SELL") &&
								<div className="items-center lg:text-[14px] sm:text-[14px] text-[8px] text-[#5E5E5E] font-[400] lg:my-1 sm:my-1 sm:hidden flex flex-row gap-[2px] sm:mt-4 mt-[20px]">
									{thePrice !== "0" && (
										<>
											<FaWonSign />
											{excreptWon(won, id)}
										</>
									)}
								</div>
							}
						</div>
					</div>
					<div className="flex-1 flex flex-row items-stretch border-t border-[#4E4E4E] pt-[10px]">
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
							<p className="ml-[8px] text-[#B1B1B1] lg:text-[14px] sm:text-[14px] text-[10px] truncate flex-1  font-[400]">
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
							<div className="flex items-center gap-[2px]">
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

export default MarketCard;
