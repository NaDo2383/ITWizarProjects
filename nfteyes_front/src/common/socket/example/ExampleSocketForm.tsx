import React, { FormEvent, useState } from 'react'
import { useSocketCtx } from '../useSocketCtx'
import useExampleSocket from './useExampleSocket'

function ExampleSocketForm() {
    const { exampleEvents } = useExampleSocket()
    const { socket } = useSocketCtx()
    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    console.log('exampleEvents', exampleEvents)

    function onSubmit(event: FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        socket.timeout(5000).emit('user:create', value, (response: any) => {
            console.log(response)
            setIsLoading(false)
        })
    }
    return (
        <form onSubmit={onSubmit}>
            <input onChange={(e) => setValue(e.target.value)} />
            <button type="submit" disabled={isLoading}>
                Submit
            </button>
        </form>
    )
}

export default ExampleSocketForm
