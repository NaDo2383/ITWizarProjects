import 'a/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { MetaMaskProvider } from 'metamask-react'
import { MetaMaskContextProvider } from 'a/common/metamask/useMetamaskCtx'
import useUrl from 'a/common/url/useUrl'
import { GlobalProvider } from 'a/common/global/useGlobalCtx'
import { GlobalPopupProvider } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { UserProvider } from 'a/features/user/useUserCtx'
import Layout from 'a/components/layout/Layout'
import { AssetProvider } from 'a/features/asset/useAssetCtx'
import NextHead from 'a/common/seo/NextHead'

if (typeof window !== 'undefined') {
    require('bootstrap/dist/js/bootstrap')
}

function MyApp({ Component, pageProps }) {
    const { isNoLayoutPage } = useUrl()
    return (
        <MetaMaskContextProvider>
            <MetaMaskProvider>
                <ThemeProvider enableSystem={true} attribute="class">
                    <GlobalProvider>
                        <GlobalPopupProvider>
                            <UserProvider>
                                <AssetProvider>
                                    <NextHead title={'Assets list'} />
                                    {isNoLayoutPage ? (
                                        <Component {...pageProps} />
                                    ) : (
                                        <Layout>
                                            <Component {...pageProps} />
                                        </Layout>
                                    )}
                                </AssetProvider>
                            </UserProvider>
                        </GlobalPopupProvider>
                    </GlobalProvider>
                </ThemeProvider>
            </MetaMaskProvider>
        </MetaMaskContextProvider>
    )
}

export default MyApp
