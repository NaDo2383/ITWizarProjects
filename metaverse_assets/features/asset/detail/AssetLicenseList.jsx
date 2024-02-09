'use client'
import React, { useEffect, useState } from 'react'
import { DetailSectionHeader } from 'a/components/ui/typography/header'
import Table from 'a/components/ui/table/Table'
import useAsset from '../useAsset'
import { useAssetCtx } from '../useAssetCtx'

const tableHeader = ['토큰 유형', '트랜잭션 해쉬', '컨트랙트 주소', '토큰 ID', '일자']

export default function AssetLicenseList() {
    const { copyRightList, assetDetail } = useAssetCtx()
    const { getLicenseAndCopyrightList } = useAsset()
    const [itemsOfferData, setItemsOfferData] = useState([])

    function getTokenId(array) {
        const result = array?.find((token) => token.type === 'ASSET')

        return result?.token?.toString()
    }

    useEffect(() => {
        const tokenId = getTokenId(assetDetail?.tokens)
        if (tokenId) {
            getLicenseAndCopyrightList(tokenId)
        }
    }, [assetDetail])

    useEffect(() => {
        const items = []
        copyRightList?.items?.forEach((element) => {
            items.push({
                tokenType: element.type,
                transactionHash: element.transaction_hash.slice(0, 14) + '...',
                contractAddress: element.contract_address.slice(0, 14) + '...',
                tokenID: element.tokenId,
                date: element.created.substring(0, 10),
            })
        })
        setItemsOfferData(items)
    }, [copyRightList?.items])

    return (
        <div className="bg-jacarta-100 dark:bg-jacarta-700 bg-opacity-70 rounded-lg p-5 mb-8">
            <DetailSectionHeader>NFT 발행 이력</DetailSectionHeader>
            <Table items_offer_data={itemsOfferData} tableHeader={tableHeader} />
        </div>
    )
}
