import React, { useEffect, useState } from 'react'
import { useArtistContext } from '../useArtistContext'
import Image from 'next/image'
import tw from 'tailwind-styled-components'
import { useRouter } from 'next/router'
import { useGlobalContext } from 'common/global/useGlobalContext'

function ArtistBanners() {
    const { push } = useRouter()
    const { artistBanners } = useArtistContext()
    const { browserWindow } = useGlobalContext()
    const [bannerHeight, setBannerHeight] = useState(0);

    function handleArtistBanner(artistId) {
        push('/artist/introduction_artist/' + artistId)
    }

    function calcImgHeight() {
        switch (true) {
            case browserWindow.innerWidth < 600:
                return 1000
            case browserWindow.innerWidth < 442:
                return 300
            case browserWindow.innerWidth < 380:
                return 700
            default:
                return 380
        }
    }

    useEffect(() => {
        if (artistBanners) {
            window.innerWidth > 1410 ? setBannerHeight(350) : setBannerHeight(window.innerWidth * 0.2482)
        }
    }, [artistBanners])

    return (
        <div className='grid md:grid-cols-2 grid-cols-1 sm:gap-[35px] gap-[30px] sm:pb-[200px] pb-[60px] rounded-[20px]'>
            {
                artistBanners?.result?.length > 0 && artistBanners.result.map((banner, idx) => {
                    return (
                        <div className='artistCard w-full sm:mb-[25px] mx-auto relative s:min-h-[350px] h-[166px] bg-[#2E2E2E] rounded-[20px] cursor-pointer overflow-hidden' key={'artist-banner-' + idx} onClick={() => handleArtistBanner(banner.artistId)}>
                            <Image
                                src={banner.bannerUrl}
                                alt={'artist-banner-image-' + idx}
                                priority
                                unoptimized
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

const ArtistBannerMobile = tw.div`
    w-[330px]
    h-[166px]
    bg-[#2E2E2E]
    rounded-[5px]
    cursor-pointer
    overflow-hidden
`
export default ArtistBanners