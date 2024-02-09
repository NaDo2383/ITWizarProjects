import React, { useState, useEffect } from "react";
import Checkbox from "Components/ui/checkbox/Checkbox";
import useArtworkTranslation from "locale/useArtworkTranslation";
import usePopup from "Components/ui/popup/usePopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import { useRouter } from "next/router";
import useWallet from "common/metamask/useWallet";
import useCommonTranslation from "locale/useCommonTranslation";
import Image from "next/image";
import MainPopup from "Components/ui/popup/MainPopup";
import { useGlobalContext } from "common/global/useGlobalContext";
import useArtwork from "Components/entities/artwork/useArtwork";
import headIco from "public/headIcon.svg";

function CompetitionConfirmPopup() {
  const {
    TamtamNFTI18,
    title1I18,
    title2I18,
    title3I18,
    checkboxTitleI18,
    description1I18,
    description2I18,
    description3I18,
    t2description1I18,
    t2description2I18,
    t2description3I18,
    t2description4I18,
    t3description1I18,
    t3description2I18,
    t3description3I18,
    t3description4I18,
    t3description5I18,
    t3description6I18,
    t3description7I18,
    t3description8I18,
    t3description9I18,
    t3description10I18,
    t3description11I18,
    compitationConfirmI18,
    cancel,
  } = useArtworkTranslation()
  const { push } = useRouter()
  const { checkAllTermsI18 } = useCommonTranslation()
  const { activeWallets } = useGlobalContext()
  const { saveArtwork } = useArtwork()
  const {
    handleShowModal,
    MODAL_TYPES,
    getCurrentModalprops,
    popupProps,
    hideModal
  } = usePopup()
  const { walletIsMatch } = useWallet()
  const [checkbox1, setCheckbox1] = useState(false)
  const [checkbox2, setCheckbox2] = useState(false)
  const [checkbox3, setCheckbox3] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)

  async function handleSubmit() {
    const {
      areYouCreator,
      artworkDescription,
      category,
      copyrightFile,
      creatorDescription,
      currency,
      file,
      loyaltyPercent,
      licenseList,
      rightList,
      title,
      competitionId
    } = popupProps
    const checkedRightList = rightList.filter((right) => right.isChecked === true)
    // console.log('licenseList', licenseList)
    const newCheckedRightList = checkedRightList.map(item => ({ 
        id: item.id,
        code: item.code, 
        forSell: false 
    }))
    
    
    const realLicenseList = licenseList.map(item => ({
      documentFile: item.documentFile,
      startDate: item.startDate,
      endDate: item.endDate,
      contractDate: item.createdDate,
      right: newCheckedRightList.filter(
				(checkedItem) => checkedItem.code === item.licenseName
			)
    }))
    
    const formData = {
      name: title,
      description: artworkDescription,
      artistDescription: creatorDescription,
      category,
      rights: newCheckedRightList,
      royalty: loyaltyPercent,
      image: file,
      coverImage: popupProps?.coverImage,
      coverImage2: popupProps?.coverImage2,
      contractDocuments: realLicenseList,
      ownsArt: areYouCreator,
      currency,
      copyrightRegistered: copyrightFile ? true : false,
      copyrightFile,
      price: '0',
    }
    const form = new FormData()
    form.append('name', formData.name)
    form.append('description', formData.description)
    form.append('artistDescription', formData.artistDescription)
    form.append('categoryId', formData.category)
    form.append('royalty', formData.royalty)
    form.append('image', formData.image)
    formData.coverImage && form.append("coverImage", formData.coverImage);// coverimage
    formData.coverImage2 && form.append("coverImage2", formData.coverImage2);//video || audio
    // console.log('formdata', formData)
    for (let i = 0; i < formData.rights.length; i++) {
      const currentDoc = formData.rights[i]
      for (let property in currentDoc) {
        const dataName = `rights[${i}].${property}`
        const dataValue = currentDoc[property]
        form.append(dataName, dataValue)
      }
    }
   
    for (let i = 0; i < formData.contractDocuments.length; i++) {
        const currentDoc = formData.contractDocuments[i]
      if(currentDoc.documentFile) {
        for (let property in currentDoc) {
          const dataName = `contractDocuments[${i}].${property}`
          const dataValue = currentDoc[property]

          if (property === 'right') {
            for (let g = 0; g < currentDoc.right.length; g++) {
              const currentDocRight = currentDoc.right[g]
              for (let detail in currentDocRight) {
                const rightData = `contractDocuments[${i}].right.${detail}`
                const rightValue = currentDocRight[detail]
                form.append(rightData, rightValue)
              }
            }
          }
          if (property === 'documentFile') {
            if (currentDoc[property]) {
              const docFilename = `contractDocuments[${i}].documentFile`
              const docFileVal = currentDoc.documentFile
              form.append(docFilename, docFileVal)
            } else {
            }
          }

          if (property !== 'right' && property !== 'documentFile') {
            form.append(dataName, dataValue)
          }
        }
      }    
    }
    form.append('ownsArt', formData.ownsArt)
    form.append('currency', formData.currency)
    form.append('copyrightRegistered', formData.copyrightRegistered)

    if (formData.copyrightFile) {
      form.append('copyrightFile', formData.copyrightFile)
    }
    form.append('price', formData.price)
    form.delete('right')
    if (competitionId) {
      form.append('competitionId', +competitionId)
    }

    saveArtwork(form)
      .then(res => {
        if (!res?.success) {
          alert(res?.reason.msg)
          if (res?.reason.code === 400) {
            return
          }
          if (res?.reason.code === 401) {
            handleShowModal(MODAL_TYPES.LOGIN_POPUP);
            return
          }
          return
        }
        handleShowModal(MODAL_TYPES.COMPETITION_COMPLETE)
      })
  }

  async function confirmCompetition() {
    const { isMatchWallet, currentMetaWallet } = await walletIsMatch()

    if (currentMetaWallet !== "notFound" || currentMetaWallet !== "processing") {
      if (!isMatchWallet) {
        handleShowModal(MODAL_TYPES.METAMASK_LOGIN);
        return
      } else {
        handleSubmit()
      }
    }
  }

  function handleConfirm() {
    isConfirm ? confirmCompetition() : alert(checkAllTermsI18);
  }

  useEffect(() => {
    getCurrentModalprops()
  }, [])

  useEffect(() => {
    setIsConfirm(checkbox1 && checkbox2 && checkbox3);
  }, [checkbox1, checkbox2, checkbox3]);

  return (
    <MainPopup>
      <PopupContainer>
        <PopupHeader text={TamtamNFTI18} />
        <PopupContent>
          <div className="w-full items-center">
            <div className="pt-[12px]">
              <div className="flex flex-row gap-2">
                <Image src={headIco} alt="headIco" />
                <h4 className="font-[400] text-white text-[18px] my-2">
                  {title1I18}
                </h4>
              </div>
              <ul className="flex flex-col bg-[#2F3132] max-w-[550px] pt-[20px] pb-[25px] px-[20px] font-[400] tracking-normal text-[14px] text-[#DDD] overflow-y-scroll sm:overflow-y-auto max-h-[136px]">
                <li>{description1I18}</li>
                <li>{description2I18}</li>
                <li>{description3I18}</li>
              </ul>
              <label htmlFor="checkbox17" className="flex pointer items-center justify-center mt-3">
                <Checkbox
                  id={`checkbox17`}
                  checked={checkbox1}
                  onChange={(e) => setCheckbox1(e.target.checked)}
                />
                <p   onChange={(e) => setCheckbox2(e.target.checked)} className="text-[16px] ml-2 truncate text-[#DDD] font-[400]">{checkboxTitleI18}</p>
              </label>
            </div>
            <div className="pt-[34px]">
              <div className="flex flex-row gap-2">
                <Image src={headIco} alt="headIco" />
                <h4 className="font-[400] text-white text-[18px] my-2">{title2I18}</h4>
              </div>
              <ul className="flex flex-col bg-[#2F3132] max-w-[550px] pt-[20px] pb-[25px] px-[20px] font-[400] tracking-normal text-[14px] text-[#DDD] overflow-y-scroll sm:overflow-y-auto max-h-[136px]">
                <li>{t2description1I18}</li>
                <li>{t2description2I18}</li>
                <li>{t2description3I18}</li>
                <li>{t2description4I18}</li>
              </ul>
              <label htmlFor="checkbox18" className="flex pointer items-center justify-center mt-3">
                <Checkbox
                  id={`checkbox18`}
                  checked={checkbox2}
                  onChange={(e) => setCheckbox2(e.target.checked)}
                />
                <p   onChange={(e) => setCheckbox2(e.target.checked)} className="text-[16px] ml-2 truncate text-[#DDD] font-[400]">{checkboxTitleI18}</p>
              </label>
            </div>
            <div className="pt-[34px]">
              <div className="flex flex-row gap-2">
                <Image src={headIco} alt="headIco" />
                <h4 className="font-[400] text-white text-[18px] my-2">{title3I18}</h4>
              </div>
              <ul className="flex flex-col bg-[#2F3132] max-w-[550px] pt-[20px] pb-[25px] px-[20px] font-[400] tracking-normal text-[14px] text-[#DDD] overflow-y-scroll sm:overflow-y-auto max-h-[136px]">
                <li>{t3description1I18}</li>
                <li>{t3description2I18}</li>
                <li>{t3description3I18}</li>
                <li>{t3description4I18}</li>
                <li>{t3description5I18}</li>
                <li>{t3description6I18}</li>
                <li>{t3description7I18}</li>
                <li>{t3description8I18}</li>
                <li>{t3description9I18}</li>
                <li>{t3description10I18}</li>
                <li>{t3description11I18}</li>
              </ul>
              <label htmlFor="checkbox19" className="flex pointer items-center justify-center mt-3">
                <Checkbox
                  id={`checkbox19`}
                  checked={checkbox3}
                  onChange={(e) => setCheckbox3(e.target.checked)}
                />
                <p  onChange={(e) => setCheckbox3(e.target.checked)} className="text-[16px] ml-2 truncate text-[#DDD] font-[400]">{checkboxTitleI18}</p>
              </label>
            </div>
          </div>
        </PopupContent>
        <div className="mt-[40px]">
        <PopupActionButtons
          yes={() => handleConfirm()}
          no={() => hideModal()}
          btnTexts={{ yes: compitationConfirmI18, no: cancel }}
        />
        </div>
      </PopupContainer>
      {/* {createArtorkLoading &&
        <div className="absolute top-0 w-full h-full bg-white bg-opacity-80 animate-pulse z-50">
          <Loading />
        </div>
      } */}
    </MainPopup>
  );
}

export default CompetitionConfirmPopup;
