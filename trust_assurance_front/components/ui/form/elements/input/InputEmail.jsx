import React from 'react'

function InputEmail(props) {
    const { onChange, placeholder, name, value, required, isValid, className, isDisabled } = props
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
            className={`${isValid ? 'input-invalid' : ''} ${className || ''}`}
            disabled={isDisabled}
        />
    )
}

export default InputEmail
