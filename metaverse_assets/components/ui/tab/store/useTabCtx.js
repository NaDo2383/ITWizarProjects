// import { JsxChildren } from 'a/common/types/common'
import React, { createContext, useState, useContext } from 'react'

const TabContext = createContext({})

const TabProvider = ({ children }) => {
    const [activeTabId, setActiveTabId] = useState(0)
    const [tabHeadItems, setTabHeadItems] = useState([])
    const [isProfileEditting, setIsProfileEditting] = useState(false)
    return (
        <TabContext.Provider
            value={{
                activeTabId,
                setActiveTabId,
                tabHeadItems,
                setTabHeadItems,
                isProfileEditting,
                setIsProfileEditting,
            }}
        >
            {children}
        </TabContext.Provider>
    )
}

const useTabCtx = () => useContext(TabContext)

export { TabContext, TabProvider, useTabCtx }
