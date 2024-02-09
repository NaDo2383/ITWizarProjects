import LogoIcon from "@/components/ui/icon/LogoIcon";
import Navigation from "../nav/Navigation";
import MetamaskBtn from "@/components/ui/button/MetamaskBtn";
import MobileNav from "../nav/MobileNav";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";
import MainLoginBtn from "@/components/ui/button/MainLoginBtn";
import { Flex } from "@/components/ui/containers/flex/Flex";
import { useEffect } from "react";
import useUser from "@/features/user/useUser";
import { useUserCtx } from "@/features/user/useUserCtx";
import { getCookie, setSessionCookie, removeCookie } from "@/common/storage/cookieStorage";
import { CookieName } from "@/libs/constants";
import useToken from "@/common/token/useToken";
import { useState } from "react";

export default function Header({ scroll, isMobileMenu, handleMobileMenu }) {
    const { authState, setAuthState } = useGlobalCtx();
    const { getUserInfo } = useUser();
    const { setUserInfo } = useUserCtx();
    const { getAuthToken } = useToken();
    const [token, setToken] = useState();
    const loggedUserSessionCookie = getCookie(CookieName.LOGGED_USER);
    const parsedUser = loggedUserSessionCookie && JSON.parse(loggedUserSessionCookie);

    useEffect(() => {
        getAuthToken().then((res) => {
            setToken(res)
            if (res) {
                // token дуусаагүй үед
                if (res && parsedUser) {
                    setAuthState(parsedUser);
                    getUserInfo(res).then((res) => {
                        if (res.status === 200) {
                            setUserInfo(res.data);
                            return;
                        }
                    });
                } else {
                    // removeCookie(CookieName.LOGGED_USER);
                    removeCookie(CookieName.TOKEN)
                }
            }
        });
    }, []);

    return (
        <header
            id="header_main"
            className={`header_1 header-fixed ${scroll ? "is-fixed is-small" : ""
                }`}
        >
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="site-header-inner">
                            <Flex width="100%" justify="space-between">
                                <div id="site-logo">
                                    <div id="site-logo-inner">
                                        <LogoIcon />
                                    </div>
                                </div>
                                <div
                                    className="mobile-button"
                                    onClick={handleMobileMenu}
                                >
                                    <span />
                                </div>
                                <Navigation />
                                {authState ? <MetamaskBtn /> : <MainLoginBtn />}
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
            <MobileNav
                isMobileMenu={isMobileMenu}
                handleMobileMenu={handleMobileMenu}
            />
        </header>
    );
}
