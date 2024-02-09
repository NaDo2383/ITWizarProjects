/**
 * @createdBy zombie 2023/3/20
 */
import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext({});

const NotificationProvider = ({ children }) => {
  const [notifications, setNotification] = useState([]);
  const [ scrollNotifications, setScrollNotifications ] = useState([])
  const [notificationLoading, setNotificationLoading] = useState({
    notificationsLoading: false
  });
  const [extendedIndex, setExtendedIndex] = useState(null);
  const [extend, setExtend] = useState(false);
  const [readIndexes, setReadIndexes] = useState([]);
  const [load, setLoad] = useState(false);
  const [checkAllBoxes, setCheckAllBoxes] = useState(false);
  const [numToCheck, setNumToCheck] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [changeList, setChangeList] = useState([]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotification,
        notificationLoading,
        setNotificationLoading,
        extend,
        setExtend,
        extendedIndex,
        setExtendedIndex,
        readIndexes,
        setReadIndexes,
        checkAllBoxes,
        setCheckAllBoxes,
        numToCheck,
        setNumToCheck,
        pageNum,
        setPageNum,
        changeList,
        setChangeList,
        load,
        setLoad,
        scrollNotifications, 
        setScrollNotifications
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => useContext(NotificationContext);

export { NotificationContext, NotificationProvider, useNotificationContext };
