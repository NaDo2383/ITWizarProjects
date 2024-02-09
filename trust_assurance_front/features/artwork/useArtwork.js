import useForm from "@/components/ui/form/store/useForm"
import { useFormCtx } from "@/components/ui/form/store/useFormCtx"
import { getData, useCrud } from "@/common/axios/useCrud"
import { useGlobalCtx } from "@/common/global/useGlobalCtx"

function useArtwork(formState, onChangeGroupList) {
    const { formDispatch, isUploading, setIsUploading } = useFormCtx()
    const { postData } = useCrud()
    const { setLoadingText } = useGlobalCtx()

    function addCreatorField() {
        const newCreator = {
            creatorName: { value: null, error: null },
            creatorId: { value: null, error: null },
        }
        formDispatch({
            type: "ADD_LIST",
            payload: {
                fieldName: "creatorList",
                value: [...formState?.creatorList, newCreator],
            },
        })
    }

    function removeCreatorField(indexToRemove) {
        const updatedCreatorList = [...formState.creatorList]
        updatedCreatorList.splice(indexToRemove, 1)
        formDispatch({
            type: "MINUS_LIST",
            payload: { fieldName: "creatorList", value: updatedCreatorList },
        })
    }

    function onChangeCreatorField(e, idx) {
        const { value, name } = e.target
        onChangeGroupList("creatorList", idx, name, value)
    }

    async function uploadMediaFile(payload) {
        setIsUploading(true)
        setLoadingText("이미지 업로드 중")
        try {
            const form = new FormData()
            for (const property in payload) {
                form.append(property, payload[property])
            }
            const options = {
                method: "POST",
                body: form,
            }
            const ipFsRes = await fetch("/api/uploadFile", options)

            const result1 = await ipFsRes.json()
            return result1
        } catch (err) {
            console.error(err)
        } finally {
            setIsUploading(false)
        }
    }

    return {
        addCreatorField,
        removeCreatorField,
        onChangeCreatorField,
        uploadMediaFile,
        isUploading,
    }
}

export default useArtwork
