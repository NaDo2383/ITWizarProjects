import doubleStar from "public/doubleStar.png";
import Image from "next/image";
import Web3 from "web3";
import useArtworkTranslation from "locale/useArtworkTranslation";

const BiddingStatus = ({ auction }) => {
  const { beFirstBidsI18, auctionDateI18, bidderI18, bidI18, biddingStatusI18 } =
    useArtworkTranslation();

  return (
    <>
      <div>
        <h5 className="text-[#fff] text-[14px] font-[400] mb-[15px] sm:hidden">{biddingStatusI18}</h5>
        <div className="sm:h-[134px] sm:mb-2 border-b border-[#4E4E4E]">
          <div className="bg-[#2F2E39] flex justify-around py-[4px] text-[#DDD] text-[12px] font-[400]">
            <div>{auctionDateI18}</div>
            <div>{bidderI18}</div>
            <div>{bidI18}</div>
          </div>
          <div className="sm:h-[100px] sm:py-0 py-[34px] overflow-auto text-[#DDD] sm:text-[14px] text-[12px] flex flex-col gap-[10px] w-full sm:mt-3 font-[400]">
            {auction?.bids.length > 0 ? (
              auction?.bids.map((bid, id) => (
                <div key={id} className="flex justify-between  w-full">
                  <div className="w-1/3 text-center">
                    {bid.createdDate?.replaceAll("-", ".")}
                  </div>
                  <div className="w-1/3 text-center underline">
                    {bid.nickname}
                  </div>
                  <div className="w-1/3 text-center flex flex-row gap-1 justify-center">
                    <div className="font-[700]">
                      {Web3.utils.fromWei(bid.price.toString(), "ether")}
                    </div>
                    {bid.currency}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center content-center h-full text-[#b5b5b5] gap-[2px] sm:text-[16px] text-[12px]">
                <div className="sm:h-[13px] sm:w-[13px] h-[12px] w-[12px]">
                  <Image
                    src={doubleStar.src}
                    alt="double start"
                    width="13px"
                    height="13px"
                  />
                </div>
                {beFirstBidsI18}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BiddingStatus;
