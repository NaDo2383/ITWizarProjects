import React from 'react'
interface ISiteMain extends JsxChildren {}

function SiteMain(props: ISiteMain) {
    const { children } = props
    return <main className="site-main">{children}</main>
}

export default SiteMain
