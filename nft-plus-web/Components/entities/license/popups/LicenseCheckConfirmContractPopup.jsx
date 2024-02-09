/**
 * @createdBy duka 
 */
import React, { useState } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer';
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent';
import usePopup from 'Components/ui/popup/usePopup'
import useMyPageTranslation from 'locale/useMypageTranslation'
import { LicenseRow } from './licensePopupUi/LicenseRow';
import InputDark from 'Components/ui/input/InputDark';
import LicenseBigTitle from './licensePopupUi/LicenseBigTitle';
import { useGlobalContext } from 'common/global/useGlobalContext';
import ArtworkFileViewer from 'Components/entities/artwork/ArtworkFileViewer';
import P from 'Components/ui/typography/P';
import useArtworkTranslation from 'locale/useArtworkTranslation';
import useAlertTranslation from 'locale/useAlertTranslation';

function LicenseCheckConfirmContractPopup() {
    const {
        description_2_beginI18,
        description_2_lastI18,
        licenseTitleI18,
        description_1I18,
        copyrightHolderI18,
        contactI18,
        nextI18,
        addressI18,
    } = useMyPageTranslation();
    const { noticeI18, cancel } = useArtworkTranslation()
    const { enterContactInfoI18, enterAddressI18 } = useAlertTranslation();
    const { hideAllModals } = usePopup()
    const [wrongAddress, setWrongAddress] = useState(false);
    const [enteredAddress, setEnteredAddress] = useState("");
    const [enteredContact, setEnteredContact] = useState("");
    const [wrongContact, setWrongContact] = useState(false);
    const { authUser } = useGlobalContext()
    const {
        handleShowModal,
        MODAL_TYPES,
        setGlobalModalState,
        globalModalState
    } = usePopup();
    const pendingLicense = globalModalState.license
    const license = globalModalState.license

    const checkInfo = async () => {
        if (enteredAddress == "" || enteredContact == "") {
            setWrongAddress(true);
            setWrongContact(true);
        } else {
            setWrongAddress(false);
            setWrongContact(false);
            showCheckContractPopup()
        }
    }

    function showCheckContractPopup() {
        setGlobalModalState(prev => ({
            ...prev,
            checkConfirmProps: {
                id: license?.id,
                enteredAddress,
                enteredContact,
                walletId: license?.walletId,
                ownerName: license?.ownerName
            }
        }))
        handleShowModal(MODAL_TYPES.LICENSE_CHECK_CONTRACT)
    }

    function handleContact(value, inputName) {
        setEnteredContact(value);
    }

    function handleAddress(value, inputName) {
        setEnteredAddress(value)
    }

    return (
        <MainPopup width={530}>
            <PopupContainer>
                <h3 className='sm:text-[22px] text-[20px] text-[#E0E6E8] font-[500] sm:text-left text-center mt-[15px]'>
                    {licenseTitleI18}
                </h3>
                <PopupContent>
                    <div className='mb-[40px]'>
                        <p className='pt-[8px] sm:text-[#B0B0B0] text-[#AEAEAE] sm:pb-[28px] mb-[5px] sm:text-[16px] text-[12px] sm:text-left text-center'>{description_1I18}</p>
                        <div className='sm:hidden my-[20px] bg-[#141313] rounded-[10px] p-[15px]'>
                            <ArtworkFileViewer artwork={pendingLicense} square />
                            <div className='flex flex-col text-center justify-center mb-[5px] mt-[10px]'>
                                <P>{pendingLicense?.artworkName}</P>
                                <p className='text-[#B0B0B0] text-[14px]'>
                                    {pendingLicense?.artworkOwnerFullname}
                                </p>
                            </div>
                        </div>
                        <div className='sm:hidden'>
                            <LicenseBigTitle text={"저작권자 정보"} />
                        </div>
                        <div className='hidden sm:flex sm:flex-col overflow-hidden'>
                            <LicenseRow>
                                <h2 className='w-[30%] text-[#B0B0B0]'>{copyrightHolderI18}</h2>
                                <p className='w-[70%]'>{authUser.nickName}</p>
                            </LicenseRow>
                            <LicenseRow>
                                <div className='flex items-center w-full'>
                                    <h2 className='w-[30%] text-[#B0B0B0]'>{contactI18}</h2>
                                    <div className='w-[70%]'>
                                        <InputDark
                                            type='number'
                                            name='enteredContact'
                                            value={enteredContact}
                                            onChange={(e) => handleContact(e)}
                                            borderColor={wrongContact && '#FB3873'}
                                            placeholder={enterContactInfoI18}
                                        />
                                    </div>
                                </div>
                            </LicenseRow>
                            <LicenseRow>
                                <div className='flex items-center w-full'>
                                    <h2 className='w-[30%] text-[#B0B0B0]'>{addressI18}</h2>
                                    <div className='w-[70%]'>
                                        <InputDark
                                            name='enteredAddress'
                                            value={enteredAddress}
                                            onChange={handleAddress}
                                            borderColor={wrongAddress && '#FB3873'}
                                            placeholder={'주소를 입력해주세요'}
                                        />
                                    </div>
                                </div>
                            </LicenseRow>
                        </div>
                        <div className='sm:hidden'>
                            <div className='flex flex-col mb-[29px] gap-[21px] border-b border-[#2E2E2E] pb-[20px]'>
                                <h2 className='text-[#DDD] text-[14px] font-[500]'>{copyrightHolderI18}</h2>
                                <p className='w-full text-[13px] text-white font-[400]'>{authUser.nickName}</p>
                            </div>
                            <div className='flex flex-col mb-[29px] gap-[10px]'>
                                <h2 className='text-[#DDD] text-[14px] font-[500]'>{contactI18}</h2>
                                <div className='w-full'>
                                    <InputDark
                                        type='number'
                                        name='enteredContact'
                                        value={enteredContact}
                                        onChange={(e) => handleContact(e)}
                                        borderColor={wrongContact && '#FB3873'}
                                        placeholder={enterContactInfoI18}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col mb-[29px] gap-[10px]'>
                                <h2 className='text-[#DDD] text-[14px] font-[500]'>{addressI18}</h2>
                                <div className='w-full'>
                                    <InputDark
                                        name='enteredAddress'
                                        value={enteredAddress}
                                        onChange={handleAddress}
                                        borderColor={wrongAddress && '#FB3873'}
                                        placeholder={enterAddressI18}
                                    />
                                </div>
                            </div>
                        </div>
                        <h2 className='mt-[14px] mb-[5px] sm:text-[#B0B0B0] text-[#DDD] font-[500] sm:text-[16px] text-[14px]'>{noticeI18}</h2>
                        <div className='py-[19px] bg-[#2F2E39]'>
                            <div className='text-center'>
                                <p className='sm:text-[14px] text-[13px] sm:text-[#B0B0B0] text-[#DDD]'> {description_2_beginI18}</p>
                                <p className='sm:text-[14px] text-[13px] sm:text-[#B0B0B0] text-[#DDD]'>{description_2_lastI18}.</p>
                            </div>
                        </div>
                    </div>
                </PopupContent>
                <div className="w-full flex flex-row sm:justify-end md:justify-end justify-center font-[300] gap-[10px] right-[30px]">
                    <button
                        className="min-w-[74px] bg-[#333] text-white py-[6px] text-center rounded-[5px] cursor-pointer"
                        onClick={() => hideAllModals()}
                    >
                        <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{cancel}</h3>
                    </button>
                    <button
                        className={`min-w-[74px] bg-[#6319FF]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                        onClick={() => checkInfo()}
                        type='button'
                    >
                        <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500] px-[20px]">{nextI18}</h3>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default LicenseCheckConfirmContractPopup;