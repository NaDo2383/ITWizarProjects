/**
 * @createdBy duka 2023/5/18
 */
import useCrud from 'common/axios/crud'
import { useGlobalContext } from 'common/global/useGlobalContext'
import { apis } from 'utils/libs'
import useMessageFactory from 'common/message/useMessageFactory'
import { useEditProfileContext } from './useEditProfileContext'

function useEditProfile() {
  const { setGlobalLoading } = useGlobalContext()
  const { postModel, putModel } = useCrud()
  const { calcMessage } = useMessageFactory()
  const { profileDesc, setProfileDesc, nickName, setNickName, desc, setDesc } = useEditProfileContext()

  async function getVerificationCode() {
    setGlobalLoading(true)
    try {
      const res = await getModel('url')
      return res
    } catch (e) {
      throw new Error(e)
    } finally {
      setGlobalLoading(false)
    }
  }

  async function updateProfileImg(data) {
    setGlobalLoading(true)
    try {
      const res = await postModel(apis.editProfileImg, data, true)
      return res?.result
    } catch (e) {
      if (e?.response.status) {
        return calcMessage(e?.response.status)
      }
      throw new Error(e)
    } finally {
      setGlobalLoading(false)
    }
  }

  async function updateProfile(data) {
    setGlobalLoading(true)
   
    try {
      const res = await putModel(apis.editProfile, data, true)
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

  async function updateProfilePassword(data) {
    setGlobalLoading(true)
    try {
      const res = await postModel(apis.editProfilePassword, data, true)
      return res?.result
    } catch (e) {
      if (e?.response.status) {
        return calcMessage(e?.response.status)
      }
      throw new Error(e)
    } finally {
      setGlobalLoading(false)
    }
  }

  return {
    profileDesc,
    getVerificationCode,
    updateProfileImg,
    updateProfile,
    updateProfilePassword,
    nickName,
    desc
  }
}

export default useEditProfile