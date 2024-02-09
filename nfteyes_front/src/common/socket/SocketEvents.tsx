import React from 'react'

interface ISocketEvents {
    events: string[]
}

function SocketEvents({ events }: ISocketEvents) {
    return (
        <ul>
            {events.map((event: string, index: number) => (
                <li key={index}>{event}</li>
            ))}
        </ul>
    )
}

export default SocketEvents
