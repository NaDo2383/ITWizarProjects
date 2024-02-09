import { preventEnterKey } from 'a/common/keyboard/keys'
import React from 'react'
import tw from 'tailwind-styled-components'

function InputText(props) {
    const { onChange, placeholder, name, required, isValid, value, readOnly } = props
    return (
        <InputTw
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
            onKeyDown={(e) => preventEnterKey(e)}
        />
    )
}

export const InputTw = tw.input`
    dark:bg-jacarta-700 
    border-jacarta-100
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
    sm:text-[16px]
    text-sm
    normal-case
`

export default InputText
