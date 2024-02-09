/**
 * @createdBy Phill Anderson 2023/6/22
 */
import React from 'react'
import SelectOptions from './SelectOptions'
import { TSelect } from '../Select'
import { GoChevronDown } from 'react-icons/go'
import useSelect, { TUseSelect } from '../../useSelect'
import tw from 'tailwind-styled-components'
function Select1(props: TSelect) {
    const { defaultValue, onChangeWithoutEvent, options, name } = props

    const selectOptions: TUseSelect = {
        defaultValue,
    }
    const { selectRef, isExpanded, handleExpand, selectedLabel, setSelectedLabel } = useSelect(selectOptions)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleExpand()
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (!isExpanded) {
                handleExpand()
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (isExpanded) {
                handleExpand()
            }
        }
    }

    return (
        <SelectWrapper ref={selectRef} onKeyDown={handleKeyDown}>
            <SelectCustom
                aria-haspopup="listbox"
                aria-expanded={isExpanded}
                aria-labelledby="select-label"
                onClick={handleExpand}
            >
                <Label id="select-label" className="">
                    {selectedLabel}
                </Label>
                <span className="select-arrow">
                    <GoChevronDown className={`${isExpanded ? 'rotate-180' : 'rotate-0'} transition-transform`} />
                </span>
            </SelectCustom>
            <SelectOptions
                name={name}
                isExpanded={isExpanded}
                handleExpand={handleExpand}
                onChangeWithoutEvent={onChangeWithoutEvent!}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
                options={options}
            />
        </SelectWrapper>
    )
}

const SelectWrapper = tw.div`
      relative 
      rounded-[8px] 
      cursor-pointer 
      border
      border-[#656565]
`

const SelectCustom = tw.div`
  flex 
  justify-between 
  w-full
  px-10
  py-5
`

const Label = tw.label`
text-[#ABABAB] 
  text-14 
  font-[400] 
  flex 
  items-center 
  pb-1
  cursor-pointer
`

export default Select1
