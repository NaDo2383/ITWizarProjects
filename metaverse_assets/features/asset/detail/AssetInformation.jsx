import { DetailSectionHeader } from 'a/components/ui/typography/header'
import React from 'react'
import { useAssetCtx } from '../useAssetCtx'

export default function AssetInformation() {
    const { assetDetail } = useAssetCtx()

    return (
        <div className=" bg-jacarta-100 dark:bg-jacarta-700 bg-opacity-70 rounded-lg p-5 mb-8">
            <DetailSectionHeader>에셋 정보</DetailSectionHeader>
            <p
                className="whitespace-pre overflow-y-auto"
                style={{ whiteSpace: 'pre', maxHeight: '240px' }}
            >
                {assetDetail?.description}
            </p>
        </div>
    )
}
