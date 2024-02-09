import React from 'react'
import SiteHeader from './siteHeader/SiteHeader'
import SiteMain from './siteMain/SiteMain'
import { PopupProvider } from 'common/popup/usePopupCtx'
// import SiteNavbar from './siteNavbar/SiteNavbar'
// import { JsxChildren } from 'common/types/common'
interface ISiteLayout extends JsxChildren {}

function SiteLayout(props: ISiteLayout) {
    const { children } = props
    return (
        <>
            <PopupProvider>
                <SiteHeader />
            </PopupProvider>
            <SiteMain>{children}</SiteMain>
        </>
    )
}

export default SiteLayout
