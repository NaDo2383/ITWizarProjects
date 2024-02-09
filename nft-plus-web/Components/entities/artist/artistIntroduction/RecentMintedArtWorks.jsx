import React, { useEffect } from "react";
import ArtistRecentArtworkCard from "./ArtistRecentArtworkCard";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import useArtist from "../useArtist";

export default function RecentMintedArtWorks({inroduction}) {
    const { SeeMoreI18 } = useArtworkTranslation();
    const { check_out_the_author_worksI18 } = useCommonTranslation();
    const route = useRouter();
    const { query } = useRouter()
    const {getArtistIntroduction} = useArtist();

    return (
        <div className="sm:w-full w-[328px] mx-auto">
            <div className="sm:mt-[45px] mt-[25px] font-mont sm:text-[22px] text-[15px] font-semibold text-[#fff]">
                {"✨ "+inroduction?.user?.nickname+" "+check_out_the_author_worksI18} 
            </div>
            <div className="w-full sm:mt-[40px] mt-[20px] grid md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 gap-[12px]">
                {(inroduction?.artworks && inroduction.artworks.length > 0) && inroduction.artworks.map((artwork, index) =>{
                    if( isMobile ) 
                    {   if(index < 2)
                        return <ArtistRecentArtworkCard key={"bghrubgjr"+index} artwork={artwork}/> 
                    } else {
                        return <ArtistRecentArtworkCard key={"bghrubgjr"+index} artwork={artwork}/>
                    }
                })}
            </div>
            <div 
            onClick={()=>route.push(`/artist/${inroduction?.user?.id}`)}
            className="sm:text-[18px] text-[15px] text-[#fff] sm:leading-[36px] sm:tracking-[-0.27px] tracking-[-0.225px] cursor-pointer sm:mt-[50px] mt-[20px] sm:mb-[200px] mb-[60px] w-full sm:h-[67px] h-[35px] border-[#606060] border flex justify-center items-center">
                {SeeMoreI18}
            </div>
        </div>
    );
}
