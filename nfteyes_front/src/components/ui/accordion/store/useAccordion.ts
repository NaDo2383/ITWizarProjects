import React from 'react'

function useAccordion() {
    function handleKeyDown(event: React.KeyboardEvent<HTMLElement | HTMLButtonElement>, callback: () => any) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            callback()
        }
    }
    return {
        handleKeyDown,
    }
}

export default useAccordion
