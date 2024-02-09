import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useArtDetail from 'Components/entities/artwork/detail/useArtDetail'
import SellartHeader from './SellartHeader'
import SellartTab from './sellartTab/SellartTab'
import useSellart from './useSellart'
import useFee from '../useFee'
import useArtworkTranslation from 'locale/useArtworkTranslation'

function SellartForMarketPlace() {
  const { registrationOwnershipSaleI18 } = useArtworkTranslation()
  const { query } = useRouter()
  const { getArtDetail, artDetail } = useArtDetail()
  const { calcFee, setGeneratedFees } = useSellart()
  const { getAllFees } = useFee()
  
  useEffect(() => {
    if (query?.id)
      getArtDetail(query?.id).then(res => {
        getAllFees(res?.currency).then(feeRes => {
          const generatedFees = calcFee(feeRes)
          setGeneratedFees(generatedFees)
        })
      })
  }, [query?.id])

  return (
    <div>
      <div className="w-full pb-[141px]">
        <div className="w-full text-center sm:mt-[50px] mt-[25px] sm:mb-[110px] mb-[35px]">
          <h2 className="lg:text-[30px] sm:text-[24px] text-[20px] sm:tracking-[-2px] md:leading-[40px] text-[#E0E6E8] font-[500] leading-[30px]">
            {registrationOwnershipSaleI18}
          </h2>
        </div>
        <SellartHeader />
        <SellartTab />
      </div>
    </div>
  )
}

export default SellartForMarketPlace