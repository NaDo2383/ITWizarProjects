import { useTabContext } from './useTabContext'

function useTab() {
    const { activeTabId, setActiveTabId, subTabIndex, setSubTabIndex, scroll, setScroll } = useTabContext()
        
    return { 
        activeTabId,
        setActiveTabId,
        subTabIndex,
        setSubTabIndex,
        scroll,
        setScroll
    }
}

export default useTab