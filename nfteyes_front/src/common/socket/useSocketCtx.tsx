import React, { createContext, useState, useContext, FC, useEffect } from 'react'
import { socket, Socket } from './socket'

interface ISocketCtx {
    socket: Socket
    isConnected: boolean
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
    connectSocket: () => void
    disconnectSocket: () => void
}

const SocketContext = createContext<ISocketCtx>({} as ISocketCtx)

const SocketProvider: FC<JsxChildren> = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected)

    function connectSocket() {
        socket.connect()
    }
    function disconnectSocket() {
        socket.disconnect()
    }

    function onConnect() {
        console.log('socket service - тэй холбогдлоо')
        setIsConnected(true)
    }

    function onDisconnect() {
        setIsConnected(false)
    }

    useEffect(() => {
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [])
    return (
        <SocketContext.Provider
            value={{
                socket,
                isConnected,
                setIsConnected,
                connectSocket,
                disconnectSocket,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

const useSocketCtx = () => {
    const context = useContext(SocketContext)
    if (!context) throw new Error('useSocketCtx must be used within a SocketProvider')
    return context
}

export { SocketContext, SocketProvider, useSocketCtx, socket }
