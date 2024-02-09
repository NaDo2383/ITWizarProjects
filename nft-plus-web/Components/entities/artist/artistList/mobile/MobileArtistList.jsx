import React, { useEffect } from 'react'
import tw from 'tailwind-styled-components'
import useLtrMenu from 'Components/ui/menu/ltrMenu/useLtrMenu'
import ArtistLink, { ArtistThumbnail } from '../ArtistLink'
import { useGlobalContext } from 'common/global/useGlobalContext'
import ArtistBanners from '../ArtistBanners'
import { useArtistContext } from '../../useArtistContext'
function MobileArtistList() {
    const { artistList } = useArtistContext()
    const { handleLink, menuRef } = useLtrMenu('artistMobileLtr')
    const { setIsShowArtistSearchBar } = useGlobalContext()

    function handleSearchbar() {
        setIsShowArtistSearchBar(prev => !prev)
    }

    return (
        <div className="relative">
            <div className='flex flex-col gap-[50px]'>
                <LtrContainer ref={menuRef} id="ltr-menu">
                    <ArtistThumbnail
                        bg='#FB3873'
                        onClick={handleSearchbar}
                        style={{ minWidth: `${60}px`, minHeight: `${60}px`, borderRadius: '25px' }}
                    >
                        <Hamburger>
                            <Line />
                            <Line />
                            <Line />
                        </Hamburger>
                    </ArtistThumbnail>
                    {artistList?.length > 0 &&
                        artistList.map((artist, idx) => (
                            <ArtistLink
                                key={'artist-' + idx}
                                {...artist}
                                redDotWidth={15}
                                width={60}
                                isList
                                onClick={(e) => handleLink(e)}
                            />
                        ))}
                </LtrContainer>
                <div className='flex flex-col gap-[40px]'>
                    <ArtistBanners />
                </div>
            </div>
        </div>
    )
}

const LtrContainer = tw.div`
    flex
    sm:px-2
    sm:gap-[10px]
    gap-[15px]
    max-w-[580px]
    pt-[4px]
    text-white
    overflow-auto
    scrollbar-hide
`

const Hamburger = tw.div`
    w-full 
    h-full 
    flex 
    flex-col 
    items-center 
    justify-center 
    gap-[3px] 
    px-[22px] 
    rounded-[25px]
    bg-gradient-to-tl from-[#FFAB91] to-[#FB3873]
`

const Line = tw.div`
    bg-white 
    w-full 
    h-[2px]
    rounded-[10px]
`

export default MobileArtistList
