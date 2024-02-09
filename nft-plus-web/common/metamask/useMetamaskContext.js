/**
 * @createdBy Phill Anderson 2022/12/19
 */
import React, { createContext, useState, useContext } from "react";

const MetaMaskContext = createContext({});

const MetaMaskProvider = ({ children }) => {
  const [ chainId, setChainId ] = useState(process.env.MATIC_CHAIN_ID)
  const [ metamaskUser, setMetamaskUser ] = useState({
      loggedUser: null,
      balance: null,
      error: null,
      walletList: [],
  })
  const [ asWon, setAsWon ] = useState({
      eyesAsWon: null,
      maticAsWon: null
  })

  return (
    <MetaMaskContext.Provider
      value={{
        metamaskUser,
        setMetamaskUser,
        chainId, 
        setChainId,
        asWon, 
        setAsWon
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

const useMetaMaskContext = () => useContext(MetaMaskContext);

export { MetaMaskContext, MetaMaskProvider, useMetaMaskContext };
