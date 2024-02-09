/**
 * @createdBy Phill Anderson 2023/04/4
 */
import React, { createContext, useState, useContext } from "react";

const WalletContext = createContext({});

const WalletProvider = ({ children }) => {
    const [ activeWallets, setActiveWallets ] = useState()
    const [ activeIndex, setActiveIndex ] = useState(1)
    const [ copied, setCopied ] = useState(false)
    const [ deleted, setDeleted ] = useState(false)
    const [ walletLoading, setWalletLoading ] = useState({
      addBtnLoading: false,
      deleteBtnLoading: false
    })
    
  return (
    <WalletContext.Provider
      value={{
        activeWallets, 
        setActiveWallets,
        activeIndex, 
        setActiveIndex,
        copied, 
        setCopied,
        deleted, 
        setDeleted,
        walletLoading, 
        setWalletLoading
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const useWalletContext = () => useContext(WalletContext);

export { WalletContext, WalletProvider, useWalletContext };
