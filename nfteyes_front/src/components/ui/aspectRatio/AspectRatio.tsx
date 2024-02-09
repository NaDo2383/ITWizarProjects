import React, { ReactNode } from 'react'
import tw from 'tailwind-styled-components'
interface IAspectRatio {
    ratio: 'square' | 'video'
    children: ReactNode
}
const AspectRatio = ({ ratio, children }: IAspectRatio) => <AspectRatioTw ratio={ratio}>{children}</AspectRatioTw>

const AspectRatioTw = tw.div<{ ratio: 'square' | 'video' }>`
 ${(p) => `
    overflow-hidden 
    rounded-md 
    shadow-[0_1px_5px]
    ${p.ratio === 'square' && 'aspect-square'}
    ${p.ratio === 'video' && 'aspect-video'}
  `}
`

export default AspectRatio
