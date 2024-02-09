/**
 * @createdBy duka 
 */
import { useState } from 'react'
import { apis } from 'utils/libs'
import useCrud from 'common/axios/crud'
import useMessageFactory from 'common/message/useMessageFactory'
import { useGlobalContext } from 'common/global/useGlobalContext'
import usePopup from 'Components/ui/popup/usePopup'

function useOtp() {
  const { setGlobalLoading } = useGlobalContext()
  const { postModel, getModel } = useCrud()
  const { hideAllModals } = usePopup()
  const { calcMessage } = useMessageFactory()
  const [ otpState, setOtpState ] = useState({
    qrVerify: {
      isLoading: false,
      data: null,
      error: false,
    },
    otpVerify : {
      isLoading: false,
      data: null,
      error: false,
    }
  })

  async function getVerificationCode() {
    setGlobalLoading(true)
    setOtpState(prev => (
      {
        ...prev, 
        qrVerify: { ...prev.qrVerify, isLoading: true } 
      }))
    try {
      const res = await getModel('url')
      return res
    } catch (e) {
      throw new Error(e)
    } finally {
      setGlobalLoading(false)
      setOtpState(prev => (
        {
          ...prev, 
          qrVerify: { ...prev.qrVerify, isLoading: false } 
        }))
    }
  }

  async function getVerificationQr(data) {
    setGlobalLoading(true)
    setOtpState(prev => (
      {
        ...prev, 
        qrVerify: { ...prev.qrVerify, isLoading: true } 
      }))
    try {
      const res = await postModel(apis.verificationQr, data, true)
      return res?.data
      
    } catch (e) {
      if (e?.response.status) {
        return calcMessage(e?.response.status)
      }
      throw new Error(e)
    } finally {
      setGlobalLoading(false)
      setOtpState(prev => (
        {
          ...prev, 
          qrVerify: { ...prev.qrVerify, isLoading: false } 
        }))
    }
  }

  async function verifyQr(data) {
    setGlobalLoading(true)
    setOtpState(prev => (
      {
        ...prev, 
        qrVerify: { ...prev.qrVerify, isLoading: true } 
      }))
    try {
      const res = await postModel(apis.verifyQr, data, true)
      setOtpState(prev => (
        {
          ...prev, 
          qrVerify: { ...prev.qrVerify, data: res } 
      }))
      if(res?.data?.result === "success"){
        hideAllModals()
      }
      return res?.data
    } catch (e) {
      setOtpState(prev => (
        {
          ...prev, 
          qrVerify: { ...prev.qrVerify, error: e } 
      }))
      if (e?.response.status) {
        return calcMessage(e?.response.status)
      }
      console.error(e)
    } finally {
      setGlobalLoading(false)
      setOtpState(prev => (
        {
          ...prev, 
          qrVerify: { ...prev.qrVerify, isLoading: false } 
        }))
    }
  }

  async function otpVerify(data) {
    setGlobalLoading(true)
    setOtpState(prev => (
      {
        ...prev, 
        qrVerify: { ...prev.qrVerify, isLoading: true } 
      }))
    try {
      const res = await postModel(apis. otpVerify, data, true)
      setOtpState(prev => (
        {
          ...prev, 
          qrVerify: { ...prev.otpVerify, data: res } 
      }))
      return res?.result
    } catch (e) {
      setOtpState(prev => (
        {
          ...prev, 
          otpVerify: { ...prev.qrVerify, error: e } 
      }))
      if (e?.response.status) {
        return calcMessage(e?.response.status)
      }
      throw new Error(e)
    } finally {
      setGlobalLoading(false)
      setOtpState(prev => (
        {
          ...prev, 
          qrVerify: { ...prev.qrVerify, isLoading: false } 
        }))
    }
  }

  async function cancelOtp(data) {
    setGlobalLoading(true)
    try {
      const res = await postModel(apis.cancelOtp, data, true)
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

  return {
    getVerificationCode,
    getVerificationQr,
    verifyQr,
    cancelOtp,
    otpVerify,
    otpState
  }
}

export default useOtp