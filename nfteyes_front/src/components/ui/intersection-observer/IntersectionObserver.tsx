import React, { useEffect, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { IntersectionProvider } from './useIntersectionCtx'

interface IIntersectionObserver {
    children: React.ReactNode
    reset?: boolean
}
export const IntersectionObserver = ({ children, reset = false }: IIntersectionObserver) => {
    // eslint-disable-next-line
    const [inView, setInView] = useState(false)
    const intersectionRef = React.useRef(null)
    const intersection = useIntersectionObserver(intersectionRef, {
        threshold: 0,
    })

    useEffect(() => {
        const inViewNow = intersection && intersection.intersectionRatio > 0
        if (inViewNow) {
            return setInView(inViewNow)
        } else if (reset) {
            return setInView(false)
        }
    }, [intersection, reset])

    return (
        <IntersectionProvider>
            <div ref={intersectionRef}>{children}</div>
        </IntersectionProvider>
    )
}
