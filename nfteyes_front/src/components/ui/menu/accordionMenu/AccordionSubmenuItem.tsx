import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import tw from 'tailwind-styled-components'
import { IParentMenu } from './AccordionSubMenu'

interface IAccSubMenuItem {
    submenuName: string
    parentMenu: IParentMenu
}

function AccordionSubmenuItem({ submenuName, parentMenu }: IAccSubMenuItem) {
    const router = useRouter()
    const params = useSearchParams()

    function handleOnclick() {
        let currentQuery: any = {}
        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            parentMenu: decodeURIComponent(parentMenu.menuName),
            category: submenuName,
        }

        if (params?.get('category') === submenuName) {
            delete updatedQuery.category
        }
        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true }
        )

        router.push(url)
    }

    return <AccSubmenuItem onClick={handleOnclick}>{submenuName}</AccSubmenuItem>
}

const AccSubmenuItem = tw.button`
    text-left
    bg-transparent
`

export default AccordionSubmenuItem
