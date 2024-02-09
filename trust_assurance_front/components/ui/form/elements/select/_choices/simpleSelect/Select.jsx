import { GoChevronDown } from 'react-icons/go'
import useSelect from '../../useSelect'
import styled from 'styled-components'
import InputText from '../../../input/InputText'
import useForm from '@/components/ui/form/store/useForm'

const Select = ({ name, options, defaultValue, onChange, label, formState, isDisabled, selectedValue }) => {
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
        setSelectedLabel
    } = useSelect(selectOptions)

    if (selectedValue) {
        () => setSelectedLabel(selectedValue)
    }

    if (selectedLabel !== "직접입력") {
        return (
            <SelectBox
                ref={selectRef}
                role="combobox"
                aria-expanded={isExpanded}
                aria-controls={`select-options-${name}`}
                onClick={handleExpand}
            >
                <SelectTag
                    aria-owns={`select-options-${name}`}
                    aria-expanded={isExpanded}
                    name={name}
                    value={selectedLabel}
                    onChange={handleChange}
                    className="select-box"
                    id={name}
                    disabled={isDisabled}
                >
                    {options.map((option, idx) => (
                        <option key={`select-option-${name}-${idx}`} value={option.value} onClick={handleOption}>
                            {option.label}
                        </option>
                    ))}
                </SelectTag>
                <SelectArrow ariaExpanded={isExpanded.toString()}>
                    <GoChevronDown fontSize={15} />
                </SelectArrow>
            </SelectBox>
        )
    } else {
        return (
            <InputText
                name={name}
                onChange={onChange}
                value={formState?.emailType?.value}
                isValid={Boolean(formState?.emailType?.error)}
                isDisabled={isDisabled}
            // placeholder="메일 유형"
            />
        )
    }
}

const SelectBox = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    position:relative;
    width:100%;
    color: #8A8AA0;
`

const SelectArrow = styled.div`
    position:absolute;
    right: 10px;
    top: 40%;
    transform: translateY(-50%);
    transform: ${(props) => (props.ariaExpanded === 'true' ? "rotate(180deg);" : "rotate(0);")}
`

const SelectTag = styled.select`
    color: #8A8AA0;
`

export default Select
