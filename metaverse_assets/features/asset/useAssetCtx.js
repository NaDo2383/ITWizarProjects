import React, { createContext, useState, useContext } from 'react'

const AssetContext = createContext({})

const AssetProvider = ({ children }) => {
    const [assetsList, setAssetsList] = useState()
    const [assetDetail, setAssetDetail] = useState()
    const [copyRightList, setCopyRightList] = useState()
    const [platforms, setPlatforms] = useState()
    const [getAssetsPayload, setGetAssetsPayload] = useState({
        itemsPerPage: 16,
        page: 1,
        isCommercialAllowed: '',
        isResaleAllowed: '',
        copyrightType: '',
        tags: '',
        searchWord: '',
        type: '',
    })
    const [licenseHistoryList, setLicenseHistoryList] = useState()

    return (
        <AssetContext.Provider
            value={{
                assetDetail,
                setAssetDetail,
                assetsList,
                setAssetsList,
                getAssetsPayload,
                setGetAssetsPayload,
                copyRightList,
                setCopyRightList,
                licenseHistoryList,
                setLicenseHistoryList,
                platforms,
                setPlatforms,
            }}
        >
            {children}
        </AssetContext.Provider>
    )
}

const useAssetCtx = () => {
    const context = useContext(AssetContext)
    if (!context) throw new Error('useAssetCtx must be used within a AssetProvider')
    return context
}

export { AssetContext, AssetProvider, useAssetCtx }
