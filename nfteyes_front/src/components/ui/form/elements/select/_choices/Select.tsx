import { GoChevronDown } from 'react-icons/go'
import useSelect, { TUseSelect } from '../useSelect'

export interface ISelectOption {
    label: string
    value: string
}

export type TSelect = TFormElement & {
    isValid?: boolean
    options: ISelectOption[]
    defaultValue: string
    onChangeWithoutEvent?: (name: string, value: string) => void
}

const Select = ({ name, options, defaultValue, onChange }: TSelect) => {
    const selectOptions: TUseSelect = {
        defaultValue,
        onChange,
    }
    const { selectRef, handleChange, isExpanded, selectedLabel, handleExpand, handleOption } = useSelect(selectOptions)

    return (
        <div
            ref={selectRef}
            role="combobox"
            aria-expanded={isExpanded}
            aria-controls={`select-options-${name}`}
            className="select-container"
            onClick={handleExpand}
        >
            <select
                aria-owns={`select-options-${name}`}
                aria-expanded={isExpanded}
                name={name}
                value={selectedLabel}
                onChange={handleChange}
                className="select-box"
            >
                {options.map((option, idx) => (
                    <option key={`select-option-${name}-${idx}`} value={option.value} onClick={handleOption}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span className="select-arrow">
                <GoChevronDown className={`${isExpanded ? 'rotate-180' : 'rotate-0'} transition-transform`} />
            </span>
        </div>
    )
}

export default Select
