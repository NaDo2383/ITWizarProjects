const { default: Image } = require("next/image");
import eyesicon from "public/eyesicon.svg";
import matic_logo from "public/matic-logo.png";
import defPro from "public/def_pro.png";
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import useCurrency from "common/metamask/useCurrency";
import { useState, useEffect } from "react";
import { FaWonSign } from "react-icons/fa";
import useArtworkTranslation from "locale/useArtworkTranslation";

const MobileCreatorProfile = ({
  creator_avatar,
  creator,
  thumbnail_url,
  title,
  fileType,
  imageUrl,
  price,
  currency,
  isAuction,
  auction,
  id
}) => {
  const { currentPriceI18 } = useArtworkTranslation();
  const thePrice = isAuction ? auction?.price : price;
  const { toWon, excreptWon, toEthers } = useCurrency()
  const [won, setWon] = useState(null);

  useEffect(() => {
    toWon(thePrice, currency, false, id).then((res) => setWon(res));
  }, []);

  return (
    <>
      <div className="hidden sm:flex sm:flex-row overflow-hidden w-full gap-[16px] bg-black p-[15px]">
        <>
          {fileType !== "IMAGE" ? (
            fileType === "VIDEO" ? (
              <div className="relative h-full flex">
                <video
                  className={`sm:w-[134px] sm:h-[134px] rounded-xl object-cover bg-white`}
                  src={imageUrl}
                  loop
                  autoPlay
                  muted
                  playsInline
                  alt={imageUrl}>
                  <source src={imageUrl} type="video" />
                </video>
                <div className="absolute bottom-0 p-2 mr-28">
                  <PlayCircle
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </div>
            ) : (
              <div className="relative h-full flex">
                <img
                  src={thumbnail_url ? thumbnail_url : "/art1.jpg"}
                  width="100%"
                  height="100%"
                  className="sm:w-[134px] sm:h-[134px] rounded-xl object-cover"
                  alt="thumbnail_url"
                />
                <div className="absolute bottom-0 p-2 mr-28">
                  <VolumeUp
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </div>
            )
          ) : (
            <div className="sm:w-[134px] sm:h-[134px]">
              <Image
                className="rounded-[5px]"
                src={thumbnail_url}
                objectFit="cover"
                alt="thumbnail_url"
                height={134}
                width={134}
              />
            </div>
          )}
        </>
        <div className="w-[336px] flex flex-col justify-between sm:h-[135px] h-[100px]">
          <div>
            <h3 className="sm:text-[16px] text-[14px] text-[#fff] font-[500] sm:h-[46px]">{title}</h3>
          </div>
          <div
            className={`flex gap-1 justify-between w-full flex-col items-start sm:flex-row sm:mt-[13px]`}>
            {
              <>
                <div className="flex gap-[5px] sm:text-[18px] text-[15px] text-[#DDD] font-bold">
                  <div className="sm:text-[16px] text-[12px] font-[300] text-white mt-[3px]">{currentPriceI18}</div>
                  <div className="relative flex items-center justify-center">
                    <Image
                      width={17}
                      height={17}
                      src={currency === "EYES" ? eyesicon : matic_logo}
                      alt="artwork-currency"
                    />
                  </div>
                  <p className="sm:text-[18px] text-[15px]">{toEthers(thePrice)}</p>
                  {currency}
                </div>
                <div className="flex items-center sm:text-[14px] text-[10px] text-[#5E5E5E] font-[400] mt-1">
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
          <div className="flex items-center lg:mt-[11px] sm:mt-[8px] border-t border-[#999] pt-[10px] relative">
            <div className="relative sm:w-[31px] sm:h-[31px] w-[15px] h-[15px] rounded-full overflow-hidden bg-[#333]">
              <Image
                priority
                unoptimized
                layout="fill"
                objectFit="cover"
                src={creator_avatar ? creator_avatar : defPro}
                alt="creator_avatar"
              />
            </div>
            <span className="font-normal ml-2 text-[#B1B1B1] lg:text-[14px] md:text-[14px] text-[10px]">
              {creator}
            </span>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex justify-center">
        <>
          {fileType !== "IMAGE" ? (
            fileType === "VIDEO" ? (
              <div className="relative h-full flex">
                <video
                  className={`w-[70px] h-[70px] rounded-xl object-cover bg-white`}
                  src={imageUrl}
                  loop
                  autoPlay
                  muted
                  playsInline
                  alt={imageUrl}>
                  <source src={imageUrl} type="video" />
                </video>
                {/* <div className="absolute bottom-0 p-2 mr-28">
                  <PlayCircle
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
            </div>*/}
              </div>
            ) : (
              <div className="relative h-full flex">
                <img
                  src={thumbnail_url ? thumbnail_url : "/art1.jpg"}
                  width="100%"
                  height="100%"
                  className="w-[70px] h-[70px] rounded-xl object-cover"
                  alt="thumbnail_url"
                />
                {/* <div className="absolute bottom-0 p-2 mr-28">
                  <VolumeUp
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
            </div>*/}
              </div>
            )
          ) : (
            <div className="w-[70px] h-[70px]">
              <Image
                className="rounded-[5px]"
                src={thumbnail_url}
                objectFit="cover"
                alt="thumbnail_url"
                height={134}
                width={134}
              />
            </div>
          )}
        </>
      </div>
     {/* <div>
        <div className="flex flex-col justify-center mt-[10px]">
          <h3 className="text-[14px] text-center text-[#fff] font-[500]">{title}</h3>
        </div>
        <span className="font-normal ml-2 text-[#B1B1B1] lg:text-[14px] md:text-[14px] text-[10px]">
          {creator}
        </span>
          </div>*/}
    </>
  );
};

export default MobileCreatorProfile;
