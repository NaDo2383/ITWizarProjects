import NextHead from 'a/common/seo/NextHead'
import RecoverPasswordForm from 'a/features/user/form/RecoverPasswordForm'
import { PopupProvider } from 'common/popup/usePopupCtx'
import Form from 'components/ui/form/Form'
import Image from 'next/image'
import Link from 'next/link'
// import RecoverPasswordForm from 'features/user/form/RecoverPasswordForm'
import React from 'react'

function RecoverPage() {
    return (
        <PopupProvider>
            <div>
                <NextHead title="Sign up Metaverse assets platform" />
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

                            <div className="w-full text-center">
                                <h1 className="text-jacarta-700 font-display mb-6 text-4xl dark:text-white">
                                    비밀번호 재설정
                                </h1>
                                <Form>
                                    <RecoverPasswordForm />
                                </Form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PopupProvider>
    )
}

export default RecoverPage
