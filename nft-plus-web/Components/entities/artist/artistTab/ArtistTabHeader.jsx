import React from 'react'
import ArtistTabLink from './ArtistTabLink'
import useCommonTranslation from 'locale/useCommonTranslation'

function ArtistTabHeader() {
    const { mintNFTI18, buyNFTI18 } = useCommonTranslation()
    
  return (
    <div className="flex justify-center gap-6 w-full pt-[20px] sm:pt-[100px]">
        <ArtistTabLink linkId = {0} text={mintNFTI18} />
        <ArtistTabLink linkId = {1} text={buyNFTI18} />
    </div>
  )
}

export default ArtistTabHeader