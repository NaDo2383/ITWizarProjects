import React from 'react'
import tw from 'tailwind-styled-components'
import ArtistLink from '../ArtistLink'
import { useGlobalContext } from 'common/global/useGlobalContext'
import { subStr } from 'utils/string'
import useArtist from '../../useArtist'

function ArtistSearchResults() {
    const { globalItems } = useGlobalContext()
    const artists = globalItems.artistList
    return (
        <ArtistSearchWrapper>
            <SearchCount>
                <ResultH2>총 {artists?.length} 명</ResultH2>
            </SearchCount>
            <div className='flex flex-col sm:gap-0 gap-[30px]'>
                {
                    artists && artists?.length > 0 && artists.map((artist, idx) => (
                        <PerResult key={idx} {...artist} />
                    ))
                }
            </div>
        </ArtistSearchWrapper>
    )
}

const ArtistSearchWrapper = tw.div`
    flex 
    flex-col 
    mt-[25px] 
    mb-[36px]
    max-h-[80vh]
    overflow-y-scroll 
    scrollbar-hide
`

const SearchCount = tw.div`
    pb-[10px] 
    mb-[10px] 
    border-b 
    border-[#474747]
`
export const ResultH2 = tw.h3`
    text-[14px]
    text-[#BABABA]
`

export const ResultName = tw.h2`
    text-white
    text-[15px]
    cursor-pointer
`

export const ResultDesc = tw.p`
    text-[#989898]
    text-[14px]
    font-[350]
`

const PerResultWrapper = tw.div`
    flex 
    gap-[15px]
    items-center
`

export function PerResult(props) {
    const { gotoArtistDetail } = useArtist()
    return (
        <PerResultWrapper>
            <ArtistLink {...props} redDotWidth={15} />
            <div>
                <ResultName onClick={() => gotoArtistDetail(props.id)}>
                    {props.nickName}
                </ResultName>
                <ResultDesc>
                    {subStr(props.description, 25)}
                </ResultDesc>
            </div>
        </PerResultWrapper>
    )
}


export default ArtistSearchResults
