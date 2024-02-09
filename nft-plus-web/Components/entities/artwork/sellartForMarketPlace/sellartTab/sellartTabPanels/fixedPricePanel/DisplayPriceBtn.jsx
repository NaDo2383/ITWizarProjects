import useArtworkTranslation from 'locale/useArtworkTranslation'
import React from 'react'
import useSellart from '../../../useSellart'
import {BiLoaderCircle} from 'react-icons/bi'

function DisplayPriceBtn({ mintStatus, handleSubmit }) {
    const { 
        salesRegistrationI18, 
        token_issuingI18, 
    } = useArtworkTranslation()
    const { priceState } = useSellart()
    
  return (
    <>
        {
            mintStatus === "NOT_MINTED" && (
                <button
                    onClick={() => {}}
                    className={`sm:w-[143px] w-[100px] bg-[#333]${ isLoading && "cursor-wait" } rounded-md sm:h-[60px] h-[35px] sm:text-[16px] text-[14px] tracking-[-1px] leading-[30px] text-white font-[300] text-center`}>
                    {salesRegistrationI18}
                </button>
            ) 
        }
        {
            mintStatus === "MINTING" && (
                <button
                disabled
                className={`sm:w-[143px] w-[100px] bg-opacity-80 cursor-not-allowed bg-[#333] rounded-md sm:h-[60px] h-[35px] sm:text-[16px] text-[14px] tracking-[-1px] leading-[30px] text-white font-[300] text-center`}>
                {token_issuingI18}
              </button>
            )
        }
        {
            mintStatus === 'MINTED' && (
                <button
                    onClick={handleSubmit}
                    className={`sm:w-[140px] w-[100px] bg-[#404040] ${`${!priceState.isAllow && 'bg-opacity-60'}`}
                        ${priceState.isLoading && 'cursor-wait bg-opacity-60'} rounded-md sm:h-[46px] h-[35px] sm:text-[18px] text-[14px] tracking-[-1px] leading-[30px] text-white font-[500] text-center`}>
                    {priceState.isLoading ? (
                        <div className="w-max mx-auto text-xl animate-spin">
                        <BiLoaderCircle />
                        </div>
                    ) : (
                        `${salesRegistrationI18}`
                    )}
                </button>
            )
        }
    </>
  )
}

export default DisplayPriceBtn