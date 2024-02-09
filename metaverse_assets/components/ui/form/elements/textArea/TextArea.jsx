// import { TFormElement } from 'a/common/types/common'
import React from 'react'
import tw from 'tailwind-styled-components'

function TextArea(props) {
    const {
        cols,
        rows,
        placeholder,
        name,
        onChange,
        required,
        isValid,
        disabled,
        value,
    } = props

    return (
        <TextField
            cols={cols ?? 10}
            rows={rows ?? 10}
            name={name}
            value={value}
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

const TextField = tw.textarea`
    dark:bg-jacarta-700 
    hover:ring-accent/10 
    focus:ring-accent 
    dark:border-jacarta-600 
    dark:placeholder:text-jacarta-300 
    w-full 
    rounded-lg 
    py-3 
    px-3 
    hover:ring-2 
    dark:text-white
    ${(props) => (props.isValid ? 'border-red' : 'border-jacarta-100')};
`

export default TextArea
