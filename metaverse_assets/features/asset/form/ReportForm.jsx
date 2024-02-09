import { usePopupCtx } from 'a/common/popup/usePopupCtx'
import Button from 'a/components/ui/button/Button'
import GhostBtn from 'a/components/ui/button/GhostBtn'
import FormRow from 'a/components/ui/form/FormRow'
import RadioGroup from 'a/components/ui/form/elements/radio/Radio'
import TextArea from 'a/components/ui/form/elements/textArea/TextArea'
import useForm from 'a/components/ui/form/store/useForm'
import React from 'react'
import useAsset from '../useAsset'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'

export const reportRypes = [
    {
        label: '성적인 콘텐츠',
        value: 'SEXUAL_CONTENT',
        checked: false,
    },
    {
        label: '폭력적 또는 혐오스러운 콘텐츠',
        value: 'VIOLENT_OR_HATEFUL_CONTENT',
        checked: false,
    },
    {
        label: '증오 또는 악의적인 콘텐츠',
        value: 'HATE_OR_MALICIOUS_CONTENT',
        checked: false,
    },
    {
        label: '유해하거나 위험한 행위',
        value: 'AN_ACT_OF_HARM_OR_DANGER',
        checked: false,
    },
    {
        label: '잘못된 정보',
        value: 'INCORRECT_INFORMATION',
        checked: false,
    },
    {
        label: '아동 학대',
        value: 'CHILD_ABUSE',
        checked: false,
    },
    {
        label: '테러 조장',
        value: 'PROMOTION_OF_TERRORISM',
        checked: false,
    },
    {
        label: '스팸 또는 혼동을 야기하는 콘텐츠',
        value: 'CONTENT_THAT_CAUSES_SPAM_OR_CONFUSION',
        checked: false,
    },
    {
        label: '법적 문제',
        value: 'A_LEGAL_MATTER',
        checked: false,
    },
]

const initialExampleFormState = {
    reason: { value: null, error: null },
    reportType: { value: 'SEXUAL_CONTENT', error: null },
}

export default function ReportForm() {
    const { onChange, formState } = useForm(initialExampleFormState)
    const { popupState, hideAllPopups } = usePopupCtx()
    const { sendReport } = useAsset()
    const { showGlobalPopup } = useGlobalPopupCtx()

    async function sendReportFunction(e) {
        e.preventDefault()
        const payload = {
            reason: formState.reportType.value,
            description: formState.reason.value,
        }

        const res = await sendReport(popupState?.reportingAssetId, payload)
        if (res?.status === 200 && res?.data?.message === 'success') {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: '신고 접수가 완료되었습니다.',
            })
            hideAllPopups()
        } else {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: '신고가 접수되지 않았습니다.',
            })
        }
    }

    return (
        <form>
            <FormRow>
                <RadioGroup
                    name={'reportType'}
                    options={reportRypes}
                    onChange={onChange}
                    defaultValue={reportRypes[0].value}
                    className={'flex-col'}
                />
            </FormRow>
            <FormRow>
                <TextArea
                    name="reason"
                    onChange={onChange}
                    placeholder="신고사유를 구체적으로 적어주세요."
                    cols={15}
                />
            </FormRow>
            <FormRow className={'flex-row gap-3'}>
                <Button onClick={(e) => sendReportFunction(e)}>신고</Button>
                <GhostBtn
                    className="w-full border rounded-full"
                    onClick={() => hideAllPopups()}
                >
                    취소
                </GhostBtn>
            </FormRow>
        </form>
    )
}
