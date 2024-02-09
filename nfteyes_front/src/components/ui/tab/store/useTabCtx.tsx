import React, { createContext, useState, useContext, FC } from 'react'
import { TTabLinkItem } from './_type'

interface ITabCtx {
    activeTabId: number
    setActiveTabId: React.Dispatch<React.SetStateAction<number>>
    tabHeadItems: TTabLinkItem[]
    setTabHeadItems: React.Dispatch<React.SetStateAction<TTabLinkItem[]>>
}

const TabContext = createContext<ITabCtx>({} as ITabCtx)

export interface ITabProvider extends JsxChildren {}

const TabProvider: FC<ITabProvider> = ({ children }) => {
    const [activeTabId, setActiveTabId] = useState<number>(0)
    const [tabHeadItems, setTabHeadItems] = useState<TTabLinkItem[]>([])
    return (
        <TabContext.Provider
            value={{
                activeTabId,
                setActiveTabId,
                tabHeadItems,
                setTabHeadItems,
            }}
        >
            {children}
        </TabContext.Provider>
    )
}

const useTabCtx = () => useContext(TabContext)

export { TabContext, TabProvider, useTabCtx }
