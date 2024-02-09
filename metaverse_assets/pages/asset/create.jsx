import { PopupProvider } from 'a/common/popup/usePopupCtx'
import { Wrapper } from 'a/components/ui/containers/Wrapper'
import StepperTab from 'a/features/asset/tab/stepperTab/StepperTab'
import React from 'react'

function CreatePage() {
    return (
        <PopupProvider>
            <Wrapper>
                <StepperTab />
            </Wrapper>
        </PopupProvider>
    )
}

export default CreatePage
