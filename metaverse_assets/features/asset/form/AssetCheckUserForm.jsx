import React, { useState } from 'react'
import FormRow from 'a/components/ui/form/FormRow'
import Button from 'a/components/ui/button/Button'
import { usePopupCtx } from 'a/common/popup/usePopupCtx'
import TextArea from 'a/components/ui/form/elements/textArea/TextArea'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import useAsset from '../useAsset'
import useForm from 'a/components/ui/form/store/useForm'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'

function AssetCheckUserForm() {
    const [isLoading] = useState(false)
    const { popupState } = usePopupCtx()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { checkVPUser } = useAsset()

    const [initialFormState] = useState(popupState?.generatedCheckUserFormState)
    const { onChange, formState } = useForm(initialFormState)
    async function handleSubmit(e) {
        e.preventDefault()

        for (let vpData of Object.values(formState)) {
            const res = await checkVPUser(vpData?.value)
            if (res?.data?.status_code === 200) {
                process.env.NODE_ENV !== 'production' && console.log(res?.data?.data)
            }
            if (res?.data?.status_code === 400 || res?.data?.status_code === 404) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'this user doesnt exist',
                })
                return
            }
        }
    }

    return (
        <form>
            <FormRow>
                <p> NFT 발행 전 창작자 신원 인증을 진행합니다.</p>
                <p>에셋 창작자의 인증서(VP)를 입력 해주세요.</p>
            </FormRow>
            <FormRow>
                <Flex gap={4} column>
                    {popupState?.creatorList?.map((creator, idx) => (
                        <div
                            key={'area-' + idx}
                            className="w-full bg-jacarta-100 px-2 rounded-md overflow-hidden"
                        >
                            <h1 className="my-2 ml-1">{creator?.creatorId?.value}</h1>
                            <TextArea
                                rows={3}
                                name={creator?.creatorId?.value}
                                onChange={onChange}
                                isValid={Boolean(
                                    formState[creator?.creatorId?.value]?.error
                                )}
                            />
                        </div>
                    ))}
                </Flex>
            </FormRow>
            <FormRow>
                <Button onClick={handleSubmit} isLoading={isLoading} disabled={isLoading}>
                    인증
                </Button>
            </FormRow>
        </form>
    )
}

export default AssetCheckUserForm
