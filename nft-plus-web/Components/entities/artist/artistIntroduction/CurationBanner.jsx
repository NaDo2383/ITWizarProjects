import useCommonTranslation from "locale/useCommonTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import useArtist from "../useArtist";
import { getImage } from "utils/fn";
import { useState } from "react";

export default function CurationBanner({ inroduction }) {
    const { submenu_artist } = useCommonTranslation();
    const date = inroduction?.createdDate?.split(" ")[0];
    const {getArtistIntroduction} = useArtist();

    const [imgHeight, setImgHeight] = useState(0);
    useEffect(() => {
        if(inroduction){
            getImage( isMobile ? inroduction.mobileImageUrl : inroduction?.imageUrl , (err, img) => {
                if(img?.naturalHeight, img?.naturalWidth){
                    window.innerWidth>1410 ? setImgHeight(window.innerWidth * (img.naturalHeight/img.naturalWidth)) : setImgHeight(1410 * (img.naturalHeight/img.naturalWidth))
                }
            });
        }
    }, [inroduction, isMobile])

    return (
        <div className="w-full flex flex-col justify-center">
            <div className="flex justify-center sm:mt-[75px] mt-[25px] sm:text-[24px] text-[20px] text-[#E0E6E8] font-medium tracking-[-0.36px]">
                {submenu_artist}
            </div>
            <div className="sm:mt-[40px] mt-[20px] bg-gray-300 relative sm:w-[1410px] w-[360px] sm:h-[700px] h-[450px] mx-auto">
                <div className="hidden sm:block">
                    {( imgHeight !== 0 && inroduction?.imageUrl ) &&
                        <Image
                        src={ inroduction?.imageUrl }
                        alt={"artist banner"}
                        width={1410}
                        height={700}
                    />}
                </div>
                <div className="sm:hidden">
                    {( imgHeight !== 0 && inroduction?.mobileImageUrl ) &&
                        <Image
                        src={ inroduction?.mobileImageUrl }
                        alt={"artist banner"}
                        width={ 360 }
                        height={ 450 }
                    />}
                </div>
                <div className="absolute top-0 left-0 sm:w-[1410px] w-[360px] sm:h-[700px] h-[450px] curationBannerGradiant"></div>
                <div className="absolute sm:bottom-[48.7px] bottom-[29.47px] sm:left-[69px] left-[20px] break-keep">
                    <div className="text-[#FFF] sm:text-[38px] text-[24px] font-medium sm:mb-[15px] mb-[12.14px] " style={{wordBreak: "keep-all"}}>
                        {inroduction?.title}
                    </div>
                    <div className="text-[#FFF] sm:text-[24px] text-[15px] font-[350] sm:mb-[40.3px] mb-[12.14px] " style={{wordBreak:  "keep-all"}}>
                        {inroduction?.description}
                    </div>
                    <div className="text-[#EEE] sm:text-[16px] text-[12px] font-[350] ">
                        {date}
                    </div>
                </div>
            </div>
        </div>
    );
}