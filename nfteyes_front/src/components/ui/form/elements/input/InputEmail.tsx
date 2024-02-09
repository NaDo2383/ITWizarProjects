import React from 'react'
import { IInput } from './_interface'

function InputEmail(props: IInput) {
    const { onChange, placeholder, name, value, required, isValid, disabled } = props
    return (
        <input
            type="email"
            required={required}
            onChange={onChange}
            name={name}
            value={value || ''}
            placeholder={placeholder || ''}
            aria-label={'email-input-' + name}
            aria-invalid={isValid}
            className={isValid ? 'border border-darkPurple' : ''}
            disabled={disabled}
        />
    )
}

export default InputEmail
