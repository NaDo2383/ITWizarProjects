import React from 'react'
import { IInput } from './_interface'

function InputNumber(props: IInput) {
    const { onChange, placeholder, name, required, isValid, value } = props
    return (
        <input
            type="number"
            required={required}
            onChange={onChange}
            name={name}
            value={value}
            placeholder={placeholder || ''}
            aria-label={'number-input-' + name}
            aria-invalid={isValid}
            min="0"
            step="1"
            className={isValid ? 'border border-darkPurple' : ''}
        />
    )
}

export default InputNumber
