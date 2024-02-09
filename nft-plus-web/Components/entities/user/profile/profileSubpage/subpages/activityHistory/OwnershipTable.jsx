import useArtwork from 'Components/entities/artwork/useArtwork'
import PerTransaction from './PerTransaction'
import useMyPageTranslation from 'locale/useMypageTranslation'
import Pagination from 'Components/ui/pagination/Pagination'
import { useState, useEffect } from 'react'
import OwnershipResponsiveTable from './OwnershipResponsiveTable'
import NodataMessage from 'Components/ui/error/NodataMessage'
import useCommonTranslation from 'locale/useCommonTranslation'
import { useGlobalContext } from 'common/global/useGlobalContext'

function OwnershipTable() {
  const { noLicenseI18 } = useCommonTranslation()
  const {
    activityI18,
    workI18,
    priceI18,
    activityHistoryI18
  } = useMyPageTranslation()
  const {
    ownedArtworks,
    getOwnedArtworks
  } = useArtwork()
  const [pageNum, setPageNum] = useState(0);
  const { authUser, globalLoading } = useGlobalContext();

  const paginate = (num) => {
    setPageNum(num);
  };

  useEffect(() => {
    getOwnedArtworks(pageNum);
  }, [pageNum, authUser?.id]);

  return (
    <>
      <h2 className='text-[15px] font-[500] text-[#DDD] sm:hidden text-center mt-[-10px]'>{activityHistoryI18}</h2>
      <div className='hidden md:flex md:flex-col sm:pt-0 pt-6 h-full rounded-[10px] overflow-hidden'>
        <>
          <table role='table for holding artworks profile page' className='hidden sm:block'>
            <colgroup>
              <col width='9%' />
              <col width='16%' />
              <col width='7%' />
              <col width='8%' />
              <col width='8%' />
              <col width='12%' />
            </colgroup>
            <thead>
              <tr>
                <td className='px-10'>{activityI18}</td>
                <td className='px-10'>{workI18}</td>
                <td className='px-10'>{priceI18}</td>
                <td className='px-10'>From</td>
                <td className='px-10'>To</td>
                <td className='px-10'>DATE</td>
              </tr>
            </thead>
            {
              ownedArtworks?.result?.content?.length > 0 ? (
                <tbody>
                  {
                    ownedArtworks?.result?.content.map((artwork, idx) => (
                      <PerTransaction key={'art-progress2-' + idx} {...artwork} />
                    ))
                  }
                </tbody>
              ) : (globalLoading === false && 
                <tbody className='justify-center flex w-full items-center md:-mt-14'>
                  <NodataMessage text={noLicenseI18} />
                </tbody>
              )}
          </table>
          <OwnershipResponsiveTable />
          <div className='flex w-full justify-center pt-[100px]'>
            <Pagination
              toLastPage={paginate}
              toFirstPage={paginate}
              toPrevPage={paginate}
              toNextPage={paginate}
              totalPages={ownedArtworks?.result?.totalPages}
              data={ownedArtworks?.result?.content}
              current={ownedArtworks?.result?.number}
              changePage={paginate}
            />
          </div>
        </>
      </div>
    </>
  )
}

export default OwnershipTable