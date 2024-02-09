import useAuthUser from 'Components/entities/user/auth/useAuthUser'
import MainPopup from 'Components/ui/popup/MainPopup'
import { useGlobalModalContext } from 'Components/ui/popup/useModalcontext'
import React from 'react'
import useMypageTranslation from "locale/useMypageTranslation";
import usePopup from 'Components/ui/popup/usePopup';
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import PopupHeader from 'Components/ui/popup/popupMaterials/PopupHeader';
import { ColorfullBtn } from 'Components/ui/button/colorfullBtn';
import ListImgWithInfo from './licensePopupUi/LicenseImgWithInfo';
import CurrencyIcon from 'Components/ui/_atoms/CurrencyIcon';
import Won from 'Components/ui/_atoms/Won';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import { LicenseFirstCol } from './licensePopupUi/LicenseCol';
import P from 'Components/ui/typography/P';
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';

function LicensePaymentCompletedPopup() {
  const {
    licenseCompletedDescI18,
    confirmI18,
    paymentCompletedI18,
    paymentOfAmountI18
  } = useMypageTranslation();
  const { globalModalState } = useGlobalModalContext()
  const pendingLicense = globalModalState?.license
  const { authUser } = useAuthUser()
  const { hideAllModals } = usePopup()

  return (
    <MainPopup maxWidth={530}>
      <PopupContainer>
        <div className="hidden sm:flex sm:flex-col overflow-hidden justify-between">
          <PopupHeader text={`🎉${paymentCompletedI18}`} />
        </div>
        <div className="sm:hidden mt-[40px]">
          <div className="flex flex-col justify-center items-center">
            <span className="text-[20px]">🎉</span>
            <h3 className="text-center text-[20px] text-[#E0E6E8]">{paymentCompletedI18}</h3>
          </div>
        </div>
        <p className="hidden sm:flex sm:flex-col overflow-hidden py-[30px] text-[18px] text-[#DDD]">
          {licenseCompletedDescI18}
        </p>
        <PopupContent>
          <div className='hidden sm:flex sm:flex-col overflow-hidden'>
            <ListImgWithInfo
              img={pendingLicense?.artworkImageUrl}
              artworkName={pendingLicense?.artworkName}
              humanName={authUser?.nickName}
            />
          </div>
          <div className="sm:hidden bg-[#141313] rounded-[10px] p-[15px] gap-[10px] mb-[50px]">
            <LicenseFirstCol>
              <ArtworkFileViewer artwork={pendingLicense} square />
              <div className='flex flex-col text-center justify-center mb-[5px] '>
                <P>{pendingLicense?.artworkName}</P>
                <p className='text-[#B0B0B0] text-[14px]'>
                  {pendingLicense?.artworkOwnerFullname}
                </p>
              </div>
            </LicenseFirstCol>
          </div>
          <LicenseBigTitle text={paymentOfAmountI18} />
          <div className='flex w-full justify-center sm:py-[15px] py-[20px] bg-[#0F1111]'>
            <div className='flex flex-col items-center gap-2'>
              <div className='flex flex-row gap-1'>
                <CurrencyIcon currency={pendingLicense?.artworkCurrency} />
                <p className='sm:text-[18px] text-[14px]'>{pendingLicense?.paymentAmount}</p>
                <p className='sm:text-[18px] text-[14px]'>{pendingLicense?.artworkCurrency === 'MATIC' ? 'MATIC' : 'EYES'}</p>
              </div>
              <Won
                value={+pendingLicense?.paymentAmount}
                currency={pendingLicense?.artworkCurrency}
              />
            </div>
          </div>
          <div className="flex sm:justify-end justify-center sm:mt-[23px] sm:pt-[49px] pt-[60px]">
            <div className="w-[107px]">
              <ColorfullBtn text={confirmI18} onClick={() => hideAllModals()} />
            </div>
          </div>
        </PopupContent>
      </PopupContainer>
    </MainPopup>
  )
}

export default LicensePaymentCompletedPopup