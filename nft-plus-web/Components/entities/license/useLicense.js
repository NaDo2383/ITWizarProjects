/**
 * @createdBy Phill Anderson 2022/4/3
 * * @createdBy duka
 */
import useCrud from 'common/axios/crud'
import { useGlobalContext } from 'common/global/useGlobalContext'
import useMessageFactory from 'common/message/useMessageFactory'
import { apis } from 'utils/libs'
import { useLicenseContext } from './useLicenseContext'

function useLicense() {
    const { 
      setGlobalLoading, 
      licenseRequestForm, 
      setLicenseRequestForm, 
      initialLicenseForm,
      rightLists, 
      setRightsLists
    } = useGlobalContext()

    const { getModel, postModel } = useCrud()
    const { calcMessage } = useMessageFactory()
    const { 
        licenseRequests,
        setLicenseRequests,
        licensePagination, 
        setLicensePagination,
        paidLicenses,
        setPaidLicenses,
    } = useLicenseContext()

    async function sendLicenseRequest(data) {
      setGlobalLoading(true)
      try {
        const res = await postModel(apis.licenseRequestRegister, data, true)
        return res
      } catch (e) {
        console.error(e.response)
        if (e?.response?.status) {
          return calcMessage(e?.response?.code)
        }
      } finally {
        setGlobalLoading(false)
      }
    }
    
    async function getLicenseRequests(pageNumber = 0) {
            // const { page, size } = licensePagination
            setGlobalLoading(true)
        try{
            const res = await getModel(apis.licenseRequestList + `?page=${pageNumber}&size=${licensePagination?.size}`, true)
            setLicenseRequests(res)
            return res?.result?.content
        } catch(e) {
            if(e?.response?.status) {
                return calcMessage(e?.response?.status)   
            }
            console.error(e)
        } finally {
            setGlobalLoading(false)
        }
    }

    async function getPaidLicenses(pageNumber = 0) {
            // const { page, size } = licensePagination
            setGlobalLoading(true)
        try {
            const res = await getModel(apis.licensesPaid + `?page=${pageNumber}&size=${licensePagination?.size}`, true)
            setPaidLicenses(res)
            return res?.result?.content
        } catch(e) {
            if(e?.response?.status) {
                return calcMessage(e?.response.status)
            }
            console.error(e)
        } finally {
            setGlobalLoading(false)
        }
    }

    async function postLicenseApprove(data) {
        setGlobalLoading(true)
      try {
        const res = await postModel(apis.licenseApprove, data, true)
        return res?.result
      } catch (e) {
        if (e?.response.status) {
          return calcMessage(e?.response.status)
        }
        console.error(e)
      } finally {
        setGlobalLoading(false)
      }
    }

    async function postLicenseDenyReason(data) {
        setGlobalLoading(true)
      try {
        const res = await postModel(apis.licenseDenyReason, data, true)
        return res?.result
      } catch (e) {
        if (e?.response?.status) {
          return calcMessage(e?.response?.status)
        }
        console.error(e)
      } finally {
        setGlobalLoading(false)
      }
    }

    async function eyeLicenseHelperAPI(data) {
      try {
        const res = await fetch('/api/license', {
          method: "POST",
          body: JSON.stringify(data)
        })
        return 'success'

      } catch (e) {
        if (e?.response?.status) {
          return calcMessage(e?.response?.status)
        }
        console.error(e)
        return 'unsuccessfull'
      } 
    }

    async function buyLicense(data) {
      setGlobalLoading(true)
    try {
      const res = await postModel(apis.licenseContractRegister, data, true)
      return res?.result
    } catch (e) {
      if (e?.response?.status) {
        return calcMessage(e?.response?.status)
      }
      console.error(e)
    } finally {
      setGlobalLoading(false)
    }
  }
    
  return {
    eyeLicenseHelperAPI,
    buyLicense,
    sendLicenseRequest,
    licenseRequests,
    licensePagination,
    getLicenseRequests,
    setLicensePagination,
    getPaidLicenses,
    paidLicenses,
    postLicenseApprove,
    postLicenseDenyReason,
    licenseRequestForm, 
    setLicenseRequestForm,
    initialLicenseForm,
    rightLists, 
    setRightsLists
  }
}

export default useLicense