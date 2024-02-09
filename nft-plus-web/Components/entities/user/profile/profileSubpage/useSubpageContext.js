/**
 * @createdBy Phill Anderson 2023/03/20
 */
import React, { createContext, useState, useContext } from "react";
import useMyPageTranslation from "locale/useMypageTranslation";
const SubpageContext = createContext({});

const SubpageProvider = ({ children }) => {
  const {
      issuedNFTI18,
      licenseAgreementI18,
      purchasedNFTI18,
      desiredNFTI18,
      activityHistoryI18,
  } = useMyPageTranslation()

  const headerItem = [
    { value: issuedNFTI18 },
    { value: licenseAgreementI18 },
    { value: purchasedNFTI18 },
    { value: desiredNFTI18 },
    { value: activityHistoryI18 }
  ];
  const headerItem2 = [
    { value: purchasedNFTI18 },
    { value: licenseAgreementI18 },
    { value: desiredNFTI18 },
    { value: activityHistoryI18 }
  ]

  const [ activeSubpageIdx, setActiveSubpageIdx ] = useState(0)  
  const [ chosenSubMenuText, setChosenSubMenuText ] = useState('All')
  return (
    <SubpageContext.Provider
      value={{
        activeSubpageIdx, 
        setActiveSubpageIdx,
        headerItem,
        headerItem2,
        chosenSubMenuText, 
        setChosenSubMenuText,
      }}
    >
      {children}
    </SubpageContext.Provider>
  );
};

const useSubpageContext = () => useContext(SubpageContext);

export { SubpageContext, SubpageProvider, useSubpageContext };
