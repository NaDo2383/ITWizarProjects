/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { createContext, useState, useContext } from "react";

const ArtDetailContext = createContext({});

const ArtDetailProvider = ({ children }) => {
  const [artDetail, setArtDetail] = useState(null);

  return (
    <ArtDetailContext.Provider
      value={{
        artDetail, 
        setArtDetail,
      }}
    >
      {children}
    </ArtDetailContext.Provider>
  );
};

const useArtDetailContext = () => useContext(ArtDetailContext);

export { ArtDetailContext, ArtDetailProvider, useArtDetailContext };
