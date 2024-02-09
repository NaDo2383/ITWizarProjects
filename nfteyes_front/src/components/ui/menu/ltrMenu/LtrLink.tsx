import React from 'react'
import tw from 'tailwind-styled-components'

interface ILtrBtn extends TButton {}

function LtrLink({ text, onClick }: ILtrBtn) {
    return <LtrBtn onClick={onClick}>{text}</LtrBtn>
}
const LtrBtn = tw.button`
    min-w-[100px]
`
export default LtrLink
