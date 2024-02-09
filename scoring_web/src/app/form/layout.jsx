"use client"
import React, { useEffect, useState } from "react"
import { FormProvider } from "../common/form/useFormCtx"
import Navbar from '../components/navbar'
import Footer from '../components/footer/Footer';
import { usePathname, useRouter } from "next/navigation";
import {
    getActiveNavbar,
    getActiveRoute,
    isWindowAvailable,
} from '../../utils/navigation';
import routes from '../../consts/routes';

export default function formlayout({ children }) {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const token = getCookie("scoringCoookie")
    const { push } = useRouter()

    useEffect(() => {
        if (!token) {
            push('/login')
        }
    }, [])
    return (
        <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
            <div className='relative float-right h-full min-h-screen w-full dark:!bg-navy-900'>
                <main className={`mx-2.5  flex-none transition-all dark:bg-navy-900 md:pr-2 `}>
                    <Navbar
                        onOpenSidenav={() => setOpen(!open)}
                    />
                    <FormProvider>
                        <div className="mx-auto w-full min-h-screen p-2 !pt-[10px] md:p-2 max-w-[1920px]">
                            {children}
                        </div>
                    </FormProvider>
                    <div className="p-3">
                        <Footer />
                    </div>
                </main>
            </div>
        </div>
    )
}