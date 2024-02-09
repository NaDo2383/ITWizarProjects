import React from 'react'
import ArtdetailTabLink from './ArtdetailTabLink'
import useArtworkTranslation from 'locale/useArtworkTranslation'

function ArtDetailTabHeader() {
    const { licenceAvailableI18, certifiedWorkI18 } = useArtworkTranslation()
    
  return (
    <div className="relative text-[#000] font-[500] my-2 sm:text-[18px] text-[12px] flex mb-[20px]">
        <ArtdetailTabLink linkId={0} text={licenceAvailableI18} />
        <ArtdetailTabLink linkId={1} text={certifiedWorkI18} />
        <div className='absolute md:right-[-50px] lg:right-[4px] bottom-0 lg:w-80 lg:border-b-2 lg:border-[#4E4E4E] z-20'></div>
    </div>
  )
}

export default ArtDetailTabHeader