/**
 * @createdBy Phill Anderson 2022/3/28
 */
import React, { createContext, useState, useContext } from 'react'

const TabContext = createContext({})

const TabProvider = ({ children }) => {
    const [activeTabId, setActiveTabId] = useState(0)
    const [subTabIndex, setSubTabIndex] = useState(0)
    const [scroll, setScroll] = useState(false)

    return (
        <TabContext.Provider
            value={{
                activeTabId,
                setActiveTabId,
                subTabIndex,
                setSubTabIndex,
                scroll,
                setScroll,
            }}
        >
            {children}
        </TabContext.Provider>
    )
}

const useTabContext = () => useContext(TabContext)

export { TabContext, TabProvider, useTabContext }
