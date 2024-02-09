// import { TFormElement } from 'a/common/types/common'
import React from 'react'

function InputText(props) {
    const { onChange, placeholder, name, required, isValid, value, readOnly, isDisabled } = props
    return (
        <input
            type="text"
            required={required}
            onChange={onChange}
            name={name}
            value={value || ''}
            placeholder={placeholder || ''}
            aria-label={'text-input-' + name}
            aria-invalid={isValid}
            className={isValid ? 'input-invalid' : ''}
            readOnly={readOnly}
            disabled={isDisabled}
        />
    )
}

export default InputText
