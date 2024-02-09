import { GoChevronDown } from 'react-icons/go'
import useSelect from '../../useSelect'
import styled from 'styled-components'

const Select = ({ name, options, defaultValue, onChange }) => {
    const selectOptions = {
        defaultValue,
        onChange,
    }

    const {
        selectRef,
        handleChange,
        isExpanded,
        selectedLabel,
        handleExpand,
        handleOption,
    } = useSelect(selectOptions)

    return (
        <SelectBox
            ref={selectRef}
            role="combobox"
            aria-expanded={isExpanded}
            aria-controls={`select-options-${name}`}
            onClick={handleExpand}
        >
            <select
                aria-owns={`select-options-${name}`}
                aria-expanded={isExpanded}
                name={name}
                value={selectedLabel}
                onChange={handleChange}
                className="select-box"
                id={name}
            >
                {options.map((option, idx) => (
                    <option
                        key={`select-option-${name}-${idx}`}
                        value={option.value}
                        onClick={handleOption}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <SelectArrow ariaExpanded={isExpanded.toString()}>
                <GoChevronDown fontSize={15} />
            </SelectArrow>
        </SelectBox>
    )
}

const SelectBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    position: relative;
    width: 100%;
`

const SelectArrow = styled.div`
    position: absolute;
    right: 10px;
    top: 40%;
    transform: translateY(-50%);
    transform: ${(props) =>
        props.ariaExpanded === 'true' ? 'rotate(180deg);' : 'rotate(0);'};
`

export default Select
