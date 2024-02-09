import React, { useEffect } from 'react'
import ArtistList from './ArtistList'
import MobileArtistList from './mobile/MobileArtistList'
import useArtist from '../useArtist'
import { useGlobalContext } from 'common/global/useGlobalContext'
import { useRouter } from 'next/router'

function ArtistListIndex() {
    const { locale } = useRouter()
    const { browserWindow, setGlobalItems } = useGlobalContext()
    const { getArtistBanners, getArtists } = useArtist()

    useEffect(() => {
        getArtistBanners()
        getArtists().then(artists => {
            setGlobalItems(prev => ({
                ...prev,
                artistList:artists,
                artistOriginalList:artists,
            }))
        })
    }, [locale])

    return (
        <>
            {browserWindow.innerWidth > 600 ? (
                <ArtistList />
            ) : (
                <MobileArtistList />
            )}
        </>
    )
}

export default ArtistListIndex
