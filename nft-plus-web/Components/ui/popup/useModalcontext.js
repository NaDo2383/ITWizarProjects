/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { createContext, useState, useContext } from "react";
import { MODAL_COMPONENTS } from './popupRegistration'

const GlobalModalContext = createContext({});

const GlobalModalProvider = ({ children }) => {
  const [store, setStore] = useState({
    modalType: null,
    modalProps: []
  });
  const { modalType, modalProps } = store;
  const [modalHistory, setModalHistory] = useState([]);
  const [ globalModalState, setGlobalModalState ] = useState({})
  //
  if( modalType && process.env.mode !== 'production') {
      console.log(`${modalType} нэртэй popup харагдаж байна.`)
  }
  const showModal = (modalType, modalProps) => {
    // энэ console - ийг арилгахгүй байлгаж байгаарай
    const updatedModalProps = [...store.modalProps, { modalType, modalProps }];
    setStore({
      ...store,
      modalType,
      modalProps: updatedModalProps
    });
    const updatedHistory = [...modalHistory, modalType];
    const uniqueArray = new Set(updatedHistory);
    const uniqueModalHistory = Array.from(uniqueArray);
    setModalHistory(uniqueModalHistory);
  };

  const hideModal = () => {
    let currentModal = modalHistory[modalHistory.length - 1];
    const currentModalIndex = modalHistory?.indexOf(currentModal);
    let previousModal = modalHistory[currentModalIndex - 1];

    const history = [...modalHistory];
    const updatedHistory =
      history.length > 0 ? history.splice(0, history.length - 1) : [];
    setModalHistory([...updatedHistory]);

    let hideModalType = previousModal ? previousModal : null;

    const copyModalProps = [...store.modalProps];
    const updatedModalProps = copyModalProps.filter(
      (modalProps) => modalProps.modalType !== modalType
    );

    if (modalType === hideModalType) {
      setStore({
        ...store,
        modalType: null,
        modalProps: [...updatedModalProps]
      });
    } else {
      setStore({
        ...store,
        modalType: hideModalType,
        modalProps: [...updatedModalProps]
      });
    }
  };

  const hideAllModals = () => {
    setStore({ ...store, modalType: null, modalProps: [] });
    setModalHistory([]);
  };

  const renderComponent = () => {
    if (modalType) {
      const ModalComponent = MODAL_COMPONENTS[modalType];
      return <ModalComponent id="global-modal" {...modalProps} />;
    }
    return null;
  };

  return (
    <GlobalModalContext.Provider
      value={{
        store,
        showModal,
        hideModal,
        hideAllModals,
        modalHistory,
        globalModalState, 
        setGlobalModalState
      }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};

const useGlobalModalContext = () => useContext(GlobalModalContext);

export { GlobalModalContext, GlobalModalProvider, useGlobalModalContext };
