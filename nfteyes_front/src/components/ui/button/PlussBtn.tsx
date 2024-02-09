import React from 'react'
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs'
import { GhostBtn } from './Button'
export function PlussBtn(props: TButton) {
    const { onClick } = props
    return (
        <GhostBtn onClick={onClick}>
            <BsPlusCircle fontSize={30} color={'var(--green)'} />
        </GhostBtn>
    )
}

export function MinusBtn(props: TButton) {
    const { onClick } = props
    return (
        <GhostBtn onClick={onClick}>
            <BsDashCircle fontSize={30} color={'var(--green)'} onClick={onClick} />
        </GhostBtn>
    )
}
