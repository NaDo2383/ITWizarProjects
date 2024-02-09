import React from 'react'
import GhostBtn from './GhostBtn'
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs'

export function PlussBtn({ onClick }) {
    return (
        <GhostBtn>
            <BsPlusCircle fontSize={30} color="#8358ff" onClick={onClick} />
        </GhostBtn>
    )
}

export function MinusBtn({ onClick }) {
    return (
        <GhostBtn>
            <BsDashCircle fontSize={30} color="#8358ff" onClick={onClick} />
        </GhostBtn>
    )
}
