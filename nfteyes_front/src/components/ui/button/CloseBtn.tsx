import React from 'react'
import { GhostBtn } from './Button'
import Image from 'next/image'

// children?: React.ReactNode;
// size?: string | number;
// color?: string;
// title?: string;

type TCloseBtn = Pick<TButton, 'onClick'>

function CloseBtn({ onClick }: TCloseBtn) {
    return (
        <GhostBtn onClick={onClick}>
            <Image src={'/images/icons/Close.svg'} width={13} height={13} alt="close icon" />
        </GhostBtn>
    )
}

export default CloseBtn
