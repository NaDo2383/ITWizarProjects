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

const MyPageCard = (props) => {
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
		fileType
	} = props;
	const theName = artworkName || name;
	const { sendHearth, unSendHearth } = useArtwork();
	const { marketArts } = useMarket();
	const { toEthers, toWon, excreptWon } = useCurrency();
	const thePrice = isAuction ? auction?.price : price;
	const [won, setWon] = useState(null);
	const {unsoldWorkI18} = useArtworkTranslation();
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
		<div
			className={`w-full h-[470px] bg-white rounded-2xl overflow-hidden border rounded-t-2xl recent-work`}>
			<div className="w-full h-2/3 relative">
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
			<div className={`p-5 flex-1 rounded-b-2xl`}>
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
						<h5 className={`text-[16px] font-[600] mr-10 h-[54px]`}>
							<Link href={`/art/preview/${id}`} passHref>
								<a className="text-[16px]">{subStr(theName, 20)}</a>
							</Link>
						</h5>
					</div>
					<div className="market">
						<div
							className={`flex gap-1 justify-between w-full flex-col items-start sm:flex-row mb-[10px] mt-[6px]`}>
							{
								<>
									<div className="flex gap-1 text-[14px] text-[#4E4949] font-[700]">
										{price == "0" ? (
											<p className="text-[18px] text-[#7C7C7C] font-[500]">{unsoldWorkI18}</p>
										) : (
											<>
												<div className="relative flex items-center justify-center mr-[5px]">
													<Image
														width={15}
														height={15}
														src={currency === "EYES" ? eyesicon : matic_logo}
														alt="artwork-currency"
													/>
												</div>
												<p className="lg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold">{toEthers(thePrice)}</p>
												<p className="tlg:text-[14px] sm:text-[14px] text-[10px] text-[#DDD] font-bold">
													{currency}
												</p>
											</>
										)}
									</div>
									<div className="flex items-center text-[14px] text-[#8E8E8E] font-[400]">
										{thePrice !== "0" && (
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
					<div className="flex-1 flex flex-row items-stretch">
						<div className="flex flex-1 w-full items-center">
							<div
								className={`w-[28px] h-[28px] relative items-center flex justify-center overflow-hidden bg-[#333] rounded-full border-[#999] border`}>
								<Image
									unoptimized
									alt="authorProfileImg"
									layout="fill"
									objectFit="cover"
									src={authorProfileImg ? authorProfileImg : defPro}
								/>
							</div>
							<p className="ml-2 text-[#444] truncate flex-1 sm:text-lg  font-[400]">
								<Link href={`/artist/${authorId}`} passHref>
									<a className="text-[14px]">{subStr(authorName, 8)}</a>
								</Link>
							</p>
							{tamtamApproved && (
								<div className="icon">
									<Image layout="fill" objectFit="cover" src={star} alt="star"  />
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
								<p className={`text-[14px] font-[400] text-[#555] ml-px`}>
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

export default MyPageCard;
