import useArtworkTranslation from 'locale/useArtworkTranslation'
import React from 'react'
import useArtDetail from './useArtDetail'

function AuthorDesc() {
  const { authorInfoI18 } = useArtworkTranslation()
  const { artDetail } = useArtDetail()
  
  return (
    <div className="w-full sm:p-[30px] p-[15px] lg:mt-[30px] sm:mt-[30px] mt-[15px] rounded-[5px] bg-[#252525]">
      <div className="desc-titleContainer">
        <h3 className="artwork-title">{authorInfoI18}</h3>
      </div>
      <p className='font-[400] text-[#DDDDDD] leading-[28px] lg:text-[16px] sm:text-[16px] text-[12px]'>{artDetail?.artistDescription}</p>
    </div>
  )
}

export default AuthorDesc