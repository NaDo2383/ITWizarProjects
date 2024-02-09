import React from 'react'
import useArtworkTranslation from 'locale/useArtworkTranslation'

function LicenseRightBtn({ text }) {
    const { allRightsI18 } = useArtworkTranslation()
    
  return (
    <button className='m-1 py-[2px] px-[19px] text-center rounded-[50px] bg-[#111] sm:text-white border-[#C5C8D2] text-[13px] border-[0.5px] text-[#DDD]'>
        {allRightsI18[text] }
    </button>
  )
}

export default LicenseRightBtn