export function getSession<T>(key: string): T | null {
    try {
        const serializedValue = sessionStorage.getItem(key)
        if (serializedValue === null) {
            return null
        }
        const parsedValue = JSON.parse(serializedValue) as T
        return parsedValue
    } catch (error) {
        console.error('Error getting session:', error)
        return null
    }
}

export function setSession(key: string, value: unknown) {
    try {
        const serializedValue = JSON.stringify(value)
        sessionStorage.setItem(key, serializedValue)
    } catch (error) {
        console.error('Error setting session:', error)
    }
}
