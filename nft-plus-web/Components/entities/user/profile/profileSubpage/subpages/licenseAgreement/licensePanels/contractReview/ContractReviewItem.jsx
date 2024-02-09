import React from 'react'
import ContractView from './ContractView'
import { StampTamTam } from 'Components/ui/_moleculs/Stamps'
import DisplayStatusButton from './DisplayStatusButton'
import useArtworkTranslation from 'locale/useArtworkTranslation'

function ContractReviewItem(props) {
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
    } = props
    const { allRightsI18 } = useArtworkTranslation()
 
  return (
    <tr>
        <td>
        <div className='flex flex-row gap-2  xl:px-[6px] md:px-2 xl:w-full'>
            <div className='md:w-1/2'>
            <ContractView
                data={{
                artworkId,
                artworkFileType,
                artworkImageUrl,
                artwork3xThumbnail
                }} />
            </div>
            <div className='flex flex-col text-left justify-center md:w-1/2 xl:w-full'>
            <div className='text-[#B0B0B0] mb-1 sm:text-[18px] text-[14px] font-bold'>{artworkName}</div>
            <div className="flex flex-row gap-2">
                <div className='text-[#B0B0B0]'>{artworkOwnerName}</div>
                {tamtamApproved &&
                <div className="icon flex justify-center items-center mt-[6px]">
                    <StampTamTam src={'/star.png'} height={15} width={17} />
                </div>}
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
        <td className='text-[#B0B0B0] font-medium'>
        {rights &&
            rights[0] &&
            rights[0].code &&
            allRightsI18[rights[0].code]}
        {rights && rights.length > 1
            ? " 외 " + (rights.length - 1)
            : ""}
        </td>
        <td>
        <DisplayStatusButton { ...props } />
        </td>
    </tr>
  )
}

export default ContractReviewItem