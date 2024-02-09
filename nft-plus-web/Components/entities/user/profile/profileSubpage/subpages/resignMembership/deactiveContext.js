/**
 * @createdBy Phill Anderson 2023/04/05
 */
import React, { createContext, useState, useContext } from "react";

const DeactiveContext = createContext({});
const DeactiveProvider = ({ children }) => {
  const [deactiveState, setDeactiveState] = useState({
        loading: false, 
        data: null,
        error: null
  })

  return (
    <DeactiveContext.Provider
      value={{
        deactiveState, 
        setDeactiveState
      }}
    >
      {children}
    </DeactiveContext.Provider>
  );
};

const useDeactiveContext = () => useContext(DeactiveContext);

export { DeactiveContext, DeactiveProvider, useDeactiveContext };
