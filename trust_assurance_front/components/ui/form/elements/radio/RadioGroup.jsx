import { Flex } from '@/components/ui/containers/flex/Flex'
import React, { useState } from 'react'
const RadioGroup = ({ name, options, onChange, defaultValue }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue ?? null)

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
        onChange(event)
    }

    return (
        <Flex
            gap={10}
            role="radiogroup"
            aria-label={name}
            aria-labelledby={`${name}-label`}
            aria-activedescendant={`${name}-radio-${options.findIndex((option) => option.value === selectedValue)}`}
        >
            {options.map((option, idx) => {
                return (
                    <Flex gap={5} key={name + '-radio-' + idx} className="relative">
                        <input
                            type="radio"
                            name={name}
                            id={name + '-radio-' + idx}
                            value={option.value}
                            onChange={handleChange}
                            checked={option.value === selectedValue}
                            aria-checked={option.value === selectedValue}
                        />
                        <label htmlFor={name + '-radio-' + idx}>{option.label}</label>
                    </Flex>
                )
            })}
        </Flex>
    )
}

export default RadioGroup
