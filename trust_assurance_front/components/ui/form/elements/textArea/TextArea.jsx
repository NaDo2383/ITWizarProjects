// import { TFormElement } from 'a/common/types/common'
import React from 'react'
import styled from 'styled-components'
function TextArea(props) {
    const { cols, rows, placeholder, name, onChange, required, isValid, disabled, children, value } = props

    return (
        <TextField
            value={value}
            cols={cols ?? 10}
            rows={rows ?? 10}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            aria-label={'text-area-' + name}
            aria-required={required}
            aria-invalid={isValid}
            disabled={disabled}
            isValid={isValid}
        />
    )
}

const TextField = styled.textarea`
    border: ${props => props.isValid ? '1px solid red' : 'none'}
`

export default TextArea
