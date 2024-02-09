import React from 'react'
import GlobalMainPopup from '../_partials/GlobalMainPopup'
import Image from 'next/image'
import { Flex } from '@/components/ui/containers/flex/Flex'


export default function VerificationSuccessPopup() {


    return (
        <GlobalMainPopup>
            <Flex column={true} align={"center"} justify={"center"}>
                <Image
                    src="/Completed.png"
                    alt="Completed badge"
                    width={50}
                    height={50}
                />
                <h3 className="mb-30 mt-30">
                    신원인증이 완료되었습니다.
                </h3>
            </Flex>
        </GlobalMainPopup>
    )

}
