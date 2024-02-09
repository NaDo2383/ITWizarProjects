import React from 'react'
import Image from 'next/image'
import { Wrapper } from 'a/components/ui/containers/Wrapper'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import tw from 'tailwind-styled-components'
import Button from 'a/components/ui/button/Button'
import { useRouter } from 'next/navigation'
import { FormMainTitle } from 'a/features/asset/form/LicenseCreateForm'

function Completed() {
    const { push } = useRouter()
    return (
        <Wrapper>
            <CompletedPage>
                <FormMainTitle className="text-center text-xl">회원가입</FormMainTitle>
                <Flex
                    column
                    align="center"
                    gap={4}
                    className="bg-jacarta-100 rounded-xl p-14 my-4"
                >
                    <Image
                        src="/Completed.png"
                        alt="Completed badge"
                        width={70}
                        height={70}
                    />
                    <Flex column align="center" gap={2}>
                        <h1 className="my-30 text-2xl">회원가입이 완료되었습니다.</h1>
                    </Flex>
                </Flex>
                <Button onClick={() => push('/login')}>로그인 페이지로 이동하기</Button>
            </CompletedPage>
        </Wrapper>
    )
}

const CompletedPage = tw.div`
    absolute
    top-1/2
    left-1/2
    translate-x-[-50%]
    translate-y-[-50%]
    rounded-xl
    bg-jacarta-100
    px-4
    py-2
    max-w-700
    bg-yellow-400
`
export default Completed
