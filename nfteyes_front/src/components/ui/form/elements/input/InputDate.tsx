import React from 'react'
import { IInput } from './_interface'

function InputDate(props: IInput) {
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
