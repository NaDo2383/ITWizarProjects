/**
 * @createdBy Phill Anderson 2023/03/20
 */
import React, { createContext, useState, useContext } from "react";

const OwnerShipContext = createContext({});

const OwnershipProvider = ({ children }) => {
  const [ ownershipQuery, setOwnershipQuery ] = useState("")  
  const [ activeId, setActiveId ] = useState(0) 
  const [ dateQuery, setDateQuery ] = useState({
      startDate: new Date(),
      endDate: new Date(),
      extraQuery: null,
      highlightedDays: [ 1, 2, 15 ],
      isClickDateButtons: false
  })  

  return (
    <OwnerShipContext.Provider
      value={{
        ownershipQuery, 
        setOwnershipQuery,
        activeId, 
        setActiveId,
        dateQuery, 
        setDateQuery 
      }}
    >
      {children}
    </OwnerShipContext.Provider>
  );
};

const useOwnershipContext = () => useContext(OwnerShipContext);

export { OwnerShipContext, OwnershipProvider, useOwnershipContext };
