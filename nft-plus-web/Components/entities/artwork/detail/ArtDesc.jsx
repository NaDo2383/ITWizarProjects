import useArtworkTranslation from 'locale/useArtworkTranslation'
import React from 'react'
import useArtDetail from './useArtDetail'

function ArtDesc() {
  const { workInfoI18 } = useArtworkTranslation()
  const { artDetail } = useArtDetail()
  
  return (
    <div className="w-full sm:p-[30px] p-[15px] sm:mt-[30px] mt-[15px] rounded-[5px] bg-[#252525]">
      <div className="desc-titleContainer">
        <h3 className="artwork-title">{workInfoI18}</h3>
      </div>
      <p className='font-[400] text-[#DDD] leading-[28px] lg:text-[16px] sm:text-[16px] text-[12px]'>{artDetail?.description}</p>
    </div>
  )
}

export default ArtDesc