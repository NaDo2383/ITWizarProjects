import React, { useEffect, useState, useRef } from 'react'
import tw from 'tailwind-styled-components'
import SearchBar from 'Components/ui/searchbar/SearchBar'
import ArtistSearchResults from './ArtistSearchResults'
import { useGlobalContext } from 'common/global/useGlobalContext'
import useOnClickOutside from 'common/mouse/useOnClickOutside'
import { useRouter } from 'next/router'

function ArtistSearchBar() {
  const { pathname }  = useRouter()
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    setIsShowArtistSearchBar(false)
  })
  const { 
    isShowArtistSearchBar, 
    setIsShowArtistSearchBar,
    globalItems,
    setGlobalItems,
  } = useGlobalContext()
  const artistList = globalItems.artistList
  const artistOriginalList = globalItems.artistOriginalList

 function handleArtistSearch(searchValue){
    
      if(!searchValue || searchValue === '') {
        setGlobalItems(prev => ({
          ...prev,
          artistList: artistOriginalList
        }))
        return
      }

    const searchedArtistList = artistOriginalList?.filter((artist) => {
      if(artist.nickName.toLowerCase().includes(searchValue.toLowerCase())){
        return artist
      }
    })

    setGlobalItems(prev => ({
      ...prev,
      artistList: searchedArtistList
    }))
}

  useEffect(() => {
    setIsShowArtistSearchBar(false)
  },[pathname])


  return (
    <ArtistSearchPanel ref={ref} isshowsearchbar={isShowArtistSearchBar.toString()}>
        <SearchBar onClick={handleArtistSearch} />
        <ArtistSearchResults />
    </ArtistSearchPanel>
  )
}

const ArtistSearchPanel = tw.div`
  absolute
  top-[162px]
  ${(p) => p.isshowsearchbar === 'true' ? 'translate-x-0' : '-translate-x-[110%]' }
  flex
  flex-col
  w-full
  h-[calc(100vh - 150px)]
  px-[16px]
  overflow-y-scroll
  bg-[#161717]
  transition
  scrollbar-hide
  `

export default ArtistSearchBar