import useCrud from 'common/axios/crud'
import useMessageFactory from 'common/message/useMessageFactory'
import { apis } from 'utils/libs'

function useSettings() {
    const { postModel, deleteModel } = useCrud()
    const { calcMessage } = useMessageFactory()

    async function saveSettings(data) {
        try {
            const res = await postModel(apis.editProfile, data,  true)
            return res
        }  catch(e) {
            console.error(e)
            const msg = calcMessage(e?.response?.status)
            return msg
        }   
    } 

    async function deleteProfileImg() {
        try {
            const res = await deleteModel(apis.setDefaultProfileImg)
            return res
        } catch(e) {
            console.error(e)
            const msg = calcMessage(e?.response?.status)
            return msg
        }
    }

    async function deleteBannerImg() {
        try {
            const res = await deleteModel(apis.setDefaultBannerImg)
            return res
        } catch(e) {
            console.error(e)
            const msg = calcMessage(e?.response?.status)
            return msg
        }
    }
    async function deleteArtistImg() {
        try {
            const res = await deleteModel(apis.setDefaultArtistImg)
            return res
        } catch(e) {
            console.error(e)
            const msg = calcMessage(e?.response?.status)
            return msg
        }
    }

    return {
        saveSettings,
        deleteProfileImg,
        deleteBannerImg,
        deleteArtistImg
    }
}

export default useSettings