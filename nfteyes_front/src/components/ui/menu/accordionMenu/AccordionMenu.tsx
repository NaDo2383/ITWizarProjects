import React from 'react'
import Accordion from '../../accordion/Accordion'
import AccordionMenuItem from './AccordionMenuItem'

export type TAccSubMenu = {
    id: number
    submenuName: string
    link: string
}

export type TAccMenu = {
    id: number
    menuName: string
    submenu: TAccSubMenu[]
}

const accordionMenuItems: TAccMenu[] = [
    {
        id: 1,
        menuName: 'Хүүхдийн хувцас',
        submenu: [
            {
                id: 1,
                submenuName: 'өмд',
                link: '?submenu=omd',
            },
            {
                id: 2,
                submenuName: 'цамц',
                link: '?submenu=tsamts',
            },
            {
                id: 3,
                submenuName: 'малгай',
                link: '?submenu=malgai',
            },
            {
                id: 3,
                submenuName: 'бэлэн хувцас',
                link: '?submenu=malgai',
            },
        ],
    },
    {
        id: 2,
        menuName: 'Эмэгтэй хувцас',
        submenu: [
            {
                id: 1,
                submenuName: 'өмд',
                link: '?submenu=omd',
            },
            {
                id: 2,
                submenuName: 'цамц',
                link: '?submenu=tsamts',
            },
            {
                id: 3,
                submenuName: 'малгай',
                link: '?submenu=malgai',
            },
        ],
    },
    {
        id: 3,
        menuName: 'Эрэгтэй хувцас',
        submenu: [
            {
                id: 1,
                submenuName: 'өмд',
                link: '?submenu=omd',
            },
            {
                id: 2,
                submenuName: 'цамц',
                link: '?submenu=tsamts',
            },
            {
                id: 3,
                submenuName: 'малгай',
                link: '?submenu=malgai',
            },
        ],
    },
]

function AccordionMenu() {
    return (
        <Accordion>
            <div className="flex flex-col">
                {accordionMenuItems.map((menu, idx) => (
                    <AccordionMenuItem key={'acc-menu-item' + idx} onClick={() => {}} {...menu} />
                ))}
            </div>
        </Accordion>
    )
}

export default AccordionMenu
