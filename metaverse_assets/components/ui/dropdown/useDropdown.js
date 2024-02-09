import { useState, useRef, useCallback } from 'react'
import useOnClickOutside from 'common/mouse/useOnClickOutside'
function useDropdown() {
    const [isShow, setIsShow] = useState(false)
    const ref = useRef(null)

    const handleDropdown = useCallback(() => {
        setIsShow((prev) => !prev)
    }, [])

    const closeDropdown = useCallback(() => {
        setIsShow(false)
    }, [])

    useOnClickOutside(ref, closeDropdown)
    return {
        isShow,
        handleDropdown,
        closeDropdown,
        ref,
    }
}

export default useDropdown
