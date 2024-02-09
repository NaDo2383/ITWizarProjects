/**
 * @createdBy duka 2023/4/12
 */
import React, { createContext, useState, useContext } from "react";

const ServiceInfoContext = createContext({});

const ServiceInfoProvider = ({ children }) => {
  const [privacyPolicy, setPrivacyPolicy] = useState(null)
  const [ termsOfUse, setTermsOfUse ] = useState(null)
  const [ termsByType, setTermsByType ] = useState(null)
  
  return (
    <ServiceInfoContext.Provider
      value={{
        privacyPolicy, 
        setPrivacyPolicy,
        termsOfUse, 
        setTermsOfUse,
        termsByType, 
        setTermsByType
      }}>
      {children}
    </ServiceInfoContext.Provider>
  );
};

const useServiceInfoContext = () => useContext(ServiceInfoContext);

export { ServiceInfoContext, ServiceInfoProvider, useServiceInfoContext };
