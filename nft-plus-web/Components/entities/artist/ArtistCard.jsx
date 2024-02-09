import MainCard from 'Components/ui/card/MainCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import defPro from "public/def_pro.png";

function ArtistCard(props) {
  const {
    id,
    nickName,
    bgFileUrl,
    profileImgUrl,
    artistFileUrl
  } = props

  return (
    <MainCard>
      <Link href={'/artist/' + id}>
        <a>
          <div className="h-[95px] sm:h-[200px]">
            {
              artistFileUrl ?
                <img
                  src={artistFileUrl}
                  className="w-full h-[95px] sm:h-[200px] object-cover"
                  alt={nickName}
                />
                :
                // <img 
                //   src={"/artist-card-default.png"} 
                //   className="w-full h-[95px] sm:h-[200px] object-cover" 
                //   alt={nickName} 
                // />
                <div className='bg-[#272727] w-full h-full'>
                </div>
            }
          </div>
          <MainCard.Body>
            <div className='absolute -top-[40%] lg:-top-[40%] left-[50%] -translate-x-[50%]  w-[38px] h-[38px] lg:w-[80px] lg:h-[80px] overflow-hidden rounded-full'>
              <Image
                src={profileImgUrl || defPro}
                width={80}
                height={80}
                objectFit='cover'
                alt='circle'
                className='bg-black'
              />
            </div>
            <h5 className='pt-[18px] pb-[14px] text-[12px] md:pt-[49px] md:pb-[30px] md:text-[18px] text-center'>
              {nickName}
            </h5>
          </MainCard.Body>
        </a>
      </Link>
    </MainCard>
  )
}

export default ArtistCard