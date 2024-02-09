import React, { useEffect, useRef, useState } from 'react'
import InputFile, { IInputFile } from '../InputFile'
import tw from 'tailwind-styled-components'

function InputFileUi(props: IInputFile) {
    const btnRef = useRef<HTMLButtonElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [btnWidth, setBtnWdith] = useState<number>(0)

    useEffect(() => {
        if (btnRef.current) {
            setBtnWdith(btnRef.current?.offsetWidth)
        }
    }, [btnRef])

    return (
        <FileWrapper style={{ width: `${btnWidth || 180}px` }}>
            <HiddenInput>
                <InputFile {...props} ref={inputRef} />
            </HiddenInput>
            <FileBtn onClick={(e) => e.preventDefault()} ref={btnRef}>
                Файл оруулна уу
            </FileBtn>
        </FileWrapper>
    )
}

const FileWrapper = tw.div`
    relative
    overflow-hidden
    z-100
`
const HiddenInput = tw.div`
    absolute
    top-0
    left-0
    z-0
    opacity-0
    bg-red-200
`

const FileBtn = tw.button`
    bg-gray-300
    whitespace-nowrap
`

export default InputFileUi
