import { useState, useRef, useCallback } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
function useDropdown() {
    const [isShow, setIsShow] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

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
        setIsShow,
        ref,
    }
}

export default useDropdown
