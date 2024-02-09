import React from 'react'
import EmptyState from './EmptyState'

function FilteredData() {
    const isEmpty = true
    if (isEmpty) {
        return <EmptyState showReset />
    }
    return <div className="auto-grid"></div>
}

export default FilteredData
