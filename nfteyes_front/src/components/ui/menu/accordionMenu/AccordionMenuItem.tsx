import React from 'react'
import tw from 'tailwind-styled-components'
import { TAccMenu } from './AccordionMenu'
import { useAccordionCtx } from '../../accordion/store/useAccordionCtx'
import useAccordion from '../../accordion/store/useAccordion'
import AccordionPanel from '../../accordion/AccordionPanel'
import AccordionSubMenu from './AccordionSubMenu'
interface TAccMenuItem extends TButton, TAccMenu {}
function AccordeionMenuItem(props: TAccMenuItem) {
    const { onClick, id, menuName, submenu } = props
    const { activeAccordionId, setActiveAccordionId } = useAccordionCtx()
    const { handleKeyDown } = useAccordion()
    const isOpen = activeAccordionId === id
    function handleClick() {
        onClick()
        if (isOpen) {
            setActiveAccordionId(null)
        } else {
            setActiveAccordionId(id)
        }
    }
    return (
        <AccMenuItem onKeyDown={(e) => handleKeyDown(e, handleClick)}>
            <label className="cursor-pointer" onClick={handleClick}>
                {menuName}
            </label>
            <AccordionPanel id={id}>
                <AccordionSubMenu submenu={submenu} parentMenu={{ id, menuName }} />
            </AccordionPanel>
        </AccMenuItem>
    )
}

interface IAccMenuItem extends React.HTMLProps<HTMLElement> {}

const AccMenuItem = tw.div<IAccMenuItem>`
  flex
  flex-col
  text-center
  px-10
  bg-emerald-500
`

export default AccordeionMenuItem
