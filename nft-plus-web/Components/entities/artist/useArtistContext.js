/**
 * @createdBy Phill Anderson 2022/9/13
 */
import React, { createContext, useState, useContext } from "react";

const ArtistContext = createContext({});

const ArtistProvider = ({ children }) => {
    const [artistList, setArtisList] = useState([]);
    const [artistBanners, setArtistBanners] = useState([]);
    const [artistIntroduction, setArtistIntroduction] = useState([]);

  return (
    <ArtistContext.Provider
      value={{
        artistList, 
        setArtisList,
        artistBanners, 
        setArtistBanners,
        artistIntroduction, 
        setArtistIntroduction
      }}>
      { children }
    </ArtistContext.Provider>
  );
};

const useArtistContext = () => useContext(ArtistContext);

export { ArtistContext, ArtistProvider, useArtistContext };