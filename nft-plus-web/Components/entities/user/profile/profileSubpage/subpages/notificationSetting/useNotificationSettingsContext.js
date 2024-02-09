import React, { createContext, useContext } from "react";

const NotificationSettingsContext = createContext({});

const NotificationSettingsProvider = ({ children }) => {
  return (
    <NotificationSettingsContext.Provider
      value={{}}
    >
      {children}
    </NotificationSettingsContext.Provider>
  );
};

const useNotificationSettingsContext = () => useContext(NotificationSettingsContext);

export { NotificationSettingsContext, NotificationSettingsProvider, useNotificationSettingsContext };