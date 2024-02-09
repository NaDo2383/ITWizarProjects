import { useRef } from 'react'
import { useTabCtx } from './useTabCtx'

// tab - тай холбоотой re-usefull кодуудыг бичиж өгнө
function useTab() {
    const { setActiveTabId, activeTabId } = useTabCtx()
    const tabLinksRef = useRef([])

    const handleKeyDown = (e, tabHeaderItems) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault()
            const nextId =
                e.key === 'ArrowLeft'
                    ? (activeTabId - 1 + tabHeaderItems.length) % tabHeaderItems.length
                    : (activeTabId + 1) % tabHeaderItems.length
            tabLinksRef.current[nextId]?.focus()
            setActiveTabId(nextId)
        }
    }

    return { tabLinksRef, handleKeyDown }
}

export default useTab
