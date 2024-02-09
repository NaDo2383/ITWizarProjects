import FavoritedArtList from './FavoritedArtList'
import useArtwork from 'Components/entities/artwork/useArtwork'
import Loader from 'Components/ui/loader'
import React, { useEffect } from 'react'

function FavoritedPanel() {
  const { getFavoritedArtworks, setArtPagination, artworkLoading } = useArtwork()

  useEffect(() => {
    getFavoritedArtworks()
    return () => {
      setArtPagination((prev) => ({ ...prev, page: 1 }))
    }
  }, [])

  return (
    <>
      {
        artworkLoading.artworksByFavoritedLoading ? <Loader /> : <FavoritedArtList />
      }
    </>
  )
}

export default FavoritedPanel