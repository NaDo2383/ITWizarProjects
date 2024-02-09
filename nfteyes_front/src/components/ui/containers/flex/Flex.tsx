/**
 * @createdBy Phill Anderson 2022/11/16
 */
import React from 'react'
import { IFlex } from './_interface'

function Flex(props: IFlex) {
    const { children, className } = props

    return <div className={`flex ${className}`}>{children}</div>
}

export default Flex
