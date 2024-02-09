function useAccordion() {
    function handleKeyDown(event, callback) {
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
