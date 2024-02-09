import { useRef, useState, useCallback } from 'react'
import useOnClickOutside from 'common/mouse/useOnClickOutside'

function useSelect(selectProps) {
    const { defaultValue, onChange } = selectProps

    const selectRef = useRef(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState(defaultValue ?? '')

    const handleClickOutside = useCallback(() => {
        setIsExpanded(false)
    }, [])

    useOnClickOutside(selectRef, handleClickOutside)

    const handleChange = useCallback((event) => {
        const selectedValue = event.target.value
        onChange(event)
        setSelectedLabel(selectedValue)
    }, [])

    const handleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev)
    }, [])

    const handleOption = () => {}
    return {
        handleChange,
        selectRef,
        isExpanded,
        selectedLabel,
        handleExpand,
        handleOption,
        setSelectedLabel,
        setIsExpanded,
    }
}

export default useSelect
