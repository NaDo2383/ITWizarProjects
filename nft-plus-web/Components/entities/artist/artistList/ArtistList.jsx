import React, { useEffect, useRef, useState } from 'react'
import tw from 'tailwind-styled-components'
import ArtistLink from './ArtistLink'
import { BsChevronRight } from 'react-icons/bs'
import useLtrMenu from 'Components/ui/menu/ltrMenu/useLtrMenu'
import { sliceIntoChunks } from 'utils/array'
import ArtistBanners from './ArtistBanners'
import { Swiper, SwiperSlide } from "swiper/react";
import { useArtistContext } from '../useArtistContext'

function ArtistList() {
  const { artistList } = useArtistContext()
  const { handleLink, handleRight, menuRef } = useLtrMenu('artistDesktopLtr')
  const [slicedArtists, setSlicedArtists] = useState(null)
  const navNext = useRef(null);
  const params = {
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };
  useEffect(() => {
    artistList?.length > 0 &&
      sliceIntoChunks(artistList, 13).then(data => {
        setSlicedArtists(data)
      })
  }, [artistList])

  function nextSlide() {
    navNext.current?.slideNext()
  }


  return (
    <div className=''>
      <div className='flex'>
        <DesktopArtistList ref={menuRef}>
          {
            <Swiper
              className="w-full max-w-[1320px]"
              {...params}
              onBeforeInit={(swiper) => {
                navNext.current = swiper;
              }}
            >
              {slicedArtists?.map((chunk, idx) => (
                <SwiperSlide key={`gfnkjdaglkre-${idx}`} className='w-full sm:mr-[16px]'>
                  <SlidePanel>
                    {chunk.map((artist, artistIdx) => (
                      <div key={'artist-item' + artistIdx} className=''>
                        <ArtistLink
                          {...artist}
                          redDotWidth={13}
                          width={70}
                          height={70}
                          onClick={(e) => handleLink(e)}
                        />
                        <ArtistName>{artist.nickName.substr(0, 6)}</ArtistName>
                      </div>
                    ))}
                  </SlidePanel>
                </SwiperSlide>
              ))}
            </Swiper>
          }
        </DesktopArtistList>
        <RightButton onClick={() =>{
          document.activeElement?.blur()
          nextSlide()
        }}>
          <BsChevronRight fontSize={22} fontWeight={700} />
        </RightButton>
      </div>
      <div className='mt-[117px]'>
        <ArtistBanners />
      </div>
    </div>

  )
}

const DesktopArtistList = tw.div`
    flex
    flex-row
    gap-[5px]
    overflow-auto
    scrollbar-hide
`

const SlidePanel = tw.div`
    flex 
    flex-row
    gap-[31px]
    relative
    pt-[4px]  
`

const RightButton = tw.button`
  flex
  justify-center
  items-center
  h-[84px]
  w-[84px]
  rounded-full
  bg-[#2E2E2E]
  animationBtn
 `

const ArtistName = tw.h5`
  text-center
  text-[#D5D5D5]
  text-[15px]
  font-[400]
  mt-[8px]
  -tracking-[0.27px]
  whitespace-nowrap
 `

export default ArtistList