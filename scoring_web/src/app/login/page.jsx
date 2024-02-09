"use client"
import InputField from "../components/fields/InputField"
import Default from "../components/auth"
import Checkbox from "../components/checkbox"
import { useUserCtx } from "../features/user/useUserContext"
import useForm from "../common/form/useForm"
import useUser from "../features/user/useUser"
import { useRouter } from "next/navigation"


const init = {
    username: {
        value: null,
        error: null
    },
    password: {
        value: null,
        error: null
    }
}
export default function page() {
    const { onChange, formState } = useForm(init);
    const { loginUser } = useUser()
    const { push } = useRouter()

    async function handleClick(e) {
        e.preventDefault();
        const payload = {
            username: formState?.username?.value,
            password: formState?.password?.value,
        }
        loginUser(payload).then((res) => {
            if (res?.success === true) {
                if (res?.userInfo?.type === "ROLE_TESTER") {
                    push('/form')
                } else {
                    push('/')
                }
            } else {
                alert("Login failed")
            }
        }).catch((err) => { console.log(err) });
    }

    return (
        <Default
            maincard={
                <form>

                    <div className='mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start'>
                        {/* Sign in section */}
                        <div className='mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]'>
                            <h3 className='mb-2.5 text-4xl font-bold text-navy-700 dark:text-white'>
                                Sign In
                            </h3>
                            <p className='mb-9 ml-1 text-base text-gray-600'>
                                Enter your email and password to sign in!
                            </p>

                            {/* Email */}
                            <InputField
                                variant='auth'
                                extra='mb-3'
                                label='Email*'
                                placeholder='mail@simmmple.com'
                                id='email'
                                type='text'
                                name="username"
                                onChange={onChange}
                            />

                            {/* Password */}
                            <InputField
                                variant='auth'
                                extra='mb-3'
                                label='Password*'
                                placeholder='Min. 8 characters'
                                id='password'
                                type='password'
                                name="password"
                                onChange={onChange}
                            />
                            {/* Checkbox */}
                            <div className='mb-4 flex items-center justify-between px-2'>
                                <div className='mt-2 flex items-center'>
                                    <Checkbox />
                                    <p className='ml-2 text-sm font-medium text-navy-700 dark:text-white'>
                                        Keep me logged In
                                    </p>
                                </div>
                                <a
                                    className='text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white'>
                                    Forgot Password?
                                </a>
                            </div>
                            <button onClick={handleClick} className='linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'>
                                Sign In
                            </button>
                        </div>
                    </div>
                </form>
            }
        />
    )
}
