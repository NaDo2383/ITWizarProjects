/**
 * @createdBy Duka 2022/04
 */
import React, { useEffect } from 'react'
import useLicense from 'Components/entities/license/useLicense'
import DisplayStatusButton from './DisplayStatusButton'
import useArtworkTranslation from 'locale/useArtworkTranslation'
import ContractView from './ContractView';
import { StampTamTam } from 'Components/ui/_moleculs/Stamps';

function ResponsiveContractReview() {
  const { allRightsI18 } = useArtworkTranslation();
  const {
    getLicenseRequests,
    licenseRequests,
    licensePagination,
    setLicensePagination
  } = useLicense()

  // useEffect(() => {
  //   getLicenseRequests()
  // }, [licensePagination])

  // useEffect(() => {
  //   return () => {
  //     setLicensePagination((prev) => ({ ...prev, page: 1 }))
  //   }
  // }, []) 

  return (
    <div className='md:hidden border-t-0 lg:flex px-[16px] md:px-20 gap-14'>
      <table role='table for holding artworks profile page'
        className='md:hidden'>
        <tbody>
          {
            licenseRequests?.result?.content.map((license, idx) => {
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
                <tr>
                  <td>
                    <div className='flex flex-col sm:hidden mb-[15px]'>
                      <div className='flex justify-between bg-[#252525] rounded-t-[8px] p-[10px]'>
                        <div className='text-[13px] text-[#DDD] font-[500]'>
                          {rights &&
                            rights[0] &&
                            rights[0].code &&
                            allRightsI18[rights[0].code]}
                          {rights && rights.length > 1
                            ? " 외 " + (rights.length - 1)
                            : ""}
                        </div>
                        <span className='text-[#8E8E8E] text-[10px] font-[350]'>공중송신권 외 1</span>
                      </div>
                      <div className='flex justify-between p-[10px]'>
                        <div className='flex gap-2'>
                          <div className='min-w-[50px]'>
                            <ContractView
                              data={{
                                artworkId,
                                artworkFileType,
                                artworkImageUrl,
                                artwork3xThumbnail,
                              }} />
                          </div>
                          <div className='min-w-[140px] sm:mr-[20px] mr-[10px] flex flex-col justify-center'>
                            <h5 className='text-[12px] text-[#B0B0B0] font-bold'>{artworkName}</h5>
                            <div className='flex flex-row'>
                              <div className='text-[12px] text-[#B0B0B0] font-[500]'>{artworkOwnerName}</div>
                              {tamtamApproved &&
                                <div className="icon flex justify-center items-center">
                                  <StampTamTam src={'/star.png'} height={12} width={14} />
                                </div>}
                            </div>
                          </div>
                        </div>
                        <div className='flex'>
                          <DisplayStatusButton {...license} />
                        </div>
                      </div>
                      <div>
                        <table className="border-collapse">
                          <thead className="w-full bg-[#161717]">
                            <tr className="font-light text-[12px] border-y border-[#262626]">
                              <th className="text-[#888] py-[9px] border-r border-[#262626] px-[10px]">From</th>
                              <th className="text-[#DDD] underline py-[9px] border-r border-[#262626]">{artworkOwnerName}</th>
                              <th className="text-[#888] py-[9px] border-r border-[#262626] px-[10px]">To</th>
                              <th className="text-[#DDD] underline py-[9px] border-[#262626]">{buyerName}</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                </td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ResponsiveContractReview