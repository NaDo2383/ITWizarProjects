import useArtworkTranslation from 'locale/useArtworkTranslation'
import React from 'react'
import useArtDetail from '../../detail/useArtDetail'
import SellartTabLink from './SellartTabLink'
import usePopup from 'Components/ui/popup/usePopup'

function SellartTabHeader() {
  const {
    fixedPriceI18,
    sellingTextI18,
    auctionI18,
    bidText1I18
  } = useArtworkTranslation()
  const { artDetail } = useArtDetail()
  const isDisabled = artDetail?.isAuction
  const { handleShowModal, MODAL_TYPES } = usePopup()

  function handleAutionBtn() {
    handleShowModal(MODAL_TYPES.ARTWORK_AUCTION)
  }

  return (
    <div className='flex sm:gap-[15px] gap-[14px] justify-center w-full'>
      <SellartTabLink linkId={0} text={fixedPriceI18} subText={sellingTextI18} disabled={isDisabled} />
      {process.env.mode !== 'production' ? (
        <SellartTabLink linkId={1} text={auctionI18} subText={bidText1I18} />
      ) : (
        <button onClick={handleAutionBtn} className='bg-[#282828] border-[#282828] cursor-not-allowed w-1/2 py-[38px] rounded-[20px]'>
          <div className="flex justify-center items-center mb-[10px]">
            <h3 className={`text-white lg:text-[24px] sm:text-[18px] text-[14px] sm:tracking-[-1px] sm:leading-[30px] md:leading-[40px] font-[700]`}>
              {auctionI18}
            </h3>
          </div>
          <p className={`text-[#fff] lg:text-[18px] sm:text-[16px] text-[13px] sm:tracking-[-1px] sm:leading-[20px] md:leading-[22px] font-[400]`}>
            {bidText1I18}
          </p>
        </button>
      )
      }
    </div >
  )
}

export default SellartTabHeader