import React, { CSSProperties, Dispatch, SetStateAction } from 'react'
import { ISelectOption } from '../Select'
import tw from 'tailwind-styled-components'
import { motion } from 'framer-motion'
type TSelectOptions = {
    isExpanded: boolean
    handleExpand: () => void
    onChangeWithoutEvent: (name: string, value: string) => void
    setSelectedLabel: Dispatch<SetStateAction<string>>
    options: ISelectOption[]
    name: string
    selectedLabel: string
}

function SelectOptions(props: TSelectOptions) {
    const { isExpanded, options, handleExpand, onChangeWithoutEvent, name, setSelectedLabel, selectedLabel } = props

    const style: CSSProperties = {
        position: 'absolute',
        top: '103%',
        left: '0',
        width: '100%',
        height: `${isExpanded ? 'auto' : '0'}`,
        background: 'transparent',
        display: `${isExpanded ? 'block' : 'none'}`,
        zIndex: `${isExpanded ? '9999' : '0'}`,
        marginTop: '4px',
    }

    function onClick(option: ISelectOption) {
        const { value, label } = option
        if (isExpanded) {
            handleExpand()
            console.log('option darlaa')
            onChangeWithoutEvent!(name, value)
            setSelectedLabel(label)
        }
    }

    return (
        <SelectUl style={style}>
            {options?.map((option: ISelectOption, idx: number) => {
                const isActive = selectedLabel === option.label
                return (
                    <SelectLi key={'option-' + idx} onClick={() => onClick(option)} isactive={isActive.toString()}>
                        {option.label}
                    </SelectLi>
                )
            })}
        </SelectUl>
    )
}

const SelectUl = tw.ul`
    border
    border-[#656565] 
     rounded-[8px] 
     overflow-hidden
`

interface ISelectLi extends React.ComponentProps<typeof motion.li> {
    isactive: string
}

const SelectLi = tw(motion.li)<ISelectLi>`
    flex  
    opacity-90 
    backdrop-blur-[2px] 
    py-5 
    pl-2 
    text-18 
    text-green
    last:border-0
     hover:text-blue 
    ${(p) => {
        return p.isactive === 'true' && ' text-orange'
    }} 
`

export default SelectOptions
