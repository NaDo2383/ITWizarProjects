import React from 'react'
import { IInput } from './_interface'

function InputEmail(props: IInput) {
    const { onChange, placeholder, name, value, required, isValid, className } = props
    return (
        <input
            type="password"
            required={required}
            onChange={onChange}
            name={name}
            value={value || ''}
            placeholder={placeholder || ''}
            aria-label={'email-input-' + name}
            aria-invalid={isValid}
            className={`${className} ${isValid ? 'border border-darkPurple' : ''}`}
        />
    )
}

export default InputEmail
