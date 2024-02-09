import React, { forwardRef } from 'react'
import tw from 'tailwind-styled-components'
export type IInputFile = TFormElement & {
    isValid?: boolean
    id: string
}

const InputFile = forwardRef<HTMLInputElement, IInputFile>((props, ref) => {
    const { id, name, required, onChange, isValid } = props
    return (
        <InputFileTw
            ref={ref}
            id={id}
            type="file"
            required={required}
            onChange={onChange}
            name={name}
            className={isValid ? 'border border-orange' : ''}
        />
    )
})

const InputFileTw = tw.input`
    border-none
    bg-transparent
    shadow-none
    focus:shadow-none
    hover:shadow-none
`

export default InputFile
