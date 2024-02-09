import React, { useEffect, useState } from 'react'
import useAsset from '../useAsset'
import Card from 'a/components/ui/card/Card'
import tw from 'tailwind-styled-components'
import { useAssetCtx } from '../useAssetCtx'
import Pagination from 'a/components/ui/pagination/Pagination'

function AssetList() {
    //const [totalProductCount, setTotalProductCount] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const { getAssets } = useAsset()
    const { assetsList, getAssetsPayload, setGetAssetsPayload } = useAssetCtx()

    useEffect(() => {
        setGetAssetsPayload((prev) => ({ ...prev, page: currentPage }))
        getAssets({ ...getAssetsPayload, page: currentPage })
    }, [currentPage])

    return (
        <>
            <MainCardsTw>
                {assetsList?.content?.map((asset, index) => (
                    <Card key={'assetsListCard' + index} {...asset} />
                ))}
            </MainCardsTw>
            <Pagination
                totalProductCount={assetsList?.totalElements}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={assetsList?.totalPages}
            />
        </>
    )
}

const MainCardsTw = tw.div`
    flex 
    grid
    grid-cols-4
    sm:grid-cols-2
    md:grid-cols-4
    gap-[20px]
`

export default AssetList
