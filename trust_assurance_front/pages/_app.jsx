import Preloader from "@/components/ui/loader/Preloader"
import { useEffect, useState } from "react"
// import 'swiper/css';
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import 'swiper/css/free-mode';
import AddClassBody from "@/components/templateElements/AddClassBody"
import "/public/assets/css/style.css"
import "/public/assets/css/responsive.css"
import "styles/globals.css"
import { MetaMaskContextProvider } from "@/common/metamask/useMetamaskCtx"
import { GlobalProvider } from "@/common/global/useGlobalCtx"
import { PopupProvider } from "@/common/popup/usePopupCtx"
import { GlobalPopupProvider } from "@/common/popup/useGlobalPopupCtx"
import useUrl from "@/common/url/useUrl"
import Layout from "@/components/layout/Layout"
import { UserProvider } from '@/features/user/useUserCtx'
import Loading from "@/components/ui/loader/Loading"

function MyApp({ Component, pageProps }) {

    const [loading, setLoading] = useState(true)
    const { isNoLayoutPage } = useUrl()
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)

    }, [])
    return (<>
        {!loading ? (
            <MetaMaskContextProvider>
                <GlobalProvider>
                    <GlobalPopupProvider>
                        <UserProvider>
                            {
                                isNoLayoutPage ?
                                    <Component  {...pageProps} />
                                    :
                                    <>
                                        <AddClassBody />

                                        <Layout>
                                            <Component {...pageProps} />
                                        </Layout>
                                    </>
                            }
                        </UserProvider>
                    </GlobalPopupProvider>
                </GlobalProvider>
            </MetaMaskContextProvider>
        ) : (
            <Preloader />
        )}
    </>)
}

export default MyApp
