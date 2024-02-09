// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import WalletButton from '../../wallet-btn/WalletButton'
import DesktopNav from '../nav/DesktopNav'
import MobileNav from '../nav/MobileNav'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import useUser from 'a/features/user/useUser'
import { useUserCtx } from 'a/features/user/useUserCtx'
import { setSessionCookie } from 'a/common/storage/cookieStorage'
import { CookieName, Local } from 'a/libs/constants'
import { getAuthToken } from 'a/common/token/token'
import { getLocal } from 'a/common/storage/localStorage'

export default function Header() {
    const [toggle, setToggle] = useState(false)

    const { setAuthState } = useGlobalCtx()
    const { getUserInfo } = useUser()
    const { setUserInfo } = useUserCtx()
    const loggedUserSessionCookie = getLocal(Local.LOGGED_USER)
    const parsedUser = loggedUserSessionCookie && JSON.stringify(loggedUserSessionCookie)
    const parsedUserToken = parsedUser && parsedUser.token
    const token = typeof window !== 'undefined' && getAuthToken()
    useEffect(() => {
        // token дуусаагүй үед
        if (parsedUser && token) {
            setAuthState(parsedUser)
            getUserInfo(parsedUserToken).then((res) => {
                if (res?.status === 200) {
                    setUserInfo(res?.data?.result)
                    return
                }
            })
        } else {
            // setSessionCookie(CookieName.LOGGED_USER, null)
            localStorage.removeItem(Local.LOGGED_USER)
            setSessionCookie(CookieName.TOKEN, null)
        }
    }, [])

    // window resize
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                setToggle(false)
            }
        })
    })

    return (
        <>
            <DesktopNav toggle={toggle} setToggle={setToggle} />
            <MobileNav toggle={toggle} setToggle={setToggle} />
        </>
    )
}
