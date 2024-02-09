/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance } from './_helpers'
interface IWalletState {
    accounts: any[]
    balance: string
    chainId: string
}
interface IMetaMaskContextData {
    wallet: IWalletState
    hasProvider: boolean | null
    error: boolean
    errorMessage: string
    isConnecting: boolean
    connectMetaMask: () => void
    clearError: () => void
    logoutMetaMask: () => void
    isMetaMaskLoggedIn: boolean
}
const disconnectedState: IWalletState = { accounts: [], balance: '', chainId: '' }
const MetaMaskContext = createContext<IMetaMaskContextData>({} as IMetaMaskContextData)

const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
    const [hasProvider, setHasProvider] = useState<boolean | null>(null)
    const [isConnecting, setIsConnecting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [wallet, setWallet] = useState(disconnectedState)
    const isMetaMaskLoggedIn: boolean = wallet.accounts.length > 0
    const clearError = () => setErrorMessage('')

    // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
    const _updateWallet = useCallback(async (providedAccounts?: any) => {
        const accounts = providedAccounts || (await window.ethereum.request({ method: 'eth_accounts' }))

        if (accounts.length === 0) {
            // If there are no accounts, then the user is disconnected
            setWallet(disconnectedState)
            return
        }

        const balance = formatBalance(
            await window.ethereum.request({
                method: 'eth_getBalance',
                params: [accounts[0], 'latest'],
            })
        )
        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        })

        setWallet({ accounts, balance, chainId })
    }, [])

    const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet])
    const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet])

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            setHasProvider(Boolean(provider))

            if (provider) {
                updateWalletAndAccounts()
                window.ethereum.on('accountsChanged', updateWallet)
                window.ethereum.on('chainChanged', updateWalletAndAccounts)
            }
        }

        getProvider()

        return () => {
            window.ethereum?.removeListener('accountsChanged', updateWallet)
            window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
        }
    }, [updateWallet, updateWalletAndAccounts])

    const connectMetaMask = async () => {
        console.log(window.ethereum)
        setIsConnecting(true)
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            clearError()
            updateWallet(accounts)
        } catch (err: any) {
            setErrorMessage(err.message)
        }
        setIsConnecting(false)
    }

    const logoutMetaMask = async () => {
        try {
            if (window.ethereum) {
                setWallet(disconnectedState)
                await window.ethereum.disconnect()
            }
        } catch (error) {
            console.error('Error logging out', error)
        }
    }

    return (
        <MetaMaskContext.Provider
            value={{
                wallet,
                hasProvider,
                error: !!errorMessage,
                errorMessage,
                isConnecting,
                connectMetaMask,
                clearError,
                logoutMetaMask,
                isMetaMaskLoggedIn,
            }}
        >
            {children}
        </MetaMaskContext.Provider>
    )
}

function useMetamaskCtx() {
    const context = useContext(MetaMaskContext)
    if (context === undefined) {
        throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"')
    }
    return context
}
export { useMetamaskCtx, MetaMaskContextProvider }
