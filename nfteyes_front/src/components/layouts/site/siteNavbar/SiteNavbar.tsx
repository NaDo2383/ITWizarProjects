import { useSiteGlobalCtx } from 'common/global/useSiteGlobalCtx'
import { getCookie, removeCookie } from 'common/storage/cookieStorage'
import { isTokenEnded } from 'common/token/token'
import Dropdown from 'components/ui/dropdown/Dropdown'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SiteNavbarItem from './SiteNavbarItem'
import { IMenuItem } from 'components/layouts/admin/sidebar/AdminSidebar'

function SiteNavbar() {
    const { authState, setAuthState } = useSiteGlobalCtx()
    const [isOpen, setIsOpen] = useState(false)
    const token = typeof window !== 'undefined' && getCookie('access_token')
    const userInfo = typeof window !== 'undefined' && getCookie('nft_eyes_user_info')
    const { push } = useRouter()
    const isTokenEnd = token && isTokenEnded(token)

    function logOut() {
        removeCookie('access_token')
        removeCookie('nft_eyes_user_info')
        setAuthState(null)
    }

    useEffect(() => {
        if (token && userInfo) {
            setAuthState({ ...JSON.parse(userInfo), token })
        }

        if (token) {
            if (isTokenEnd) {
                logOut()
            }
        }
    }, [])

    const menuItems: IMenuItem[] = [
        {
            text: 'INTRODUCTION',
            href: '/',
        },
        {
            text: 'STATISTICS',
            href: '/statistics',
        },
        {
            text: 'HISTORY',
            href: '/history',
        },
    ]

    return (
        <nav>
            <ul>
                {menuItems.map((menuItem, idx) => (
                    <SiteNavbarItem key={'menu-' + idx} {...menuItem} />
                ))}
                <li className="mt-[23px] mb-[17px]">
                    {authState ? (
                        <>
                            <div
                                className="flex gap-[5px] text-[#888888] font-tekoRegular text-[30px] items-center relative cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                >
                                    <path
                                        d="M0.735352 11.7647C0.735352 5.26724 6.00259 0 12.5001 0C18.9975 0 24.2648 5.26724 24.2648 11.7647C24.2648 18.2622 18.9975 23.5294 12.5001 23.5294C6.00259 23.5294 0.735352 18.2622 0.735352 11.7647Z"
                                        fill="#9E74F9"
                                    />
                                    <circle cx="12.4998" cy="9.60922" r="4.46078" fill="#423F46" />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M19.4374 18.8034C19.5023 18.9109 19.4825 19.0485 19.3913 19.1347C17.5934 20.8333 15.1681 21.8747 12.4996 21.8747C9.83138 21.8747 7.40637 20.8336 5.60864 19.1354C5.5174 19.0492 5.4976 18.9116 5.56246 18.8042C6.8607 16.6535 9.48016 15.1836 12.5001 15.1836C15.5198 15.1836 18.139 16.6532 19.4374 18.8034Z"
                                        fill="#423F46"
                                    />
                                </svg>
                                MYPAGE
                            </div>
                            <Dropdown isShow={isOpen} setIsShow={setIsOpen}>
                                <div className=" bg-blackPurple rounded-[10px] p-[10px] min-w-[100px] text-center">
                                    <div
                                        onClick={() => {
                                            push('/my-page')
                                            setIsOpen(false)
                                        }}
                                        className="border-b cursor-pointer pb-5"
                                    >
                                        My Page
                                    </div>
                                    <div onClick={() => logOut()} className="pt-5 cursor-pointer">
                                        Log Out
                                    </div>
                                </div>
                            </Dropdown>
                        </>
                    ) : (
                        <Link href={'/login'}>SIGN IN</Link>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default SiteNavbar
