import Slider from 'Components/ui/swiper/Swiper'
import React from 'react'
import { SwiperSlide } from 'swiper/react'
import useArtwork from './useArtwork'
import RecentArtCard from './RecentArtCard'

function RecentArtworkSlider() {
  const { artworksByCatName} = useArtwork()

  return (
    <div className='w-full container mx-auto'>
      <Slider slidesPerView = {{ md: 3 , lg: 4 }}>
          {
            artworksByCatName?.length > 0 && artworksByCatName.map((artwork ,idx) => (
              <SwiperSlide key={ 'artworkByCategory' + idx }>
                  <RecentArtCard { ...artwork } />
              </SwiperSlide>
            )) 
          }
        </Slider>
    </div>
  )
}

export default RecentArtworkSlider