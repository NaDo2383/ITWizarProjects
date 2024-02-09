import React from 'react'
import { IFilterMenu } from './filterMenus'
import tw from 'tailwind-styled-components'
function FilterMenuItem(props: IFilterMenu) {
    const { label, icon: Icon } = props
    return (
        <PerMenu>
            <Icon className="cursor-pointer" fontSize={30} />
            <span className="text-white">{label}</span>
        </PerMenu>
    )
}

const PerMenu = tw.button`
    flex
    flex-col
    gap-10
    justify-center
    items-center
    w-80
`

export default FilterMenuItem
