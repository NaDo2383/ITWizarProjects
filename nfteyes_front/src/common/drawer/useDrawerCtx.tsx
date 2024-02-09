import React, { createContext, useState, useContext } from 'react'

export const DRAWER_TYPES = {
    EXAMPLE1: 'EXAMPLE1',
    EXAMPLE2: 'EXAMPLE2',
} as const

type TDRAWER_TYPE = keyof typeof DRAWER_TYPES

interface IPayload {
    drawerType: TDRAWER_TYPE
    state?: any
    callback?: () => void
}

interface IDrawerCtx {
    drawerType: TDRAWER_TYPE | null
    setDrawerType: React.Dispatch<React.SetStateAction<TDRAWER_TYPE | null>>
    isDrawerOpen: boolean
    setIsDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>
    drawerState: any
    setDrawerState?: React.Dispatch<React.SetStateAction<any>>
    toggleDrawer: () => void
    showDrawer: (payload: IPayload) => void
    closeDrawer: () => void
    callBackState: any
}

const DrawerCtx = createContext<IDrawerCtx>({} as IDrawerCtx)

function DrawerProvider({ children }: { children: React.ReactNode }) {
    const [drawerType, setDrawerType] = useState<TDRAWER_TYPE | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [drawerState, setDrawerState] = useState(null)
    const [callBackState, setCallbackState] = useState<any>()

    function toggleDrawer() {
        setIsDrawerOpen((prev) => !prev)
    }

    function closeDrawer() {
        setIsDrawerOpen(false)
    }

    function showDrawer(payload: IPayload) {
        setDrawerType(payload?.drawerType)
        toggleDrawer()
        setDrawerState(payload?.state)
        payload.callback && setCallbackState(payload.callback)
    }

    return (
        <DrawerCtx.Provider
            value={{
                drawerType,
                drawerState,
                isDrawerOpen,
                setDrawerType,
                toggleDrawer,
                closeDrawer,
                showDrawer,
                callBackState,
            }}
        >
            {children}
        </DrawerCtx.Provider>
    )
}

const useDrawerCtx = () => useContext(DrawerCtx)

export { DrawerProvider, useDrawerCtx }
