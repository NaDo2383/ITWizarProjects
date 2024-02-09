import React, { useState } from 'react'
import InputSearch from '../../form/elements/input/InputSearch'

function TableHeader() {
    const [value, setValue] = useState<string>('')
    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('search', e.target.value)
        setValue(e.target.value)
    }

    return (
        <div>
            <InputSearch
                name={'example-table-search'}
                onChange={handleSearch}
                placeholder="search something"
                value={value}
            />
        </div>
    )
}

export default TableHeader
