import React from 'react'
import useClipboard from './useClipboard'
import tw from 'tailwind-styled-components'

interface IClipboardBtn {
    text: string
    className?: string
}
function ClipBoardBtn({ text, className }: IClipboardBtn) {
    const { copyToClipboard } = useClipboard()
    return (
        <ClipboardBtnTw className={`${className || ''}`} onClick={() => copyToClipboard(text)}>
            {text}
        </ClipboardBtnTw>
    )
}

export const ClipboardBtnTw = tw.span`
    underline-text
    cursor-pointer
`

export default ClipBoardBtn
