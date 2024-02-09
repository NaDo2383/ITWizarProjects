import React from 'react'
import ArtTabLink from '../profileArtwork/artTab/ArtTabLink'

function LicenseTabheader() {
  return (
    <div role='tab-header' className='flex relative w-full items-end xl:pb-10'>
        <div className='min-w-fit'>
            <ArtTabLink linkId={0} text="Contract Review" />
            <ArtTabLink linkId={1} text="Completed contract" />
        </div>
        <div className='w-full border-b border-black' />
    </div>
  )
}

export default LicenseTabheader