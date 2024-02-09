import React from 'react'
import { IFilterMenu, filterMenus } from './filterMenus'
import FilterMenuItem from './FilterMenuItem'

function FilterMenu() {
    return (
        <div className="flex gap-10 flex-wrap pb-20 justify-center border-b border-gray-300">
            {filterMenus.map((menu: IFilterMenu, idx: number) => (
                <FilterMenuItem key={'filter-menu-' + idx} {...menu} />
            ))}
        </div>
    )
}

export default FilterMenu
