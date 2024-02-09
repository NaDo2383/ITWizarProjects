import GoogleAnalytics from '@bradgarropy/next-google-analytics'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'
import { GlobalProvider } from 'common/global/useGlobalContext'
import { MetaMaskProvider } from 'common/metamask/useMetamaskContext'
import { GlobalModalProvider } from 'Components/ui/popup/useModalcontext'
import Layout from 'Components/layouts/Layout'
import ko from 'locale/lang/ko.json'
import en from 'locale/lang/en.json'
import "utils/folyfill"
import 'styles/globals.css'
import 'swiper/css'
import { ServiceInfoProvider } from 'Components/entities/serviceInfo/useServiceInfoContext'

const messages = {
    ko,
    en,
}

function MyApp({ Component, pageProps }) {
    const { locale } = useRouter()

    return (
        <IntlProvider messages={messages[locale]} locale={locale}>
            <GlobalProvider>
                <MetaMaskProvider>
                    <GlobalModalProvider>
                        <ServiceInfoProvider>
                            <GoogleAnalytics
                                measurementId={
                                    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
                                }
                                strategy="lazyOnload"
                            />
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </ServiceInfoProvider>
                    </GlobalModalProvider>
                </MetaMaskProvider>
            </GlobalProvider>
        </IntlProvider>
    )
}

export default MyApp
