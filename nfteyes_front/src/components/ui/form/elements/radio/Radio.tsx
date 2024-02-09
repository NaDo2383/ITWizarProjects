import React, { useState } from 'react'
export interface IRadioItem {
    label: string
    value: string
}

export type TRadioGroup = TFormElement & {
    isValid?: boolean
    options: IRadioItem[]
    defaultValue?: string
}
const RadioGroup = ({ name, options, onChange, defaultValue }: TRadioGroup) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue ?? null)

    const handleChange = (event: any) => {
        setSelectedValue(event.target.value)
        onChange!(event)
    }

    return (
        <div
            role="radiogroup"
            aria-label={name}
            aria-labelledby={`${name}-label`}
            aria-activedescendant={`${name}-radio-${options.findIndex((option) => option.value === selectedValue)}`}
            className="flex flex-col gap-4"
        >
            {options.map((option, idx) => {
                return (
                    <div key={name + '-radio-' + idx} className="relative flex items-center gap-4">
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
                    </div>
                )
            })}
        </div>
    )
}

export default RadioGroup
