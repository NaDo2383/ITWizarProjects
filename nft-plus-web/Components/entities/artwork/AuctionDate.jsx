import sandClock from "public/sandClock.svg";
import Image from "next/image";
import { useCountdown } from "utils/useCount";
import useCommonTranslation from "locale/useCommonTranslation";

const AuctionDate = ({ auction }) => {
	const [days, hours, minutes, seconds] = useCountdown(auction.endDate);
	const { dayI18, hourI18, minuteI18, secondI18 } = useCommonTranslation();

	return (
		<div
			className={`absolute bottom-0 left-0 w-[100%] lg:py-[19px] sm:py-[19px] py-[9px] lg:px-[4px] sm:px-[4px] px-0 justify-center text-white xl:text-[16px] sm:text-[14px] text-[10px] bg-[rgba(41,41,52,0.8)] align-middle flex content-center items-center`}>
			<div className="h-19 mt-[2px] flex items-center justify-center">
				<div className="sm:pr-[8px] pr-[4px] lg:w-[20px] lg:h-[24px] sm:w-[13px] sm:h-[17px] w-[10px] h-[12px] flex justify-center content-center">
					<Image src={sandClock.src} width={100} height={100} alt="light" />
				</div>
				<div className="flex items-center gap-[5px] w-full">
					<GrayFrame date={days} />
					{dayI18}
					<GrayFrame date={hours} />
					{hourI18}
					<GrayFrame date={minutes} />
					{minuteI18}
					<GrayFrame date={seconds} />
					{secondI18}
				</div>
			</div>
		</div>
	);
};
export const GrayFrame = ({ date }) => {
	return (
		<>
			<div className="bg-[rgba(118,101,101,0.8)] xl:w-[36px] xl:h-[36px] md:w-[33px] md:h-[33px] flex items-center justify-center rounded-[5px]">
				{date}
			</div>
		</>
	);
};

export default AuctionDate;
