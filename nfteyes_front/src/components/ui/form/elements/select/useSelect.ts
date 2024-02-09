import { useRef, useState, useCallback } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export type TUseSelect = {
    defaultValue: string
    onChange?: ((e: any, isCheckbox?: boolean | undefined) => void) | undefined
}

function useSelect(selectProps: TUseSelect) {
    const { defaultValue, onChange } = selectProps
    const selectRef = useRef<HTMLDivElement>(null)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [selectedLabel, setSelectedLabel] = useState<string>(defaultValue ?? '')

    const handleClickOutside = useCallback(() => {
        setIsExpanded(false)
    }, [])

    useOnClickOutside(selectRef, handleClickOutside)

    const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        onChange!(event)
        setSelectedLabel(selectedValue)
    }, [])

    const handleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev)
    }, [])

    const handleOption = () => {
        console.log('heey')
    }
    return {
        handleChange,
        selectRef,
        isExpanded,
        selectedLabel,
        handleExpand,
        handleOption,
        setSelectedLabel,
    }
}

export default useSelect
