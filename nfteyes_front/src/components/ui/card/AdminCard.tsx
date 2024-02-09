import React from 'react'
import Card from './Card'
import { BlueBtnTw } from '../button/Button'
import Link from 'next/link'
import { excrept } from 'libs/utils/string'
import BlurImg from '../image/BlurImg'

function AdminCard() {
    return (
        <Card>
            <Link href="/">
                <BlurImg src={'/images/demo-image.png'} width={1200} height={250} alt="this is alt" />
            </Link>
            <Card.Body>
                <h4>This is admin card title</h4>
                <p>
                    {excrept(
                        ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero molestias, facere itaque odio a optio repellat eveniet atque labore, illo adipisci, ut quidem dolore est consequuntur repellendus harum. Mollitia, maiores?',
                        100
                    )}
                </p>
                <BlueBtnTw>click me</BlueBtnTw>
            </Card.Body>
        </Card>
    )
}

export default AdminCard
