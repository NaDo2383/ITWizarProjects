import React, { useEffect, useState } from 'react'
import { useUserCtx } from 'a/features/user/useUserCtx'
import tw from 'tailwind-styled-components'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import SideBar from 'a/components/layout/sideBar/SideBar'
import { Wrapper } from 'a/components/ui/containers/Wrapper'
import AssetList from 'a/features/asset/list/AssetList'
import { useAssetCtx } from 'a/features/asset/useAssetCtx'
import InputSearch from 'a/components/ui/form/elements/input/InputSearch'
import useAsset from 'a/features/asset/useAsset'

export default function Home() {
    const { scrollRef } = useUserCtx()
    const { getAssets } = useAsset()
    const { getAssetsPayload, setGetAssetsPayload } = useAssetCtx()
    const [searchingValue, setSearchingValue] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchingValue.trim() !== '') {
            getAssets({ ...getAssetsPayload, page: 0 })
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch(e)
        }
    }

    useEffect(() => {
        window.scrollTo(0, scrollRef.current.scrollPos)
        const handleScrollPos = () => {
            scrollRef.current.scrollPos = window.scrollY
        }
        window.addEventListener('scroll', handleScrollPos)
        return () => {
            window.removeEventListener('scroll', handleScrollPos)
        }
    })

    useEffect(() => {
        setGetAssetsPayload((prev) => ({ ...prev, searchWord: searchingValue }))
    }, [searchingValue])

    return (
        <Wrapper className="mt-20">
            <Flex>
                <div className="flex flex-col gap-5 w-full ">
                    <InputSearch
                        value={searchingValue}
                        onChange={(e) => setSearchingValue(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e)}
                        onClickSearchBtn={(e) => handleSearch(e)}
                    />
                    <div className="flex">
                        <SideBar />
                        <MainTw>
                            <AssetList />
                        </MainTw>
                    </div>
                </div>
            </Flex>
        </Wrapper>
    )
}

const MainTw = tw.div`
    flex
    flex-col
    container
    mx-[10px]
    gap-[20px]

`
