/**
 * @createdBy Phill Anderson 2022/12/19
 */
import React from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";
import MainPopup from "Components/ui/popup/MainPopup";
import close_png from "public/close.png";
import defart from "public/no_photo.png";
import defpro from "public/def_pro.png";
import Image from "next/image";

function WouldYoBuyPopup() {
    const {paymentI18, wouldYouLikeBuyI18} = useArtworkTranslation();
   
    return (
        <MainPopup>
            WouldYoBuyPopup
            {/* <div className="tracking-tighter w-full">
                <div className="full relative">
                    <div className="px-6  font-medium text-[22px]">
                        <div className="w-full flex justify-end py-5">
                            <button onClick={() => location.reload()} type="button w-full h-[23px]">
                                <Image className="h-full" src={close_png} alt="" />
                            </button>
                        </div>
                        <div className="flex justify-center items-center  font-medium text-[20px]">{wouldYouLikeBuyI18}</div>
                        <div className="flex items-center justify-between border-b border-t py-6 px-5 mt-10">
                            <div className="flex items-center h-[94px] overflow-hidden">
                                <div className="relative w-[110px] h-[94px] rounded-xl overflow-hidden">
                                    <Image priority layout="fill" unoptimized src={buyDetails?.thumbnail ? buyDetails?.thumbnail : defart} objectFit="cover" alt="" />
                                </div>
                                <div className="ml-5 ">
                                    <h6 className="font-semibold text-[14px]">{buyDetails.title}</h6>
                                    <div className="flex items-center mt-2">
                                        <div className="relative w-[27px] h-[27px] rounded-full overflow-hidden bg-[#333]">
                                            <Image priority layout="fill" objectFit="cover" unoptimized src={buyDetails.owner.avatar ? buyDetails.owner.avatar : defpro} alt="" />
                                        </div>
                                        <span className="font-normal ml-2 text-[14px]">{buyDetails.owner.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className=" text-[15px] font-semibold">
                                {+buyDetails.price / Math.pow(10, 18)} <span className="font-normal">{buyDetails.currency}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full  text-[15px] text-white mt-12">
                    <button disabled={buying} className={`w-full text-center capitalize bg-[#333] ${buying && "bg-opacity-60 cursor-wait"} font-light py-4`} type="button" onClick={paymentHandler}>
                        {paymentI18}
                    </button>
                </div>
            </div> */}
        </MainPopup>
    );
}

export default WouldYoBuyPopup;
