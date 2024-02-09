import React from 'react'
interface ITextArea extends TFormElement {
    rows?: number
    cols?: number
    isValid?: boolean
}
function TextArea(props: ITextArea) {
    const { cols, rows, placeholder, name, onChange, required, isValid } = props
    return (
        <textarea
            cols={cols ?? 10}
            rows={rows ?? 10}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            aria-label={'text-area-' + name}
            aria-required={required}
            aria-invalid={isValid}
        />
    )
}

export default TextArea
