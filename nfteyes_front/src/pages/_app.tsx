import useUrl from 'common/url/useUrl'
import type { AppProps } from 'next/app'
import { GlobalPopupProvider } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { ThemeProvider } from 'common/theme/themeProvider'
import SiteLayout from 'components/layouts/site/SiteLayout'
import AdminLayout from 'components/layouts/admin/AdminLayout'
import { SiteGlobalProvider } from 'common/global/useSiteGlobalCtx'
import { AdminGlobalProvider } from 'common/global/useAdminGlobalCtx'
import { MetaMaskContextProvider } from 'common/metamask/useMetamaskCtx'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'styles/globals.css'
import GlobalLoading from 'components/ui/loader/GlobalLoading'
import { DrawerProvider } from 'common/drawer/useDrawerCtx'
import Drawer from 'common/drawer/Drawer'
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    const { isAdminSite } = useUrl()

    return (
        <ThemeProvider>
            <MetaMaskContextProvider>
                {isAdminSite ? (
                    <AdminGlobalProvider>
                        <GlobalPopupProvider>
                            <AdminLayout>
                                <Component {...pageProps} />
                            </AdminLayout>
                        </GlobalPopupProvider>
                    </AdminGlobalProvider>
                ) : (
                    <QueryClientProvider client={queryClient}>
                        <SiteGlobalProvider>
                            <GlobalPopupProvider>
                                <GlobalLoading />
                                <DrawerProvider>
                                    <Drawer />
                                    <SiteLayout>
                                        <Component {...pageProps} />
                                    </SiteLayout>
                                </DrawerProvider>
                            </GlobalPopupProvider>
                        </SiteGlobalProvider>
                        {/* <ReactQueryDevtools initialIsOpen /> */}
                    </QueryClientProvider>
                )}
            </MetaMaskContextProvider>
        </ThemeProvider>
    )
}
