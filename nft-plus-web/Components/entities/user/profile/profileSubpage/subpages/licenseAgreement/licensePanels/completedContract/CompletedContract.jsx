import React, { useEffect, useState } from 'react'
import useMyPageTranslation from 'locale/useMypageTranslation'
import useLicense from 'Components/entities/license/useLicense'
import ResponsiveCompletedContract from './ResponsiveCompletedContract'
import usePopup from "Components/ui/popup/usePopup";
import useArtworkTranslation from 'locale/useArtworkTranslation'
import ContractView from '../contractReview/ContractView'
import { StampTamTam } from 'Components/ui/_moleculs/Stamps'
import Pagination from 'Components/ui/pagination/Pagination'
import NodataMessage from 'Components/ui/error/NodataMessage'
import useCommonTranslation from 'locale/useCommonTranslation'
import { useGlobalContext } from 'common/global/useGlobalContext';

function CompletedContract() {
  const { handleShowModal, MODAL_TYPES } = usePopup();
  const { allRightsI18 } = useArtworkTranslation();
  const { noCompletedContractI18 } = useCommonTranslation()
  const { authUser } = useGlobalContext();
  const {
    worknameI18,
    copyrightHolderI18,
    applicantI18,
    subject_rightI18,
    situationI18,
    view_contractI18
  } = useMyPageTranslation()

  const {
    getPaidLicenses,
    paidLicenses,
  } = useLicense()

  const [pageNum, setPageNum] = useState(0);
  const paginate = (num) => {
    setPageNum(num);
  };

  function showLicenseViewContractPopup(license) {
    handleShowModal(MODAL_TYPES.LICENSE_VIEWCONTRACT, { license: license })
  }

  useEffect(() => {
    getPaidLicenses(pageNum)
  }, [pageNum, authUser?.id])

  // useEffect(() => {
  //   return () => setLicensePagination((prev) => ({ ...prev, page: 1 }))
  // }, [])

  return (
    <div>
      {
        paidLicenses?.result?.content?.length > 0 ?
          <>
            <table role='table for holding artworks profile page'
              className='hidden md:block'>
              <colgroup>
                <col width="10%" />
                <col width="7%" />
                <col width="7%" />
                <col width="9%" />
                <col width="12%" />
              </colgroup>
              <thead>
                <tr>
                  <td>{worknameI18}</td>
                  <td>{copyrightHolderI18}</td>
                  <td>{applicantI18}</td>
                  <td>{subject_rightI18}</td>
                  <td>{situationI18}</td>
                </tr>
              </thead>
              <tbody>
                {
                  paidLicenses?.result?.content.map((license, idx) => {
                    const {
                      artworkName,
                      artworkOwnerName,
                      buyerName,
                      rights,
                      artworkFileType,
                      artworkImageUrl,
                      artwork3xThumbnail,
                      tamtamApproved,
                      artworkId
                    } = license
                    return (
                      <tr className='h-[57px] font-[300] text-[#DDDDDD]' key={'completed-contract-' + idx}>
                        <td>
                          <div className='flex flex-row gap-4 sm:px-6 px-[5px]'>
                            <div className='min-w-[78px] min-h-[70px]'>
                              <ContractView
                                data={{
                                  artworkId,
                                  artworkFileType,
                                  artworkImageUrl,
                                  artwork3xThumbnail,
                                }} />
                            </div>
                            <div className='flex flex-col text-left justify-center'>
                              <div className='text-[#B0B0B0] mb-1 text-[18px] font-bold'>{artworkName}</div>
                              <div className='flex flex-row gap-1'>
                                <div className='text-[#B0B0B0]'>{artworkOwnerName}</div>
                                <div className='mt-[2px]'>
                                  {tamtamApproved && <StampTamTam src={'/star.png'} height={15} width={17} />}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='text-[#D5D5D5] underline'>
                          {artworkOwnerName}
                        </td>
                        <td className='text-[#D5D5D5] underline'>
                          {buyerName}
                        </td>
                        <td>
                          {rights &&
                            rights[0] &&
                            rights[0].code &&
                            allRightsI18[rights[0].code]}
                          {rights && rights.length > 1
                            ? " 외 " + (rights.length - 1)
                            : ""}
                        </td>
                        <td>
                          <div className='flex justify-center items-center'>
                            <button
                              onClick={() => showLicenseViewContractPopup(license)}
                              className="lg:min-w-[228px] min-w-[228px] xs:min-w-[68px] border xs:text-[10px] text-[18px] lg:text-[18px] font-[500] xs:tracking-[-0.15px] tracking-normal rounded-[4px] border-[#FB3873] bg-[#FB3873] py-[3px] xs:py-[5px] xs:px-[9px] px-[24px]"
                            >
                              {view_contractI18}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <ResponsiveCompletedContract />
            <div className='flex w-full justify-center pt-[100px]'>
              <Pagination
                data={paidLicenses?.result?.content}
                current={paidLicenses?.result?.number}
                toLastPage={paginate}
                toFirstPage={paginate}
                toPrevPage={paginate}
                toNextPage={paginate}
                totalPages={paidLicenses?.result?.totalPages}
                changePage={paginate}
              />
            </div>
          </> : <NodataMessage text={noCompletedContractI18} />
      }
    </div>
  )
}

export default CompletedContract