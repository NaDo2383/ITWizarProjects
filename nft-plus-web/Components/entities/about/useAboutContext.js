/**
 * @createdBy Phill Anderson 2022/6/20
 */
import React, { createContext, useState, useContext } from "react";

const AboutContext = createContext({});

const AboutProvider = ({ children }) => {
    const [ abouts, setAbouts ] = useState(null)

  return (
    <AboutContext.Provider
      value={{
        abouts, 
        setAbouts
      }}>
      { children }
    </AboutContext.Provider>
  );
};

const useAboutContext = () => useContext(AboutContext);

export { AboutContext, AboutProvider, useAboutContext };
