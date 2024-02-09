import { useEffect, useState } from "react"
import BackToTop from '../templateElements/BackToTop'
import Breadcrumb from './Breadcrumb'
import PageHead from './PageHead'
import Footer1 from './footer/Footer1'
import Header from "./header/Header"
import { useMetamaskCtx } from "@/common/metamask/useMetamaskCtx"
import useJwtAuth from "@/features/user/auth/useJwtAuth"
import { useGlobalCtx } from "@/common/global/useGlobalCtx"
import Loading from "../ui/loader/Loading"


export default function Layout({ headerStyle, footerStyle, headTitle, breadcrumbTitle, children, pageCls }) {
    const [scroll, setScroll] = useState(0)
    // Moblile Menu
    const [isMobileMenu, setMobileMenu] = useState(false)
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu)


    useEffect(() => {
        const WOW = require('wowjs')
        window.wow = new WOW.WOW({
            live: false
        })
        window.wow.init()

        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
        // document.querySelector("body").classList.add("body")
    }, [])

    return (
        <>
            <PageHead />
            <div id="wrapper">
                <Loading />
                <div id="page" className={`pt-40 ${pageCls ? pageCls : ""}`}>
                    <Header scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
                    {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
                    <div id="LoayoutChild">
                        {children}
                    </div>
                    <Footer1 />
                </div>
            </div>
            <BackToTop />

        </>
    )
}
