import React from 'react'
import { useSocketCtx } from './useSocketCtx'
function ConnectionManager() {
    const { connectSocket, disconnectSocket } = useSocketCtx()

    return (
        <div>
            <button onClick={connectSocket}>Connect</button>
            <button onClick={disconnectSocket}>Disconnect</button>
        </div>
    )
}

export default ConnectionManager
