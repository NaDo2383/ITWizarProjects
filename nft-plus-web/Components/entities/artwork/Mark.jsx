import clock from "public/clock.svg";
import light from "public/light.svg";
import Image from "next/image";
import useCommonTranslation from "locale/useCommonTranslation";

const Markl = ({ auction, mini }) => {
  const {
    auctionInProgressI18,
    upComingAuctionI18
  } = useCommonTranslation();
  return (
    <div
      className={`absolute ${mini
          ? "sm:px-[12px] px-[5.5px] text-[16px] gap-[2px]"
          : "gap-[2px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:px-[14px] px-[5.5px] lg:m-[20px] sm:m-[20px] m-[10px] lg:text-[20px] sm:text-[18px] text-[9px]"
        } text-center sm:py-[2.5px] justify-center z-10 text-white rounded-[20px] align-middle items-center flex content-center ${auction.status !== "ONGOING"
          ? `bg-gradient-to-r from-[#4DC6C6] to-[#0FA6E7]`
          : `bg-gradient-to-r from-[#FE8243] via-[#FF5675] to-[#FE25D5]`
        }`}>
      <div
        className={`content-center`}>
        {auction.status === "ONGOING" ? (
          <div className="sm:w-[12px] sm:h-[18px] w-[6px] h-[9px] lg:mb-0 sm:mb-0 flex justify-center items-center">
            <Image
              src={light.src}
              width={mini ? "9px" : "12px"}
              height={mini ? "15px" : "18px"}
              alt="light"
            />
          </div>
        ) : (
          <div className="sm:w-[15px] sm:h-[18px] w-[10px] h-[10px] lg:mb-0 sm:mb-0 flex justify-center items-center">
            <Image
              src={clock.src}
              width={mini ? "15px" : "18px"}
              height={mini ? "15px" : "18px"}
              alt="clock"
            />
          </div>
        )}
      </div>
      <p className={`flex items-center mb-[4px] text-white lg:text-[16px] sm:text-[14px] text-[11px] justify-center mt-[2px]`}>
        {auction.status === "ONGOING"
          ? auctionInProgressI18
          : upComingAuctionI18}
      </p>
    </div>
  );
};

export default Markl;
