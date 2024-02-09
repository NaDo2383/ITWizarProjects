import React from 'react'
import EventdetailTabLink from './EventdetailTabLink'
import useArtworkTranslation from 'locale/useArtworkTranslation'

function EventDetailTabHeader() {
    const { ownershipTransactionsI18, chainInfoI18 } = useArtworkTranslation()
  return (
    <div className="relative text-[#000] font-[500] mt-[30px] sm:text-[18px] text-[14px] flex gap-[15px]">
        <EventdetailTabLink linkId={0} text={ownershipTransactionsI18} />
        <EventdetailTabLink linkId={1} text={chainInfoI18} />
        <div className='absolute bottom-0 w-full border-b-2 border-[#4E4E4E] z-20' />
    </div>
  )
}

export default EventDetailTabHeader