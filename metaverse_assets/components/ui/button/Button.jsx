import React from 'react'
import tw from 'tailwind-styled-components'
function Button({ children, onClick, fontSize, disabled, isLoading, width }) {
    const style = {
        width: width ? `${width}px` : '100%',
        fontSize: fontSize && `${fontSize}px`,
        overflow: 'hidden',
        cursor: `${disabled ? 'not-allowed' : 'pointer'}`,
    }

    return (
        <BtnTw style={style} onClick={onClick} disabled={disabled}>
            {isLoading ? '... Loading' : children}
        </BtnTw>
    )
}

export const BtnTw = tw.button`
    min-w-[100px]
    bg-accent-lighter 
    cursor-default 
    rounded-full 
    py-3 
    px-4 
    text-center 
    text-white 
    sm:text-[16px]
    text-sm
    font-semibold 
    transition-all
`

export const RoundBtn = tw.button`
    border-jacarta-100 
    hover:bg-accent 
    focus:bg-accent 
    group 
    dark:hover:bg-accent 
    flex 
    h-10 
    w-10 
    items-center 
    justify-center 
    rounded-full 
    border 
    bg-white 
    transition-colors 
    hover:border-transparent 
    focus:border-transparent 
    dark:border-transparent 
    dark:bg-white/[.15]
`

export default Button
