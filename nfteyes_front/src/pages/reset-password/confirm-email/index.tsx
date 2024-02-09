import { PrimaryButton, SecondaryButton } from 'components/ui/button/Button'
import ClipBoardBtn from 'components/ui/clipboard/ClipBoardBtn'
import { MediumWrapper } from 'components/ui/containers/Wrapper'
import Flex from 'components/ui/containers/flex/Flex'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import React from 'react'

const ConfirmYourEmail: NextPage = () => {
    const { push } = useRouter()
    return (
        <MediumWrapper className=" pt-220">
            <h1 className=" text-center">Reset your password</h1>
            <p className=" text-24 leading-40 mt-40 mb-80">
                We have sent an email to <span className="text-24 text-darkPurple">[ID로 입력한 이메일 주소]</span> with
                a link to reset your password.
                <br />
                Please check your inbox and click the link to reset your password.
                <br />
                If you didn&apos;t receive the email, please check your spam folder or try resending the confirmation
                email.
                <br />
                If you have any questions or issues with confirming your email, please contact our support team at{' '}
                <ClipBoardBtn className=" text-24" text="tamtam@eyesprotocol.io" /> Thank you.
                <br />
            </p>
            <Flex className="w-full gap-20 justify-center pb-20">
                <SecondaryButton className="w-[190px]" onClick={() => push('/')}>
                    Homepage
                </SecondaryButton>
                <PrimaryButton className="w-[190px]" onClick={() => push('/login')}>
                    Login
                </PrimaryButton>
            </Flex>
        </MediumWrapper>
    )
}

export default ConfirmYourEmail
