import React, { useEffect, useRef, useState } from 'react'
import InputFile from '../InputFile'
import MainErrorBoundary from 'components/ui/error/MainErrorBoundary'
import { BsFillCloudArrowUpFill } from 'react-icons/bs'
import { BtnTw } from 'a/components/ui/button/Button'
import tw from 'tailwind-styled-components'

function InputFileUi(props) {
    const btnRef = useRef(null)
    const [btnWidth, setBtnWdith] = useState(0)

    const style = {
        width: props.wFull ? `100%` : `${btnWidth}px`,
    }
    useEffect(() => {
        if (btnRef.current) {
            setBtnWdith(props.width || btnRef.current?.offsetWidth)
        }
    }, [btnRef])
    return (
        <MainErrorBoundary>
            <FileWrapper style={style}>
                <HiddenDiv>
                    <InputFile {...props} />
                </HiddenDiv>
                <FileUploadBtn
                    ref={btnRef}
                    className={`flex gap-2 items-center justify-center opacity-100`}
                >
                    <span>{props.placeholder || '파일을 입력하세요'}</span>
                    <BsFillCloudArrowUpFill fontSize={25} />
                </FileUploadBtn>
            </FileWrapper>
        </MainErrorBoundary>
    )
}

const FileWrapper = tw.div`
    w-full
    relative
    overflow-hidden
    z-100
`

const HiddenDiv = tw.div`
    w-full
    h-full
    absolute
    top-0
    left-0
    z-0
    opacity-0
`

const FileUploadBtn = tw(BtnTw)`
    w-full
    px-0
    cursor-pointer
`
export default InputFileUi
