import useArtwork from 'Components/entities/artwork/useArtwork'
import React from 'react'
import MobilePerTransaction from './MobilePerTransaction'
import PaginationNice from 'Components/ui/pagination/PaginationNice'
import NodataMessage from 'Components/ui/error/NodataMessage'
import useCommonTranslation from 'locale/useCommonTranslation'

function OwnershipResponsiveTable() {
  const { ownedArtworks, artPagination, changeArtPagination } = useArtwork()
  const { noActivityHistoryI18 } = useCommonTranslation()

  async function handlePagination(e, value) {
    await changeArtPagination(value)
  }

  return (
    <div className='mt-[45px] md:hidden'>
      <table>
        <tbody>
          {
            ownedArtworks?.result?.content?.length > 0 ? ownedArtworks?.result?.content?.map((artwork, idx) => (
              <>
                <MobilePerTransaction key={'art-progress1-' + idx} {...artwork} />
              </>
            )) : 
             <NodataMessage text={noActivityHistoryI18} />
          }
        </tbody>
      </table>
      <div className='flex w-full justify-center pt-[100px]'>
        <PaginationNice
          data={{ data: ownedArtworks?.result, page: artPagination?.page }}
          onChange={handlePagination}
        />
      </div>
    </div>
  )
}

export default OwnershipResponsiveTable