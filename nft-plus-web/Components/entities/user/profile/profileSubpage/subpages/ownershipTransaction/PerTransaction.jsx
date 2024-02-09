import React, { useState, useEffect } from "react";
import { PlayCircle } from "@mui/icons-material";
import { VolumeUp } from "@mui/icons-material";
import { FaWonSign } from "react-icons/fa";
import useCurrency from "common/metamask/useCurrency";
import useMarket from "Components/entities/artwork/useMarket";
import { StampTamTam } from 'Components/ui/_moleculs/Stamps'

function PerTransaction(props) {
  const {
    id,
    artworkThumb3x,
    event,
    price,
    createdDate,
    buyerFullname,
    sellerFullname,
    artworkName,
    fileType,
    imageUrl,
    currency,
    tamtamApproved
  } = props;
  const { toEthers, toWon, excreptWon } = useCurrency();
  const [won, setWon] = useState(null);
  const { marketArts } = useMarket()

  useEffect(() => {
    toWon(price, currency, false, id).then((res) => setWon(res));
  }, [marketArts]);

  return (
    <tr>
      <td className="text-[#B0B0B0] font-[400]">{event}</td>
      <td>
        <div className='flex flex-row xl:w-full'>
          <div className='md:w-1/2'>
            {fileType !== "IMAGE" ? (
              fileType === "VIDEO" ? (
                <div className="relative h-full w-full ">
                  <video
                    className={`w-[78px] h-[70px] rounded-xl object-cover  bg-white`}
                    src={imageUrl}
                    loop
                    autoPlay
                    muted
                    playsInline
                    alt={imageUrl}>
                    <source src={imageUrl} type="video" />
                  </video>
                  <div className="absolute bottom-0 p-1 mr-[48px]">
                    <PlayCircle
                      style={{ width: "10px", height: "10px" }}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={artworkThumb3x ? artworkThumb3x : '/art1.jpg'}
                    className="w-[78px] h-[70px] rounded-xl object-cover"
                    alt="artworkThumb3x"
                  />
                  <div className="absolute bottom-0 p-1 mr-[48px]">
                    <VolumeUp
                      style={{ width: "10px", height: "10px" }}
                    />
                  </div>
                </div>
              )
            ) : (
              <img
                src={artworkThumb3x ? artworkThumb3x : '/art1.jpg'}
                className="w-[78px] h-[70px] rounded-xl object-cover"
                alt="artworkThumb3x"
              />
            )}
          </div>
          <div className='flex flex-col text-left justify-center md:w-1/2 xl:w-full'>
            <div className="flex flex-col">
              <h2 className="text-[#B0B0B0] text-[18px]
              font-[700] mb-1">{artworkName}</h2>
              <div className="flex flex-row gap-2">
                <p className="text-[#B0B0B0] text-[16px]">{sellerFullname}</p>
                {tamtamApproved &&
                  <div className="icon flex justify-center items-center mt-[6px]">
                    <StampTamTam src={'/star.png'} height={15} width={17} />
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="font-bold text-[#B0B0B0] mb-2">
          <p>
            {toEthers(price)}
            {currency}
          </p>
        </div>
        <div className="flex items-center justify-center text-[14px] text-[#8E8E8E] font-[400]">
          {price !== "0" && (
            <>
              <FaWonSign />
              {excreptWon(won, id)}
            </>
          )}
        </div>
      </td>
      <td className="text-[#FF2681] underline">
        {sellerFullname}
      </td>
      <td className="text-[#FF2681] underline">
        {buyerFullname}
      </td>
      <td className="text-[#B0B0B0] font-500">{createdDate}</td>
    </tr>
  );
}

export default PerTransaction;
