import React from 'react'
import useArtDetail from '../detail/useArtDetail'
import BoxPic from "public/box-pic.png";
import Image from 'next/image';

function SellartHeader() {
    const { artDetail } = useArtDetail()

    return (
        <div className="flex justify-center h-full">
            <div className="sm:py-0 md:mx-auto w-full  h-full relative flex justify-center items-center flex-col sm:flex-row">
                {/*<div onClick={() => back()}
                    className="w-[35px] h-[25px] self-start sm:self-center sm:absolute left-2 sm:left-0 cursor-pointer">
                    <Image className="w-full h-full" src={ArrowLeft} alt="ArrowLeft" />
    </div>*/}
                <div className="flex-col flex items-center h-full sm:gap-[17px] gap-[10px]">
                    <div className="rounded-[5px] lg:w-[134px] lg:h-[134px] sm:w-[110px] sm:h-[110px] w-[70px] h-[70px] overflow-hidden flex justify-center relative items-center">
                        <Image
                            unoptimized
                            src={artDetail?.thumbnailUrl2x || BoxPic}
                            layout="fill"
                            objectFit="cover"
                            alt="art-image"
                        />
                    </div>
                    <div>
                        <h6 className="sm:text-[16px] text-[14px] text-center text-white font-[500]">
                            {artDetail?.artworkName}
                        </h6>
                        <div className="flex items-center gap-[8px] justify-center mt-[7px]">
                            <div className="relative h-[31px] w-[31px] rounded-full overflow-hidden border bg-[#A4A4A4] items-end justify-center">
                                {artDetail?.ownerProfileImg && <Image
                                    layout="fill"
                                    objectFit="cover"
                                    unoptimized
                                    src={artDetail?.ownerProfileImg}
                                    alt="ownerProfileImg"
                                />}
                            </div>
                            <p className="text-[14px] text-[#B0B0B0] font-[400]">
                                {artDetail?.ownerName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellartHeader