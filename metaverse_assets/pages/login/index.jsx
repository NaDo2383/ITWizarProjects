import NextHead from 'a/common/seo/NextHead'
import Form from 'a/components/ui/form/Form'
import LoginForm from 'a/features/user/form/LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { removeCookie } from 'a/common/storage/cookieStorage'
import { CookieName } from 'a/libs/constants'

function LoginPage() {
    useEffect(() => {
        for (const key in CookieName) {
            removeCookie(CookieName[key])
        }
    }, [])
    return (
        <div>
            <NextHead title="Login || Metaverse assets" />
            <section className="relative h-screen">
                <div className="lg:flex lg:h-full">
                    {/* <!-- Left --> */}
                    <div className="relative text-center lg:w-1/2">
                        <Image
                            width={768}
                            height={722}
                            src="/images/login.jpg"
                            alt="login"
                            className="absolute h-full w-full object-cover"
                        />
                        {/* <!-- Logo --> */}
                        <Link
                            href="/"
                            className="relative inline-block py-36 text-xl font-semibold"
                        >
                            <span className="text-white uppercase">Metaverse </span>
                            <span className="text-accent uppercase">assets</span>
                        </Link>
                    </div>

                    {/* <!-- Right --> */}
                    <div className="relative flex items-center justify-center p-[10%] lg:w-1/2">
                        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                            <Image
                                width={1519}
                                height={773}
                                priority
                                src="/images/gradient_light.jpg"
                                alt="gradient"
                                className="h-full w-full object-cover"
                            />
                        </picture>

                        <div className="w-full max-w-[25.625rem] text-center">
                            <h1 className="text-jacarta-700 font-display mb-6 text-4xl dark:text-white">
                                로그인
                            </h1>
                            <Form>
                                <LoginForm />
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- end login --> */}
        </div>
    )
}

export default LoginPage
