export function getLocal(storageName) {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(storageName)
        const retVal = item ? JSON.parse(item) : null
        return retVal
    }
    return null
}

export function setLocal(storageName, item) {
    const parsedItem = JSON.stringify(item)
    typeof window !== 'undefined' && localStorage.setItem(storageName, parsedItem)
}
