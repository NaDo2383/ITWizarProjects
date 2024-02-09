import React from "react"
import { useCrud } from "@/common/axios/useCrud"
import { useArtworkContext } from "./useArtworkContext"

export default function useArtworks() {
    const { getData, postData } = useCrud()
    const {
        artworkList,
        setArtworkList,
        artworkDetail,
        setArtworkDetail,
        artworkDetailLicense,
        setArtworkDetailLicense,
        setSelectedLicense,
        isLoading,
        setIsLoading,
        mediaRegistrationStatus,
        setMediaRegistrationStatus,
        productSalesStatus,
        setProductSalesStatus,
        setLicenseList,
        setCopyRightList,
        setIsLoadingDetail,
    } = useArtworkContext()

    async function getArtworkList(startingpage, itemsPerPage) {
        try {
            const res = await getData(
                `/products/list?startPage=${startingpage}&itemsPerPage=${itemsPerPage}`
            )
            if (res.status === 200) {
                setArtworkList(res.data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function getArtworkDetail(id) {
        setIsLoadingDetail(true)
        try {
            const res = await getData(`/products/list?id=${id}`)
            if (res.status === 200) {
                setArtworkDetail(res.data[0])
                const licenseRes = await getData(
                    `/products/purchase/prices?id=${res.data[0].media_nft_id}`
                )
                if (licenseRes.status === 200) {
                    setArtworkDetailLicense(licenseRes?.data)
                    licenseRes?.data.forEach((element) => {
                        if (element.product_id === res.data[0].product_id) {
                            setSelectedLicense({
                                ...element,
                                copyright_token_id: res.data[0]?.copyright_token_id,
                            })
                        }
                    })
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoadingDetail(false)
        }
    }

    async function purchaseLicense(requestBody) {
        setIsLoading(true)
        try {
            const res = await postData("/products/orders", requestBody, true)
            return res
        } catch (e) {
            console.info(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function getProductCountForArtworkList() {
        try {
            const res = await getData("/products/list/seller/count")
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getMediaCount(token) {
        try {
            const res = await postData("/products/register/media/total", token)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getMediaRegistrationStatus(requestBody) {
        setIsLoading(true)
        try {
            const res = await postData("/products/register/media", requestBody)
            res.status === 200 && setMediaRegistrationStatus(res?.data)
            return res
        } catch (e) {
            console.info(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function getMediaLicenseDetail(id) {
        setIsLoading(true)
        try {
            const licenseRes = await getData(`/products/purchase/prices?id=${id}`)
            return licenseRes
        } catch (e) {
            console.info(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function registerProduct(payload) {
        setIsLoading(true)
        try {
            const res = await postData(`/products/register`, payload)
            return res
        } catch (e) {
            console.info(e)
            alert("Coudn't register product")
        } finally {
            setIsLoading(false)
        }
    }

    async function getMediaSalesStatus(requestBody) {
        setIsLoading(true)
        try {
            const res = await postData("/products/list/register/products", requestBody)
            res.status === 200 && setProductSalesStatus(res?.data)
            return res
        } catch (e) {
            console.info(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function getProductCount(token) {
        try {
            const res = await postData("/products/list/register/products/total", token)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getLicenseAndCopyrightList(id) {
        try {
            const res1 = await getData(`/products/license/list?id=${id}`)
            const res2 = await getData(`/products/copyright/list?id=${id}`)
            res1.status === 200 && setLicenseList(res1.data)
            res2.status === 200 && setCopyRightList(res2.data)
            return res1, res2
        } catch (e) {
            console.error(e)
        }
    }

    async function getTokenId(payload) {
        try {
            const res1 = await postData(`/products/list/tokenid`, payload)
            res1.status === 200 && setLicenseList(res1.data)
            return res1
        } catch (e) {
            console.error(e)
        }
    }

    return {
        getArtworkList,
        artworkList,
        getArtworkDetail,
        artworkDetail,
        artworkDetailLicense,
        purchaseLicense,
        getProductCountForArtworkList,
        isLoading,
        getMediaRegistrationStatus,
        mediaRegistrationStatus,
        getMediaLicenseDetail,
        getMediaCount,
        registerProduct,
        getMediaSalesStatus,
        getProductCount,
        productSalesStatus,
        getLicenseAndCopyrightList,
        getTokenId,
    }
}
