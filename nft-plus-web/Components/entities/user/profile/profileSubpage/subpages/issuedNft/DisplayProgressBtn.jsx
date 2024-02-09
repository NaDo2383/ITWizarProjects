import { YellowProgressBtn, GreenProgressBtn, RedProgressBtn, WhiteYellowProgressBtn } from 'Components/ui/button/ProgressBtn'
import usePopup from 'Components/ui/popup/usePopup'
import useMyPageTranslation from 'locale/useMypageTranslation'
import React from 'react'
import useProfile from '../../../useProfile'
import useArtwork from 'Components/entities/artwork/useArtwork'

function DisplayProgressBtn(props) {
    const {
        token_issuingI18,
        reviewI18,
        denialApprovalI18,
        deleteI18,
        stop_sellingI18,
        approvedI18,
        waitinForPaymentI18
    } = useMyPageTranslation()
    const { handleShowModal, MODAL_TYPES, hideModal } = usePopup()
    const { profileUser, activeWallets } = useProfile()
    const { deleteArtWork } = useArtwork()

    function showArtworkCheckPopup() {
        handleShowModal(MODAL_TYPES.ARTWORK_CHECK, { 
            artwork: props, 
            profileUser, 
            activeWallets
        })
        setGlobalModalState(prev => ({
            ...prev,
            showSwitchNetworkModal : (modalType) => {
              hideModal();
              handleShowModal(modalType);
            }
        }))
    }

    function showArtworkReviewPopup() {
        handleShowModal(MODAL_TYPES.ARTWORK_REVIEW, { artwork: props, profileUser, activeWallets })
        setGlobalModalState(prev => ({
            ...prev,
            showSwitchNetworkModal : (modalType) => {
              hideModal();
              handleShowModal(modalType);
            }
        }))
    }

    function showArtworkApprovalPopup() {
        handleShowModal(MODAL_TYPES.ARTWORK_APPROVAL, { artwork: props })
    }

    function showArtworkDeletePopup() {
        handleShowModal(MODAL_TYPES.ARTWORK_DELETE, { artwork: props, handleDelete: deleteArtWork })
    }

    return (
        <>
            {
                props.status === "ADMIN_PENDING" && (
                    <GreenProgressBtn text={reviewI18} onClick={showArtworkReviewPopup} />
                )
            }
            {
                props.status === "ADMIN_DENIED" && (
                    <div className='flex flex-col gap-2 items-center'>
                        <RedProgressBtn text={denialApprovalI18} onClick={showArtworkApprovalPopup} />
                        <RedProgressBtn text={deleteI18} onClick={showArtworkDeletePopup} />
                    </div>
                )
            }
            {
                props.status === "REVOKED" && (
                    <RedProgressBtn text={stop_sellingI18} />
                )
            }
            {
                props.status === "GASFEE_PENDING" && props.mintStatus === "MINTED" && (
                    <YellowProgressBtn text={`${approvedI18}
                    ${waitinForPaymentI18}`} onClick={showArtworkCheckPopup} />
                )
            }
            {
                props.status === "GASFEE_PENDING" && props.mintStatus === "NOT_MINTED" && (
                    <YellowProgressBtn text={`${approvedI18}
                    ${waitinForPaymentI18}`} onClick={showArtworkCheckPopup} />
                )
            }
            {
                props.status === "GASFEE_PENDING" && props.mintStatus === "MINTING" && (
                    <WhiteYellowProgressBtn text={token_issuingI18} />
                )
            }
        </>
    )
}

export default DisplayProgressBtn