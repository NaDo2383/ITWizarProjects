import Image from "next/image";
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import Web3 from "web3";
import useArtworkTranslation from "locale/useArtworkTranslation";
import sandClock from "public/sandClock_black.svg";
import { useCountdown } from "utils/useCount";
import useCommonTranslation from "locale/useCommonTranslation";
import useArtDetail from "./useArtDetail";
import { useEffect } from "react";
import { delay } from "utils/date";

const AuctionInformation = ({ price, currency, auction }) => {
	const { timeLeftUntilI18, salePeriodI18, currentPriceI18, timeRemainingI18, auctionInformationI18 } =
		useArtworkTranslation();
	const { dayI18, hourI18, minuteI18, secondI18, monthI18, datePriceI18 } =
		useCommonTranslation();
	const [days, hours, minutes, seconds] = useCountdown(
		auction.status === "ONGOING" ? auction.endDate : auction.startDate
	);

	const { getArtDetail, artDetail } = useArtDetail();

	useEffect(() => {
		if (auction.endDate && auction.startDate && days + hours + minutes + seconds === 0) {
			delay(2000).then(() => {
				getArtDetail(artDetail?.id);
			})
		}
	}, [days, hours, minutes, seconds]);

	return (
		<>
			<div className="flex items-start md:items-center justify-between flex-col md:flex-row mb-2 text-[#4e4949]">
				<h5 className="text-[#fff] font-[500] text-[14px] mb-[7px] sm:hidden">{auctionInformationI18}</h5>
				<div className={`flex items-center flex-col w-full gap-[10px]`}>
					<div className="bg-[#111111] w-full">
						<p className="sm:py-[12px] py-[15px] sm:px-[21px] px-[16px] font-[500] sm:text-[16px] text-[14px] flex flex-row items-center lg:gap-[11px] gap-[8px]">
							<div className="mt-[4px] content-center sm:mr-[5px] mr-[2px]">
								<Image
									src={sandClock.src}
									width="12px"
									height="14px"
									alt="light"	
								/>
							</div>
							<div className="font-medium text-[#DDD] sm:text-[16px] text-[14px] whitespace-nowrap hidden sm:flex overflow-hidden">
								{auction.status === "ONGOING"
									? timeRemainingI18
									: timeLeftUntilI18}
							</div>
							<div className="sm:hidden font-medium text-[#DDD] sm:text-[16px] text-[14px] whitespace-nowrap">
								{auction.status === "ONGOING"
									? timeRemainingI18
									: timeRemainingI18}
							</div>
							<p className="flex items-center gap-[2px] font-[900] text-[#DDD] sm:text-[16px] text-[14px] whitespace-nowrap">
								{days}
								{dayI18}
								<span></span>
								{hours}
								{hourI18}
								<span></span>
								{minutes}
								{minuteI18}
								<span></span>
								{seconds}
								{secondI18}
							</p>
						</p>
					</div>
					<div className="w-full">
						<p className="flex text-black">
							<span className="min-w-[95px] font-[400] sm:text-[16px] text-[13px] text-[#9C9C9C]">
								{salePeriodI18}
							</span>{" "}
							<span className="sm:text-[17px] text-[13px] font-[400] text-[#9C9C9C]">
								{new Date(auction.startDate).getFullYear()}.
								{new Date(auction.startDate).getMonth() + 1 < 10 && "0"}
								{new Date(auction.startDate).getMonth() + 1}.
								{new Date(auction.startDate).getDate() < 10 && "0"}
								{new Date(auction.startDate).getDate()}{" "}
								{new Date(auction.startDate).getHours() < 10 && "0"}
								{new Date(auction.startDate).getHours()}:
								{new Date(auction.startDate).getMinutes() < 10 && "0"}
								{new Date(auction.startDate).getMinutes()} ~{" "}
								{new Date(auction.endDate).getFullYear()}.
								{new Date(auction.endDate).getMonth() + 1 < 10 && "0"}
								{new Date(auction.endDate).getMonth() + 1}.
								{new Date(auction.endDate).getDate() < 10 && "0"}
								{new Date(auction.endDate).getDate()}{" "}
								{new Date(auction.endDate).getHours() < 10 && "0"}
								{new Date(auction.endDate).getHours()}:
								{new Date(auction.endDate).getMinutes() < 10 && "0"}
								{new Date(auction.endDate).getMinutes()}
							</span>
						</p>
					</div>
					<div className="w-full">
						<p className="flex">
							<span className="min-w-[95px] font-[400] sm:text-[16px] text-[13px] text-[#9C9C9C]">
								{currentPriceI18}
							</span>
							{auction?.status === "ONGOING" ? (
								<div className="flex gap-1 text-white font-[700] text-[13px] sm:text-[16px] sm:ml-1">
									<div className="relative flex items-center justify-center sm:w-[15px] sm:h-[15px] w-[14px] h-[14px] sm:mt-0 mt-[2px]">
										<Image
											width={15}
											height={15}
											src={currency === "EYES" ? eyesicon : matic_logo}
											alt="artwork-currency"
										/>
									</div>
									{Web3.utils.fromWei(price.toString(), "ether")} {currency}
								</div>
							) : (
								<h4 className="sm:text-[17px] text-[13px] text-[#DDD] font-[700]">
									{auction?.startDate.split("-")[1]}
									{monthI18}
									{auction?.startDate.split("-")[2].split("T")[0]}
									{datePriceI18}
								</h4>
							)}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuctionInformation;
