import React from 'react'
import { PopupProvider } from 'a/common/popup/usePopupCtx'
import AssetDetail from 'a/features/asset/detail/AssetDetail'
import { AssetProvider } from 'a/features/asset/useAssetCtx'

export default function Detail() {
    return (
        <AssetProvider>
            <PopupProvider>
                <AssetDetail />
            </PopupProvider>
        </AssetProvider>
    )
}
