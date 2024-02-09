export const parseToken = (token: any) => {
    let parsedToken
    try {
        if (token) {
            parsedToken = JSON.parse(atob(token.split('.')[1]))
        }
        return parsedToken
    } catch (e: any) {
        throw new Error(e)
    }
}

export const isTokenExpired = (token: any): boolean => {
    if (token) {
        if (token.exp * 1000 < Date.now()) {
            return true
        }
    }
    return false
}
