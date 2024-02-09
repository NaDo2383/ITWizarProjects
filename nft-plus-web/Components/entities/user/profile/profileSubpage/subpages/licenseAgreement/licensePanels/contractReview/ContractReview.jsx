import React, { useEffect, useState } from 'react'
import useLicense from 'Components/entities/license/useLicense'
import useMyPageTranslation from 'locale/useMypageTranslation'
import ResponsiveContractReview from './ResponsiveContractReview';
import Pagination from 'Components/ui/pagination/Pagination'
import ContractReviewItem from './ContractReviewItem'
import NodataMessage from 'Components/ui/error/NodataMessage';
import useCommonTranslation from 'locale/useCommonTranslation';
import { useGlobalContext } from 'common/global/useGlobalContext';

function ContractReview() {
  const { noLicenseI18 } = useCommonTranslation()
  const {
    worknameI18,
    copyrightHolderI18,
    applicantI18,
    subject_rightI18,
    situationI18
  } = useMyPageTranslation()
  const { authUser, globalLoading } = useGlobalContext();

  const {
    getLicenseRequests,
    licenseRequests,
    licensePagination,
    setLicensePagination
  } = useLicense()

  const [pageNum, setPageNum] = useState(0);
  const paginate = (num) => {
    setPageNum(num);
  };

  useEffect(() => {
    getLicenseRequests(pageNum)
  }, [pageNum, authUser?.id])

  useEffect(() => {
    return () => {
      setLicensePagination((prev) => ({ ...prev, page: 1 }))
    }
  }, [])

  return (
    <div className='rounded-[10px] overflow-hidden'>
      <>
        <table role='table for holding artworks profile page' className='hidden sm:block'>
          <colgroup style={{width: '100%'}}>
            <col width="12%" />
            <col width="8%" />
            <col width="8%" />
            <col width="10%" />
            <col width="12%" />
          </colgroup>
          <thead>
            <tr>
              <td className='px-10'>{worknameI18}</td>
              <td className='px-10'>{copyrightHolderI18}</td>
              <td className='px-10'>{applicantI18}</td>
              <td className='px-10'>{subject_rightI18}</td>
              <td className='px-10'>{situationI18}</td>
            </tr>
          </thead>
          {
            licenseRequests?.result?.content?.length > 0 ? (
              <tbody>
                {
                  licenseRequests?.result?.content.map((license, idx) => {
                    return (
                      <ContractReviewItem key={'review-' + idx} {...license} />
                    )
                  })
                }
              </tbody>
            ) : (globalLoading === false &&
              <tbody className='justify-center flex w-full'>
                <NodataMessage text={noLicenseI18} />
              </tbody>
            )}
        </table>
        <ResponsiveContractReview />
        <div className='flex w-full justify-center pt-[100px]'>
          <Pagination
            data={licenseRequests?.result?.content}
            current={licenseRequests?.result?.number}
            toLastPage={paginate}
            toFirstPage={paginate}
            toPrevPage={paginate}
            toNextPage={paginate}
            changePage={paginate}
            totalPages={licenseRequests?.result?.totalPages}
          />
        </div>
      </>
    </div>
  )
}

export default ContractReview