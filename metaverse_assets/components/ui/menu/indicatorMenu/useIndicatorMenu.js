import { useState, useRef, useEffect } from 'react'

function useIndicatorMenu(menuUlId) {
    const [indicatorPosition, setIndicatorPosition] = useState()
    const [indicatorWidth, setIndicatorWidth] = useState()
    const navElement = useRef()

    function handleClick(e) {
        const linkLeft = e.target.getBoundingClientRect().left
        const navLeft = navElement.current.getBoundingClientRect().left
        const linkWidth = e.target.getBoundingClientRect().width

        const singleLinkWidth = linkWidth
        const singleLinkLeft = linkLeft - navLeft

        setIndicatorPosition(singleLinkLeft)
        setIndicatorWidth(singleLinkWidth)
    }

    useEffect(() => {
        const menuUl = document.getElementById(menuUlId)
        const firstMenu = menuUl.children[0]
        if (firstMenu) {
            const navLeft = navElement.current.getBoundingClientRect().left
            const firstMenuWidth = firstMenu.getBoundingClientRect().width
            const firstMenuLeft = firstMenu.getBoundingClientRect().left
            const singleLinkLeft = firstMenuLeft - navLeft
            setIndicatorPosition(singleLinkLeft)
            setIndicatorWidth(firstMenuWidth)
        }
    }, [])
    return {
        indicatorPosition,
        indicatorWidth,
        handleClick,
        navElement,
    }
}

export default useIndicatorMenu
