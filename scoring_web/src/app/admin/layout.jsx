'use client';
// Layout components
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminRoutes, normalRoutes } from '../../consts/routes';
import {
    getActiveNavbar,
    getActiveRoute,
    isWindowAvailable,
} from '../../utils/navigation';
import React from 'react';
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar';
import Footer from '../components/footer/Footer';
import { useUserCtx } from '../features/user/useUserContext';

export default function Admin({ children }) {
    // states and functions
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const token = getCookie("scoringCoookie")
    const { push } = useRouter()
    const { userInfo } = useUserCtx()

    useEffect(() => {
        if (!token) {
            push('/login')
        }
    }, [])
    if (isWindowAvailable()) document.documentElement.dir = 'ltr';

    console.log("userInfo: ", userInfo);
    return (
        <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
            <Sidebar routes={userInfo?.type === "ROLE_ADMIN" ? adminRoutes : normalRoutes} open={open} setOpen={setOpen} variant="admin" />
            {/* Navbar & Main Content */}
            <div className="h-full w-full font-dm dark:bg-navy-900">
                {/* Main Content */}
                <main
                    className={`mx-2.5  flex-none transition-all dark:bg-navy-900 md:pr-2 xl:ml-[323px]`}
                >
                    {/* Routes */}
                    <div>
                        <Navbar
                            onOpenSidenav={() => setOpen(!open)}
                            brandText={getActiveRoute(userInfo?.type === "ROLE_ADMIN" ? adminRoutes : normalRoutes, pathname)}
                            secondary={getActiveNavbar(userInfo?.type === "ROLE_ADMIN" ? adminRoutes : normalRoutes, pathname)}
                        />
                        <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
                            {children}
                        </div>
                        <div className="p-3">
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
