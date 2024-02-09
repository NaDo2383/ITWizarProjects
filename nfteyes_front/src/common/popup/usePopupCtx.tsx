import React, { createContext, useState, useContext, FC, Suspense } from 'react'
import { POPUP_COMPONENTS, POPUP_TYPE } from './popupRegistration'
interface ModalProps {
    popupType: string | null
    popupProps: { popupType: string; popupProps: any }[]
}

interface IPopupCtx {
    store: ModalProps
    showPopup: (popupType: string, popupProps?: any) => void
    hidePopup: () => void
    hideAllPopups: () => void
    popupHistory: string[]
    popupState?: any
    setPopupState?: (state: any) => void
}

const PopupCtx = createContext<IPopupCtx>({} as IPopupCtx)

const PopupProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [store, setStore] = useState<ModalProps>({
        popupType: null,
        popupProps: [],
    })
    const { popupType, popupProps } = store
    const [popupHistory, setPopupHistory] = useState<string[]>([])
    const [popupState, setPopupState] = useState(null)
    if (popupType && process.env.mode !== 'production') {
        console.log(`${popupType} нэртэй popup харагдаж байна.`)
    }

    const showPopup = (popupType: POPUP_TYPE, popupProps?: any): void => {
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

    const hidePopup = () => {
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
    const hideAllPopups = () => {
        setStore({ ...store, popupType: null, popupProps: [] })
        setPopupHistory([])
    }

    const renderComponent = () => {
        if (popupType) {
            const PopupComponent = POPUP_COMPONENTS[popupType]
            return <PopupComponent id="global-popup" {...popupProps} />
        }
        return null
    }
    return (
        <PopupCtx.Provider
            value={{
                store,
                showPopup,
                hidePopup,
                hideAllPopups,
                popupHistory,
                popupState,
                setPopupState,
            }}
        >
            <Suspense fallback={<div>Loading ...</div>}>{renderComponent()}</Suspense>
            {children}
        </PopupCtx.Provider>
    )
}

const usePopupCtx = () => useContext(PopupCtx)

export { PopupCtx, PopupProvider, usePopupCtx }
