import React from 'react'
import FilterMenu from 'components/ui/menu/filterMenu/FilterMenu'
import FilteredData from './FilteredData'

function FilterMenuUi() {
    return (
        <div>
            <FilterMenu />
            <FilteredData />
        </div>
    )
}

export default FilterMenuUi
