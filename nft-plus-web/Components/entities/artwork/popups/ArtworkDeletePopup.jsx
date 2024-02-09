import React, { useEffect } from 'react'
import MainPopup from 'Components/ui/popup/MainPopup'
import usePopup from 'Components/ui/popup/usePopup'
import PopupActionButtons from 'Components/ui/popup/popupMaterials/PopupActionButtons'
import PopupContainer from 'Components/ui/popup/popupMaterials/PopupContainer'
import PopupContent from 'Components/ui/popup/popupMaterials/PopupContent'
import Image from 'next/image'
import closeIcon from "public/close.svg";
import useArtworkTranslation from 'locale/useArtworkTranslation'
import useMyPageTranslation from 'locale/useMypageTranslation'
import useArtwork from '../useArtwork'
import { useGlobalContext } from 'common/global/useGlobalContext'

function ArtworkDeletePopup() {
    const {cancel} =useArtworkTranslation();
    const { artworkDelete } = useArtwork()
    const { globalItems } = useGlobalContext()
    const {
        hideModal,
        hideAllModals,
        getCurrentModalprops,
        popupProps
    } = usePopup();
    const {
        mobiletable_question,
        confirmI18,
        denyDesc1,
        denyDesc2 } = useMyPageTranslation();

    useEffect(() => {
        getCurrentModalprops()
    }, [])

    async function handleConfirm() {
        artworkDelete(popupProps?.artwork?.id).then((res) =>
        {
            if (res?.code === 404) {
                alert(res.msg)
                hideAllModals()
                return
            }
            if (res?.code === 500) {
                alert('server error')
                return
            }
        })
        .then(() => globalItems.changeArtworkDeletion())
        .then(() => {
            hideAllModals()
            return
        })
    }  

    return (
        <MainPopup width={580}>
            <PopupContainer>
                <PopupContent>
                    <div className='flex flex-row justify-between'>
                        <h3 className="text-[22px] text-white">{mobiletable_question}</h3>
                        <button onClick={() => hideModal()} className="w-7 h-7">
                            <Image src={closeIcon} alt="closeIcon" />
                        </button>
                    </div>
                    <div className='text-[#DDD] text-[18px] mt-[32px]'>
                        <p>{denyDesc1}</p>
                        <p>{denyDesc2}</p>
                    </div>
                </PopupContent>
                <PopupActionButtons yes={handleConfirm} no={() => hideModal()} btnTexts={{ no: cancel, yes: confirmI18 }} />
            </PopupContainer>
        </MainPopup>
    )
}

export default ArtworkDeletePopup