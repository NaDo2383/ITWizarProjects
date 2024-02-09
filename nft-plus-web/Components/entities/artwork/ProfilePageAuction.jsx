import sandClock from "public/sandClock.svg";
import Image from "next/image";
import { useCountdown } from "utils/useCount";
import useCommonTranslation from "locale/useCommonTranslation";

const ProfilePageAuction = ({ auction }) => {
  const [days, hours, minutes, seconds] = useCountdown(auction.endDate);
  const {
    dayI18, 
    hourI18, 
    minuteI18, 
    secondI18 
  } = useCommonTranslation();

  return (
    <div
      className={`absolute bottom-0 left-0 w-[100%] py-[10px] xl:px-[20px] md:px-0 text-center justify-center text-white xl:text-[14px] sm:text-[14px] text-[9px] bg-[rgba(47,34,34,0.8)] align-middle flex content-center items-center`}>
      <div className="h-19 mt-[2px] flex items-center justify-center">
        <div className="xl:pr-[15px] sm:pr-[8px] pr-[7px] flex justify-center content-center">
          <Image src={sandClock.src} width="12px" height="12px" alt="light"  />
        </div>
        <div className="flex items-center gap-[4px] w-full">
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
      <div className="bg-[rgba(118,101,101,0.8)] xl:w-[24px] xl:h-[24px] md:w-[20px] md:h-[20px] flex items-center justify-center rounded-[5px]">
        {date}
      </div>
    </>
  );
};

export default ProfilePageAuction;
