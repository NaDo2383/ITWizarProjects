import { useEffect, useState } from 'react'
import { useMetamaskCtx } from './useMetamaskCtx'

export const MetamaskNavigation = () => {
    const { wallet, hasProvider, connectMetaMask, isMetaMaskLoggedIn, logoutMetaMask } = useMetamaskCtx()
    const [isMetamask, setIsMetamask] = useState<boolean>(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMetamask(window.ethereum?.isMetaMask)
        }
    }, [])

    // console.log('wallet', wallet)
    return (
        <div>
            <div>
                <div>
                    {isMetaMaskLoggedIn && (
                        <a className="text-mauve bg-none text-30 font-tekoRegular" onClick={logoutMetaMask}>
                            SIGN IN
                        </a>
                    )}
                </div>
                <div>
                    {!hasProvider && (
                        <a href="https://metamask.io" target="_blank" rel="noreferrer">
                            Install MetaMask
                        </a>
                    )}
                    {isMetamask && wallet.accounts.length < 1 && (
                        <a className="text-mauve bg-none text-30" onClick={connectMetaMask}>
                            Connect MetaMask
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
