import React from 'react';
//internal import
import ImageLight from '@/assets/img/login-office.jpeg';
import ImageDark from '@/assets/img/login-office-dark.jpeg';
import LoginForm from './LoginForm';
import { FormProvider } from '@/components/ui/form/store/useFormCtx';

function LoginPage() {
    return (
        // <PopupProvider>
        <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
            <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
                <div className='flex flex-col overflow-y-auto md:flex-row'>
                    <div className='h-32 md:h-auto md:w-1/2'>
                        <img
                            aria-hidden='true'
                            className='object-cover w-full h-full dark:hidden'
                            src={ImageLight}
                            alt='Office'
                        />
                        <img
                            aria-hidden='true'
                            className='hidden object-cover w-full h-full dark:block'
                            src={ImageDark}
                            alt='Office'
                        />
                    </div>
                    <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
                        <div className='w-full'>
                            <h1 className='mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>
                                Login
                            </h1>
                            <FormProvider>
                                <LoginForm />
                            </FormProvider>
                            <div className='  rounded-lg bg-neutral-300'>
                                <div className=' text-lg text-center rounded-t-lg py-2 font-semibold bg-neutral-500 w-full'>
                                    관리자 계정 생성 안내
                                </div>
                                <div className='pl-5 py-2'>
                                    <ul className='list-disc text-sm'>
                                        <li>관리자 계정 생성은 담당자에게 연락해주세요.</li>
                                        <li>ID/PW 분실시 담당자에게 연락해주세요.</li>
                                        <li>담당자: 장진수/010-2006-5554/huke@lsware.co.kr</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        // </PopupProvider>
    );
}

export default LoginPage;
