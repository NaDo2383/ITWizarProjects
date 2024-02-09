import React, { useEffect } from 'react'
import CurationBanner from './CurationBanner'
import RecentMintedArtWorks from './RecentMintedArtWorks'
import IntroductionBody from './IntroductionBody'
import { useRouter } from 'next/router';
import useArtist from '../useArtist';

export default function ArtistIntroduction() {
  const {getArtistIntroduction, artistIntroduction, setArtistIntroduction} = useArtist();
  const { query, locale } = useRouter()

  useEffect(()=>{
    query?.id && getArtistIntroduction(query?.id)
},[query.id, locale])

  return (
    <div className='w-full max-w-[1410px] mx-auto'>
        <CurationBanner inroduction={artistIntroduction}/>
        <IntroductionBody inroduction={artistIntroduction}/>
        <RecentMintedArtWorks inroduction={artistIntroduction}/>
    </div>
  )
}
