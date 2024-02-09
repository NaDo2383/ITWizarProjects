/**
 * @createdBy Phill Anderson 2022/02/27
 */
import { useAdminGlobalCtx } from 'common/global/useAdminGlobalCtx'
import { useRouter } from 'next/router'
import React, { useEffect, useState, RefObject } from 'react'
import { debounce } from 'libs/utils/timer'
import { useSiteGlobalCtx } from '../global/useSiteGlobalCtx'
interface ClientRect {
    top: number | null
    bottom: number | null
    left: number | null
    right: number | null
}

interface Offsets {
    offsetHeight: number | null
    offsetLeft: number | null
    offsetTop: number | null
    offsetWidth: number | null
}

interface ClientData {
    clientHeight: number | null
    clientWidth: number | null
    clientLeft: number | null
}

interface RefObjectData {
    clientRect: ClientRect
    offsets: Offsets
    clientData: ClientData
}

interface PositionRect {
    top: number | null
    bottom: number | null
    left: number | null
    right: number | null
    elementName: string | null
}

interface PositionOffset {
    offsetHeight: number | null
    offsetLeft: number | null
    offsetTop: number | null
    offsetWidth: number | null
    elementName: string | null
}

function useElementPosition(
    refObject: RefObject<HTMLElement> | null,
    options: { globalName?: string; isAdminSide?: boolean } = {}
) {
    const { globalName, isAdminSide } = options
    const { locale } = useRouter()
    const { setAdminGlobalItems } = useAdminGlobalCtx()
    const { setSiteGlobalItems } = useSiteGlobalCtx()

    const [refObjectData, setRefObjectData] = useState<RefObjectData>({
        clientRect: {
            top: null,
            bottom: null,
            left: null,
            right: null,
        },
        offsets: {
            offsetHeight: null,
            offsetLeft: null,
            offsetTop: null,
            offsetWidth: null,
        },
        clientData: {
            clientHeight: null,
            clientWidth: null,
            clientLeft: null,
        },
    })
    const [positionRect, setPositionRect] = useState<PositionRect>({
        top: null,
        bottom: null,
        left: null,
        right: null,
        elementName: null,
    })

    const [positionOffset, setPositionOffset] = useState<PositionOffset>({
        offsetHeight: null,
        offsetLeft: null,
        offsetTop: null,
        offsetWidth: null,
        elementName: null,
    })

    function handleElPosition(e: React.MouseEvent<HTMLElement>) {
        const elementName = e.currentTarget.innerText
        const { top, left, bottom, right } = e.currentTarget.getBoundingClientRect()
        setPositionRect((prev) => ({
            ...prev,
            top,
            left,
            bottom,
            right,
            elementName,
        }))

        const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = e.currentTarget
        setPositionOffset((prev) => ({
            ...prev,
            offsetHeight,
            offsetLeft,
            offsetTop,
            offsetWidth,
            elementName,
        }))
    }

    function handleDataGenerate() {
        if (refObject?.current) {
            const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = refObject.current
            const { top, left, bottom, right } = refObject.current.getBoundingClientRect()

            setRefObjectData((prev: any) => ({
                ...prev,
                clientRect: {
                    top,
                    left,
                    bottom,
                    right,
                },
                offsets: {
                    offsetHeight: offsetHeight || 0,
                    offsetLeft,
                    offsetTop,
                    offsetWidth,
                },
                clientData: {
                    clientHeight: refObject.current!.clientHeight,
                    clientWidth: refObject.current!.clientWidth,
                    clientLeft: refObject.current!.clientLeft,
                },
            }))

            if (globalName) {
                if (isAdminSide) {
                    // set admin GlobalItems:
                    setAdminGlobalItems((prev: any) => ({
                        ...prev,
                        [globalName]: {
                            clientRect: {
                                top: Math.abs(top),
                                left: Math.abs(left),
                                bottom: Math.abs(bottom),
                                right: Math.abs(right),
                            },
                            offsets: {
                                offsetHeight,
                                offsetLeft,
                                offsetTop,
                                offsetWidth,
                            },
                            clientData: {
                                clientHeight: refObject.current?.clientHeight,
                                clientWidth: refObject.current?.clientWidth,
                                clientLeft: refObject.current?.clientLeft,
                            },
                        },
                    }))
                } else {
                    // set site GlobalItems:
                    if (typeof setSiteGlobalItems === 'function') {
                        setSiteGlobalItems((prev: any) => ({
                            ...prev,
                            [globalName]: {
                                clientRect: {
                                    top,
                                    left,
                                    bottom,
                                    right,
                                },
                                offsets: {
                                    offsetHeight,
                                    offsetLeft,
                                    offsetTop,
                                    offsetWidth,
                                },
                                clientData: {
                                    clientHeight: refObject.current?.clientHeight,
                                    clientWidth: refObject.current?.clientWidth,
                                    clientLeft: refObject.current?.clientLeft,
                                },
                            },
                        }))
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (refObject?.current) {
            const domObject = refObject.current
            const debouncedDataGenerate = debounce(() => handleDataGenerate(), 500)
            handleDataGenerate()

            window.addEventListener('resize', debouncedDataGenerate)
            domObject.addEventListener('scroll', debouncedDataGenerate)

            return () => {
                window.removeEventListener('resize', debouncedDataGenerate)
                domObject.removeEventListener('scroll', debouncedDataGenerate)
            }
        }
    }, [locale])

    return {
        handleElPosition,
        positionRect,
        positionOffset,
        refObjectData,
        setRefObjectData,
    }
}

export default useElementPosition
