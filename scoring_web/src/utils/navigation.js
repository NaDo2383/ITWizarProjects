// NextJS Requirement
export const isWindowAvailable = () => typeof window !== "undefined"

export const findCurrentRoute = (routes, pathname) => {
    if (!isWindowAvailable()) return null

    for (let route of routes) {
        if (!!route.items) {
            const found = findCurrentRoute(route.items, pathname)
            if (!!found) return found
        }
        if (pathname?.match(route.path) && route) return route
    }
}

export const getActiveRoute = (routes, pathname) => {
    const route = findCurrentRoute(routes, pathname)
    return route?.name || "Main Dashboard"
}

export const getActiveNavbar = (routes, pathname) => {
    const route = findCurrentRoute(routes, pathname)
    return route?.secondary
}

export const getActiveNavbarText = (routes, pathname) => {
    return getActiveRoute(routes, pathname) || false
}
