import React from 'react'
import ArtTabLink from './ArtTabLink'

function ArtTabHeader() {
  return (
    <div role='tab-header' className='flex relative w-full items-end xl:pb-10'>
        <div className='min-w-fit'>
            <ArtTabLink linkId={0} text="Holding" />
            <ArtTabLink linkId={1} text="On Sale" />
            <ArtTabLink linkId={2} text="Favorited" />
        </div>
        <div className='w-full border-b border-black' />
    </div>
  )
}

export default ArtTabHeader