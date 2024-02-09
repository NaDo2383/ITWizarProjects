import clock from "public/clock.svg";
import light from "public/light.svg";
import Image from "next/image";
import useCommonTranslation from "locale/useCommonTranslation";

const ProfilePage = ({ auction, mini }) => {
  const {
    auctionInProgressI18,
    upComingAuctionI18
  } = useCommonTranslation();

  return (
    <div
      className={`absolute ${mini
          ? "px-[12px] py-[2px] text-[16px] sm:gap-[5px]"
          : "sm:gap-[6px] gap-[4px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:px-[12px] px-[5px] py-[4px] ml-[16px] mt-[12px] text-[16px]"
        } text-center z-10 text-white rounded-[29px] align-middle flex content-center ${auction.status !== "ONGOING"
          ? `bg-gradient-to-r from-[#4DC6C6] to-[#0FA6E7]`
          : `bg-gradient-to-r from-[#FE8243] via-[#FF5675] to-[#FE25D5]`
        }`}>
      <div
        className={`content-center`}>
        {auction.status === "ONGOING" ? (
          <div className="lg:w-[12px] lg:h-[18px] sm:w-[12px] sm:h-[18px] w-[6px] h-[9px] lg:mt-0 sm:mt-0 mt-[2px] flex justify-center items-center">
            <Image
              src={light.src}
              width={mini ? "6px" : "13px"}
              height={mini ? "9px" : "15px"}
              alt="light"
            />
          </div>
        ) : (
          <div className="lg:w-[12px] lg:h-[18px] sm:w-[12px] sm:h-[18px] w-[6px] h-[9px]">
            <Image
              src={clock.src}
              width={mini ? "6px" : "13px"}
              height={mini ? "9px" : "15px"}
              alt="clock"
            />
          </div>
        )}
      </div>
      <p className={`sm:text-[${mini ? "12px" : "14px"}] text-[9px]`}>
        {auction.status === "ONGOING"
          ? auctionInProgressI18
          : upComingAuctionI18}
      </p>
    </div>
  );
};

export default ProfilePage;
