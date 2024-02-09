import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useArtDetail from "./useArtDetail";
import useArtwork from "../useArtwork";

export default function MobileMainInfoHeartBtn({ heartCount, hearted }) {
    const [recentArt, setRecentArt] = useState({
		heartCount: +heartCount,
		isHearted: hearted,
		convertedWon: null
	});
    const { artDetail } = useArtDetail();

    const heartObj = {
		artwork: artDetail, 
		recentArt,
		setRecentArt
	}
    const { handleArtworkHeart } = useArtwork();

    return (
        <div className="flex items-center pl-[16.5px] pt-[14px] pb-[34px]">
            <button
                onClick={() => handleArtworkHeart(heartObj)}
                className="w-[19.7px] h-[18.1px]"
            >
                {recentArt.isHearted ? (
                    <AiFillHeart className="text-[#777777] cursor-pointer w-[19.7px] h-[18.1px]" />
                ) : (
                    <AiOutlineHeart className="text-[#777777] cursor-pointer w-[19.7px] h-[18.1px]" />
                )}
            </button>
        </div>
    );
}
