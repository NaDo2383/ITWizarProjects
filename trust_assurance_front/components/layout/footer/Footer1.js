import LogoIcon from "@/components/ui/icon/LogoIcon"
import Link from "next/link"

export default function Footer1() {
    return (
        <>
            <footer id='footer'>
                <div className='themesflat-container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='footer-content flex flex-grow'>
                                <div className='widget-logo flex-grow flex items-center'>
                                    <div className='logo-footer' id='logo-footer'>
                                        <LogoIcon />
                                    </div>
                                </div>
                                <div className='widget-last'>
                                    <h5 className='title-widget mt-30'>
                                        Join the community
                                    </h5>
                                    <div className='widget-social'>
                                        <ul className='flex'>
                                            <li>
                                                <Link
                                                    href='#'
                                                    className='icon-facebook'
                                                />
                                            </li>
                                            <li>
                                                <Link href='#' className='icon-twitter' />
                                            </li>
                                            <li>
                                                <Link href='#' className='icon-vt' />
                                            </li>
                                            <li>
                                                <Link href='#' className='icon-tiktok' />
                                            </li>
                                            <li>
                                                <Link href='#' className='icon-youtube' />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer-bottom'>
                        <p>© {new Date().getFullYear()} LSWare. All Rights Reserved.</p>
                        <ul className='flex'>
                            <li>
                                <Link href='#'>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href='#'>Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
