import React from 'react'
import { TAccSubMenu } from './AccordionMenu'
import tw from 'tailwind-styled-components'
// import useUrl from 'common/url/useUrl'

import AccordionSubmenuItem from './AccordionSubmenuItem'

export interface IParentMenu {
    id: number
    menuName: string
}
interface IAccMenu {
    submenu: TAccSubMenu[]
    parentMenu: IParentMenu
}
function AccordionSubMenu(props: IAccMenu) {
    const { submenu, parentMenu } = props
    // const { setQueryString } = useUrl()

    return (
        <AccSubmenuContainer>
            {submenu.map((submenu, idx) => {
                const { submenuName } = submenu
                return (
                    <AccordionSubmenuItem
                        key={'acc-sub-menu-' + `-${submenuName}-` + idx}
                        submenuName={submenuName}
                        parentMenu={parentMenu}
                    />
                )
            })}
        </AccSubmenuContainer>
    )
}

const AccSubmenuContainer = tw.div`
    flex
    flex-col
`

export default AccordionSubMenu
