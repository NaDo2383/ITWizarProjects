import React, { useRef } from 'react'
import tw from 'tailwind-styled-components'
import { useOnClickOutside } from 'usehooks-ts'
interface IDropdown extends JsxChildren {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

function Dropdown(props: IDropdown) {
    const { children, isShow, setIsShow } = props
    const ref = useRef<HTMLDivElement>(null)
    useOnClickOutside(ref, () => setIsShow(false))

    return (
        <DropPanel ref={ref} isshow={isShow.toString()}>
            {children}
        </DropPanel>
    )
}

interface IDropPanel extends React.HTMLProps<HTMLDivElement> {
    isshow: string
}
const DropPanel = tw.div<IDropPanel>`
    py-5
    transition
    absolute
    z-[99999]
    ${(p) => {
        if (p.isshow === 'true') {
            return 'block opacity-1 h-auto'
        }
        return 'hidden opacity-0 h-0'
    }}
`

export default Dropdown
