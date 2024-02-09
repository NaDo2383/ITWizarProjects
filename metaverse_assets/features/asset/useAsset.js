import { useFormCtx } from 'a/components/ui/form/store/useFormCtx'
import { useCrud } from 'a/common/axios/useCrud'
import { useAssetCtx } from './useAssetCtx'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
function useAsset(formState, onChangeGroupList) {
    const { formDispatch } = useFormCtx()
    const { patchData, postData, getData } = useCrud()
    const { setGlobalItems } = useGlobalCtx()
    const {
        setAssetDetail,
        setAssetsList,
        setCopyRightList,
        setLicenseHistoryList,
        setPlatforms,
    } = useAssetCtx()
    //эхлэл: useForm руу зөөх ёстой функцууд
    function addField(fieldName) {
        const newCreator = {
            creatorName: { value: null, error: null },
            creatorId: { value: null, error: null },
        }
        formDispatch({
            type: 'ADD_LIST',
            payload: {
                fieldName,
                value: [...formState[fieldName], newCreator],
            },
        })
    }

    function removeField(indexToRemove, fieldName) {
        const updatedCreatorList = [...formState[fieldName]]
        updatedCreatorList.splice(indexToRemove, 1)
        formDispatch({
            type: 'MINUS_LIST',
            payload: { fieldName, value: updatedCreatorList },
        })
    }
    function onChangeField(e, idx, fieldName) {
        const { value, name } = e.target
        onChangeGroupList(fieldName, idx, name, value)
    }
    // төгсгөл: useForm руу зөөх ёстой функцууд

    function addCreatorField() {
        const newCreator = {
            creatorName: { value: null, error: null },
            creatorId: { value: null, error: null },
        }
        formDispatch({
            type: 'ADD_LIST',
            payload: {
                fieldName: 'creatorList',
                value: [...formState?.creatorList, newCreator],
            },
        })
    }

    function removeCreatorField(indexToRemove) {
        const updatedCreatorList = [...formState.creatorList]
        updatedCreatorList.splice(indexToRemove, 1)
        formDispatch({
            type: 'MINUS_LIST',
            payload: { fieldName: 'creatorList', value: updatedCreatorList },
        })
    }

    function onChangeCreatorField(e, idx) {
        const { value, name } = e.target
        onChangeGroupList('creatorList', idx, name, value)
    }

    async function uploadAssetFile(payload) {
        try {
            const form = new FormData()
            for (const property in payload) {
                form.append(property, payload[property])
            }
            const options = {
                method: 'POST',
                body: form,
            }
            const ipFsRes = await fetch('/api/uploadFile', options)
            const result = await ipFsRes.json()
            return result
        } catch (err) {
            console.error(err)
        }
    }

    async function bindCopyrightsToUsers(payload) {
        try {
            const data = {
                copyrightTypes: payload?.copyrightTypes,
                copyrightHolders: payload?.copyrightHolders,
            }
            const res = await patchData('/asset/' + payload?.assetId, data, true)
            return res
        } catch (err) {
            console.error(err)
        }
    }

    async function copyrightToken(payload) {
        try {
            const res = await postData('/copyright/token', payload, true)
            return res
        } catch (err) {
            console.error(err)
        }
    }

    async function saveAssetLicense(payload, assetId) {
        try {
            if (!assetId) {
                alert('assetId is null!!!')
                return
            }
            const res = await patchData(`asset/${assetId}/licenseInfo`, payload, true)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function saveLicenseToken(payload) {
        try {
            const res = await postData(`license/token`, payload, true)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getAssets(payload) {
        const {
            itemsPerPage,
            isCommercialAllowed,
            isResaleAllowed,
            copyrightType,
            tags,
            searchWord,
            type,
            page,
        } = payload
        try {
            const res = await getData(
                `/market?page=${page && page - 1}&size=${
                    itemsPerPage && itemsPerPage
                }&commercialAllowed=${
                    isCommercialAllowed && isCommercialAllowed
                }&resaleAllowed=${isResaleAllowed && isResaleAllowed}&copyrightType=${
                    copyrightType && copyrightType
                }&tag=${tags && tags}&searchWord=${
                    searchWord && searchWord
                }&platformIds=${type && type}`
            )
            setAssetsList(res?.data?.result)
            return res?.data?.result
        } catch (e) {
            console.error(e)
        }
    }

    async function getAssetDetail(id) {
        try {
            const res = await getData(`/market/${id}`)
            setAssetDetail(res?.data?.result)
            return res?.data?.result
        } catch (e) {
            console.error(e)
        }
    }

    async function sendReport(id, payload) {
        try {
            const res = await postData(`/report/asset/${id}`, payload, true)
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getLicenseAndCopyrightList(id) {
        try {
            const res = await fetch(
                `/apiEventWatcher/collections/event/records?filter=(assetTokenId='${id}')`,
                {
                    method: 'GET',
                }
            )
            const res1 = await res.json()
            setCopyRightList(res1)
            return res
        } catch (error) {
            console.error('Error:', error)
        }
    }

    async function getLicenseHistoryList(walletAddress, page) {
        try {
            const res = await fetch(
                `/apiEventWatcher/collections/license_history/records?filter=(owner='${walletAddress}')&page=${page}`,
                {
                    method: 'GET',
                }
            )
            const res1 = await res.json()
            setLicenseHistoryList(res1)
            return res
        } catch (error) {
            console.error('Error:', error)
        }
    }

    async function checkVPUser(data) {
        try {
            const payload = {
                data: data,
            }
            const res = await fetch('/api/checkAssetUserId', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return res
        } catch (e) {
            console.error(e)
        }
    }

    async function getPlatformList() {
        try {
            const res = await getData(`/platforms`)
            setPlatforms(res?.data?.result)
            setGlobalItems((prev) => ({
                ...prev,
                platforms: res?.data?.result,
            }))
            return res?.data?.result
        } catch (e) {
            console.error(e)
        }
    }

    return {
        addField,
        removeField,
        addCreatorField,
        onChangeField,
        removeCreatorField,
        onChangeCreatorField,
        uploadAssetFile,
        bindCopyrightsToUsers,
        copyrightToken,
        saveAssetLicense,
        saveLicenseToken,
        getAssetDetail,
        getAssets,
        getLicenseAndCopyrightList,
        getLicenseHistoryList,
        checkVPUser,
        sendReport,
        getPlatformList,
    }
}

export default useAsset
