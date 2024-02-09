import React, { useState, useEffect } from 'react';
import useCurrency from "common/metamask/useCurrency";
import { FaWonSign } from "react-icons/fa";
import { StampTamTam } from 'Components/ui/_moleculs/Stamps';

function MobilePerTransaction(props) {
    const {
        id,
        artworkThumb3x,
        price,
        createdDate,
        buyerFullname,
        sellerFullname,
        artworkName,
        currency,
        tamtamApproved
    } = props
    const { toEthers, toWon, excreptWon } = useCurrency();
    const [won, setWon] = useState(null);

    useEffect(() => {
        toWon(price, currency).then((res) => setWon(res));
    }, []);

    return (
        <div className='w-full mb-[15px] '>
            <div className='flex flex-col gap-[15px]'>
                <div className='flex justify-between bg-[#252525] rounded-t-[8px] p-[10px]'>
                    <h5 className='text-[13px] text-[#DDD] font-[500]'>{artworkName}</h5>
                    <div className='flex text-[#8E8E8E] text-[10px] font-[350] items-center justify-center'>{createdDate} </div>
                </div>
                <div className='flex justify-between px-[10px]'>
                    <div className='flex gap-2'>
                        <div>
                            <img alt="artworkThumb3x" src={artworkThumb3x} width="100%" height="100%" className="w-[50px] h-[50px] rounded-[4px] object-cover" />
                        </div>
                        <div className='min-w-[160px] mr-[20px] flex flex-col justify-center'>
                            <h5 className='text-[12px] text-[#B0B0B0] font-bold'>{artworkName}</h5>
                            <div className='flex flex-row'>
                            <div className='text-[12px] text-[#B0B0B0] font-[500]'>{sellerFullname}</div>
                            {tamtamApproved &&
                            <div className="icon flex justify-center items-center">
                                <StampTamTam src={'/star.png'} height={12} width={14} />
                            </div>}
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col xs:items-end'>
                        <div className='flex text-[13px] items-center gap-2 mt-2'>{toEthers(price)} MATIC</div>
                        <div className="flex items-center text-[10px] text-[#8E8E8E] font-[400]">
                            {price !== "0" && (
                                <>
                                    <FaWonSign />
                                    {excreptWon(won, id)}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <table className="border-collapse">
                        <thead className="w-full bg-[#161717]">
                            <tr className="font-light text-[12px] border-y border-[#262626]">
                                <th className="text-[#888] py-[9px] border-r border-[#262626] px-[10px]">From</th>
                                <th className="text-[#DDD] underline py-[9px] border-r border-[#262626]">{sellerFullname}</th>
                                <th className="text-[#888] py-[9px] border-r border-[#262626] px-[10px]">To</th>
                                <th className="text-[#DDD] underline py-[9px] border-[#262626]">{buyerFullname}</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            {/* <div className="flex-none md:flex gap-2 mb-3 items-center">
                <div className='flex flex-col items-center justify-center gap-2'>
                    <img alt="artworkThumb3x" src={artworkThumb3x} width="100%" height="100%" className="w-[160px] h-[135px] rounded-xl object-cover" />
                </div>
                <div className='flex items-center justify-center gap-2 mt-2 text-[14px] font-[400] text-white'>
                    <ArtCreator
                        data={{ authorName: sellerFullname, authorProfileImg: sellerProfileImg }}
                    />
                </div>
                <div className='flex items-center justify-center gap-2 mt-2'>Event: {event}</div>
                <div className='flex items-center justify-center gap-2 mt-2'>Price: {toEthers(price)} MATIC</div>
                <div className='flex items-center justify-center gap-2 mt-2'>
                    {<h2>{artworkName}</h2>}
                </div>
                <div className='flex items-center justify-center gap-2 mt-2'>
                    <ArtCreator
                        data={{ authorName: buyerFullname, authorProfileImg: buyerProfileImg }}
                    />
                </div>
                <div className='flex items-center justify-center gap-2 mt-2'>{createdDate} </div>
            </div>
    */}
        </div>

    )
}

export default MobilePerTransaction