import React, { useEffect } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import useWeb3 from 'a/common/web3/useWeb3'

function Layout({ children }) {
    const { globalItems } = useGlobalCtx()
    const headerHeight = globalItems?.header?.clientData?.clientHeight
    const { instanceWeb3 } = useWeb3()

    useEffect(() => {
        instanceWeb3()
    }, [])

    return (
        <>
            <Header />
            <main style={{ paddingTop: `${headerHeight}px` }}>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
