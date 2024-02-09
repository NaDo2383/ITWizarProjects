/**
 * @createdBy Phill Anderson 2022/12/19
 */
import { useState } from "react";
import { useGlobalModalContext } from "./useModalcontext";
import { MODAL_TYPES } from './popupRegistration'

function usePopup() {
  const [popupProps, setPopupProps] = useState(null);
  const { 
      store, 
      showModal, 
      hideModal, 
      modalHistory, 
      hideAllModals, 
      globalModalState, 
      setGlobalModalState 
  } = useGlobalModalContext();

  function handleShowModal(modalType, modalProps) {
    showModal(modalType, modalProps);
  }

  async function getCurrentModalprops() {
    const currentModalType = store.modalType;
    const currentModalProps = store.modalProps.filter(
      (item) => item.modalType == currentModalType
    );
    const res = currentModalProps[0].modalProps
    setPopupProps(res);
    return res;
  }

  return {
    MODAL_TYPES,
    store,
    handleShowModal,
    hideModal,
    modalHistory,
    hideAllModals,
    popupProps,
    getCurrentModalprops,
    globalModalState, 
    setGlobalModalState 
  };
}

export default usePopup;
