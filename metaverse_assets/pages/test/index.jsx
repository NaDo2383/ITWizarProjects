import useWeb3 from 'a/common/web3/useWeb3'
import Button from 'a/components/ui/button/Button'
import { Wrapper } from 'a/components/ui/containers/Wrapper'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import React from 'react'

const Test = () => {
    const { assetMint, copyrightMint, licenseMint } = useWeb3()

    return (
        <Wrapper>
            <Flex gap={10} className="my-10">
                <Button onClick={assetMint}>Asset contract</Button>
                <Button onClick={() => copyrightMint(0)}>Copyright contract</Button>
                <Button onClick={() => licenseMint(0)}>License contract</Button>
            </Flex>
        </Wrapper>
    )
}

export default Test
