import React from 'react'
import tw from 'tailwind-styled-components'

export function Wrapper({ children }: JsxChildren) {
    return <div className="wrapper">{children}</div>
}

export const SmallWrapper = tw.div`
    small-wrapper
`

export const SemiSmallWrapper = tw.div`
    semi-small-wrapper
`

export const MediumWrapper = tw.div`
    medium-wrapper
`

export const Rounded = tw.div`
    rounded-md
    overflow-hidden
`
