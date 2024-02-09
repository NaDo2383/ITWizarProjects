import React from "react"
import { useContext } from "react"
import { createContext } from "react"
import { useState } from "react"
const ArtworkContext = createContext({})

function ArtworkProvider({ children }) {
    const [artworkList, setArtworkList] = useState()
    const [artworkDetail, setArtworkDetail] = useState()
    const [mediaRegistrationStatus, setMediaRegistrationStatus] = useState()
    const [productSalesStatus, setProductSalesStatus] = useState()
    const [artworkDetailLicense, setArtworkDetailLicense] = useState()
    const [selectedLicense, setSelectedLicense] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingDetail, setIsLoadingDetail] = useState(false)
    const [licenseList, setLicenseList] = useState()
    const [copyRightList, setCopyRightList] = useState()

    return (
        <ArtworkContext.Provider
            value={{
                artworkList,
                setArtworkList,
                artworkDetail,
                setArtworkDetail,
                selectedLicense,
                setSelectedLicense,
                artworkDetailLicense,
                setArtworkDetailLicense,
                isLoading,
                setIsLoading,
                mediaRegistrationStatus,
                setMediaRegistrationStatus,
                productSalesStatus,
                setProductSalesStatus,
                licenseList,
                setLicenseList,
                copyRightList,
                setCopyRightList,
                isLoadingDetail,
                setIsLoadingDetail,
            }}>
            {children}
        </ArtworkContext.Provider>
    )
}

const useArtworkContext = () => useContext(ArtworkContext)

export { ArtworkContext, useArtworkContext, ArtworkProvider }
