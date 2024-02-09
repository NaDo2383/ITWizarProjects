import IFrame from 'Components/ui/Iframe'
import usePopup from 'Components/ui/popup/usePopup'
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FiSend } from 'react-icons/fi'
import useArtist from '../useArtist'


export default function IntroductionBody({ inroduction }) {
    const { MODAL_TYPES, handleShowModal } = usePopup()
    const handleShare = async () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(window.location.href)
            handleShowModal(MODAL_TYPES.CLIPBOARD)
        }
    }
    const { handleArtistHeart, loading } = useArtist()
    const [ likeState, setLikeState ] = useState({
        likeCount: 0,
        isLiked: false
    });

    useEffect(() => {
        setLikeState({...likeState,
            likeCount: inroduction?.likeCount,
            isLiked: inroduction?.liked
        })
    },[inroduction])

    
    return (
        !loading && 
        <div className="border-b border-[#474747] sm:w-full w-[328px] mx-auto">
            <div className="sm:w-full w-[320px] max-w-[746px] mx-auto relative sm:mt-[90px] mt-[63px]">
                {inroduction?.content && <IFrame src={inroduction?.content}/>}
            </div>
            <div className="sm:mt-[100px] mt-[70px] mx-auto flex justify-center gap-[15px] sm:mb-[89.55px] mb-[30px]">
                {likeState?.isLiked ? (
                    <div
                        onClick={() => handleArtistHeart(inroduction?.artistId, likeState, setLikeState)}
                        className="flex justify-center items-center cursor-pointer border border-[#606060] min-w-[153px] min-h-[53px] gap-[3px]"
                    >
                        <AiFillHeart className="text-[#ABABAB] cursor-pointer [20px] h-[20px]" />
                        <span className="text-[#ABABAB]">{likeState?.likeCount}</span>
                    </div>
                ) : (
                    <div
                        onClick={() => handleArtistHeart(inroduction?.artistId, likeState, setLikeState)}
                        className="flex justify-center items-center cursor-pointer border border-[#606060] min-w-[153px] min-h-[53px] gap-[3px]"
                    >
                        <AiOutlineHeart className="text-[#ABABAB] cursor-pointer [20px] h-[20px]" />
                        <span className="text-[#ABABAB]">{likeState?.likeCount}</span>
                    </div>
                )}
                <div
                    onClick={handleShare}
                    className="flex justify-center items-center cursor-pointer border border-[#606060] min-w-[153px] min-h-[53px] gap-[3px]"
                >
                    <FiSend className="text-[#ABABAB] cursor-pointer w-[20px] h-[20px]" />
                    <span className="text-[#ABABAB]">SHARE</span>
                </div>
            </div>
        </div>
    )
}
