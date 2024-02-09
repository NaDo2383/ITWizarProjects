import React, { createContext, useState, useContext, FC, Suspense } from 'react'
import { GLOBAL_POPUP_COMPONENTS, GLOBAL_POPUP_TYPE } from './globalPopupRegistration'
interface ModalProps {
    popupType: string | null
    popupProps: { popupType: string; popupProps: any }[]
}

interface IPopupCtx {
    store: ModalProps
    showGlobalPopup: (popupType: string, popupProps?: any) => void
    hideGlobalPopup: () => void
    hideAllGlobalPopups: () => void
    popupHistory: string[]
    globalPopupState: any
    setGlobalPopupState: (state: any) => void
}

const GlobalPopupCtx = createContext<IPopupCtx>({} as IPopupCtx)

const GlobalPopupProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [store, setStore] = useState<ModalProps>({
        popupType: null,
        popupProps: [],
    })
    const { popupType, popupProps } = store
    const [popupHistory, setPopupHistory] = useState<string[]>([])
    const [globalPopupState, setGlobalPopupState] = useState()

    if (popupType && process.env.mode !== 'production') {
        console.log(`${popupType} нэртэй popup харагдаж байна.`)
    }

    const showGlobalPopup = (popupType: GLOBAL_POPUP_TYPE, popupProps?: any): void => {
        const updatedPopupProps = [...store.popupProps, { popupType, popupProps }]
        setStore({
            ...store,
            popupType,
            popupProps: updatedPopupProps,
        })
        const updatedHistory = [...popupHistory, popupType]
        const uniqueArray = new Set(updatedHistory)
        const uniquePopupHistory = Array.from(uniqueArray)
        setPopupHistory(uniquePopupHistory)
    }

    const hideGlobalPopup = () => {
        let currentModal = popupHistory[popupHistory.length - 1]
        const currentModalIndex = popupHistory?.indexOf(currentModal)
        let previousModal = popupHistory[currentModalIndex - 1]

        const history = [...popupHistory]
        const updatedHistory = history.length > 0 ? history.splice(0, history.length - 1) : []
        setPopupHistory([...updatedHistory])

        let hidePopupType = previousModal ?? null

        const copyModalProps = [...store.popupProps]
        const updatedPopupProps = copyModalProps.filter((popupProps) => popupProps.popupType !== popupType)

        if (popupType === hidePopupType) {
            setStore({
                ...store,
                popupType: null,
                popupProps: [...updatedPopupProps],
            })
        } else {
            setStore({
                ...store,
                popupType: hidePopupType,
                popupProps: [...updatedPopupProps],
            })
        }
    }
    const hideAllGlobalPopups = () => {
        setStore({ ...store, popupType: null, popupProps: [] })
        setPopupHistory([])
    }

    const renderComponent = () => {
        if (popupType) {
            const PopupComponent = GLOBAL_POPUP_COMPONENTS[popupType]
            return <PopupComponent id="global-popup" {...popupProps} />
        }
        return null
    }
    return (
        <GlobalPopupCtx.Provider
            value={{
                store,
                showGlobalPopup,
                hideGlobalPopup,
                hideAllGlobalPopups,
                popupHistory,
                globalPopupState,
                setGlobalPopupState,
            }}
        >
            <Suspense fallback={<div>Loading ...</div>}>{renderComponent()}</Suspense>
            {children}
        </GlobalPopupCtx.Provider>
    )
}

const useGlobalPopupCtx = () => useContext(GlobalPopupCtx)

export { GlobalPopupCtx, GlobalPopupProvider, useGlobalPopupCtx }
