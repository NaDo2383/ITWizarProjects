import { RefObject, useEffect, useState } from 'react'
import useWindow from '../window/useWindow'

function useScrollPosition(ref: RefObject<HTMLElement> | null) {
    const { browserWindow } = useWindow()
    const [scroll, setScroll] = useState<TScroll>({
        scrollHeight: 0,
        scrollWidth: 0,
    })

    function handleScroll() {
        const element = ref?.current
        setScroll((prev) => ({
            ...prev,
            scrollHeight: element?.scrollHeight || 0,
            scrollWidth: element?.scrollWidth || 0,
        }))
    }

    useEffect(() => {
        handleScroll()
    }, [browserWindow.innerHeight, browserWindow.innerWidth])
    return scroll
}

export function scrollLeft(ref: React.RefObject<HTMLElement>, leftPosition: number): void {
    if (ref.current) {
        ref.current.scrollTo({
            left: leftPosition,
            behavior: 'smooth',
        })
    }
}

export default useScrollPosition
