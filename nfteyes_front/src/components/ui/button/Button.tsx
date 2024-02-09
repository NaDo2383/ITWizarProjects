/**
 * @createdBy Phill Anderson 2022/11/15
 */
import React from 'react'
import tw from 'tailwind-styled-components'
import { IButton } from './_interface'

export function Button(props: IButton) {
    const { onClick, children, isLoading, className } = props
    return (
        <button className={className ?? ''} onClick={onClick}>
            {isLoading ? 'Loading ...' : children}
        </button>
    )
}

export function OutlineBtn(props: IButton) {
    const { onClick, children, isLoading, className } = props
    return (
        <button className={`outline-btn ${className}`} onClick={onClick}>
            {isLoading ? 'Loading ...' : children}
        </button>
    )
}
export const PrimaryButton = tw.button`
    bg-purple
`

export const SecondaryButton = tw.button`
    bg-blackPurple
    hover:bg-rebacaPurple
`

export const BlueBtnTw = tw.button`
  bg-blueSoft
`

export const RedBtnTw = tw.button`
  bg-red-300
`

export const GreenBtnTw = tw.button`
  bg-green
`

export const GrayBtntw = tw.button`
  text-aspalt
   bg-gray-100 
   hover:bg-gray-300
`

export function GhostBtn(props: IButton) {
    const { onClick, children } = props

    return (
        <button onClick={onClick} className="ghost-btn">
            {children}
        </button>
    )
}
