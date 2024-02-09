import React from 'react'
import tw from 'tailwind-styled-components'
interface ICard extends JsxChildren {}
function Card(props: ICard) {
    const { children } = props
    return <CardTw>{children}</CardTw>
}

const CardTw = tw.div`
    h-fit
    border
    rounded-md
    overflow-hidden
`

Card.Body = (props: ICard) => {
    const { children } = props
    return <CardBodyTw>{children}</CardBodyTw>
}

const CardBodyTw = tw.div`
    p-8
`

export default Card
