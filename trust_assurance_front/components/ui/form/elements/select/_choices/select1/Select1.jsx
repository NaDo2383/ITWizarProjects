/**
 * @createdBy Phill Anderson 2023/6/22
 */
import React from 'react'
import SelectOptions from './SelectOptions'
import { GoChevronDown } from 'react-icons/go'
import useSelect from '../../useSelect'
import styled from 'styled-components'

function Select1(props) {
    const { defaultValue, onChangeWithoutEvent, options, name } = props

    const selectOptions = {
        defaultValue,
    }
    const { selectRef, isExpanded, handleExpand, selectedLabel, setSelectedLabel } = useSelect(selectOptions)

    const handleKeyDown = (e) => {
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
                onChangeWithoutEvent={onChangeWithoutEvent}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
                options={options}
            />
        </SelectWrapper>
    )
}

const SelectWrapper = styled.div`
  position: relative;
  border: 1px solid #656565;
  border-radius: 8px;
  cursor: pointer;
`;

// SelectCustom
const SelectCustom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  padding-top: 5px;
`;

// Label
const Label = styled.label`
  color: #ABABAB;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding-bottom: 1px;
  cursor: pointer;
`;

export default Select1
