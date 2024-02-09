import React from 'react'
import Image from 'next/image'
import tw from 'tailwind-styled-components'
import RedDot from 'Components/ui/_atoms/RedDot'
import { useGlobalContext } from 'common/global/useGlobalContext'
import useArtist from '../useArtist'

function ArtistLink({ id, profileImgUrl, nickName, redDotWidth, width, minted, isList }) {
    const { gotoArtistDetail } = useArtist()
    const { browserWindow } = useGlobalContext()
    const imgWidth = browserWindow.innerWidth > 600 ? 71 : 60
    const imgHeight = browserWindow.innerWidth > 600 ? 71 : 60
    const defaultUserWidth = isList ? 60 : browserWindow.innerWidth > 600 ? 71 : 60
    
    return (
        <div className='relative flex justify-center items-center'>
            <ArtistThumbnail 
                onClick={ ()=> gotoArtistDetail(id) } 
                style={{ minWidth: `${width || 60}px`, minHeight: `${width || 60}px` }}    
            >
                {profileImgUrl ? (
                    <Image
                        src={profileImgUrl}
                        alt={'image of ' + nickName}
                        layout="fill"
                        objectFit="cover"
                    />
                ) : (
                    <div className='absolute -bottom-1'>
                        <Image 
                            src={'/user-default.png'}  
                            alt={'image of ' + nickName}
                            width={defaultUserWidth}
                            height={defaultUserWidth}
                            objectFit="cover" 
                        />
                    </div>
                )}
            </ArtistThumbnail>
            {
                minted  &&  <RedDotWrapper>
                                <RedDot width={redDotWidth} />
                            </RedDotWrapper>
            }
        </div>
    )
}

export const ArtistThumbnail = tw.div` 
    flex
    items-center
    justify-center
    relative
    min-w-[60px] 
    min-h-[60px]
    rounded-[20px]
    overflow-hidden
    ${(p) => p.bg ? `bg-[${p.bg}]` : 'bg-[#7B7B7B]'}
    cursor-pointer
    sm:rounded-[26.4px]
    rounded-[20px]
    sm:w-[71px]
    sm:h-[71px]
`

export const RedDotWrapper = tw.div`
    absolute
    -top-1
    -right-1
`

export default ArtistLink
