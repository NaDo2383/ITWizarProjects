import React from 'react'
import useArtDetail from '../useArtDetail'
import useArtworkTranslation from 'locale/useArtworkTranslation'

function DetailPanel1() {
  const { artDetail, calcRightList } = useArtDetail()
  const { unableToApllyI18 } = useArtworkTranslation()
  
  return (
    <>
      {
        artDetail?.rights.length > 0 ? (
								calcRightList()
							) : (
								<p className="mt-4 text-lg text-gray-600">{unableToApllyI18}</p>
			)}
    </>
  )
}

export default DetailPanel1