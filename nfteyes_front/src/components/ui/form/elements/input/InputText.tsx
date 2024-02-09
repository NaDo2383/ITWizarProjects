import React from 'react'

export type TInput = TFormElement & {
    isValid?: boolean
}
function InputText(props: TInput) {
    const { onChange, placeholder, name, required, isValid, value, id, className } = props
    return (
        <input
            id={id}
            type="text"
            required={required}
            onChange={onChange}
            name={name}
            value={value || ''}
            placeholder={placeholder || ''}
            aria-label={'text-input-' + name}
            aria-invalid={isValid}
            className={`${className} ${isValid ? 'border border-darkPurple' : ''}`}
        />
    )
}

export default InputText
