import { useEffect, useState } from 'react'
import { socket } from '../socket'
function useExampleSocket() {
    const [exampleEvents, setExampleEvents] = useState<string[]>([])

    function onExampleEvent(value: string) {
        setExampleEvents((prev: string[]) => [...prev, value])
    }

    useEffect(() => {
        socket.on('hello', onExampleEvent)
        return () => {
            socket.off('hello', onExampleEvent)
        }
    }, [exampleEvents])
    return {
        exampleEvents,
    }
}

export default useExampleSocket
