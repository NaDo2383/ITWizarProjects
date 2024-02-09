import React from 'react'

function InputDate(props) {
    const { onChange, placeholder, name, required, isValid } = props
    return (
        <input
            type="date"
            required={required}
            onChange={onChange}
            name={name}
            placeholder={placeholder || ''}
            aria-label={'date-input-' + name}
            aria-invalid={isValid}
        />
    )
}

export default InputDate
