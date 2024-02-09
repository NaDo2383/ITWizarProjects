import React from 'react'
import Button from '@/components/ui/button/Button'
import InputText from '@/components/ui/form/elements/input/InputText'
import useForm from '@/components/ui/form/store/useForm'
import { useState } from 'react'
import { useGlobalPopupCtx } from '@/common/popup/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from '@/common/popup/globalPopupRegistration'

function ExistingCertificationForm() {

    const [initialIdentityAuthFormState] = useState({
        tokenId: { value: '', error: null },
    })
    const { onChange, formState, onError } = useForm(initialIdentityAuthFormState)
    const { showGlobalPopup } = useGlobalPopupCtx()

    async function onSubmit(e) {
        e.preventDefault()
        showGlobalPopup(GLOBAL_POPUP_TYPES.VERIFICATION_COMPLETE)
    }

    return (
        <form>
            <div className="table-item">
                <InputText
                    name={'tokenId'}
                    onChange={onChange}
                    value={formState?.tokenId?.value}
                    isValid={Boolean(formState?.tokenId?.error)}
                    placeholder={"Token ID"}
                />
            </div>
            <div className="table-item">
                <Button onClick={onSubmit}>
                    인증
                </Button>
            </div>
        </form>
    )
}

export default ExistingCertificationForm