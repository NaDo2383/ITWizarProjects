import useArtworkTranslation from 'locale/useArtworkTranslation'
import React from 'react'
import useSellart from '../../../useSellart'
import { BiLoaderCircle } from 'react-icons/bi'

function DisplayAuctionBtn({ mintStatus, handleSubmit }) {
    const {
        salesRegistrationI18,
    } = useArtworkTranslation()
    const { auctionState } = useSellart()

    return (
        <>
            <button
                onClick={handleSubmit}
                className={`sm:w-[140px] w-[100px] bg-[#404040] ${`${!auctionState.isAllow && 'bg-opacity-60'}`}
                        ${auctionState.isLoading && 'cursor-wait bg-opacity-60'} rounded-[5px] sm:h-[46px] h-[35px] sm:text-[18px] text-[14px] text-white font-[500] text-center`}>
                {auctionState.isLoading ? (
                    <div className="w-max mx-auto text-xl animate-spin">
                        <BiLoaderCircle />
                    </div>
                ) : (
                    `${salesRegistrationI18}`
                )}
            </button>
        </>
    )
}

export default DisplayAuctionBtn