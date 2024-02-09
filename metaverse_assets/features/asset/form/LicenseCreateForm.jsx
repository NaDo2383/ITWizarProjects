import FormRow from 'a/components/ui/form/FormRow'
import { DetailSectionHeader } from 'a/components/ui/typography/header'
import React, { useEffect, useState } from 'react'
import { FormTitle } from '../popup/LicenseAgreementForm'
import useForm from 'a/components/ui/form/store/useForm'
import tw from 'tailwind-styled-components'
import Checkbox from 'a/components/ui/form/elements/checkbox/Checkbox'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import InputText from 'a/components/ui/form/elements/input/InputText'
import TextArea from 'a/components/ui/form/elements/textArea/TextArea'
import Button from 'a/components/ui/button/Button'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import useAsset from '../useAsset'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
//import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'
import useWeb3 from 'a/common/web3/useWeb3'
// import useUser from 'a/features/user/useUser'
import { useRouter } from 'next/router'
import { validateForm } from 'a/common/validation/validate'
import { licenseCreateFormSchema } from './licenseCreateFormSchema'

function LicenseCreateForm() {
    const { push } = useRouter()
    const { globalItems } = useGlobalCtx()
    const [isLoading, setIsLoading] = useState(false)
    const { saveAssetLicense } = useAsset()
    const { showGlobalPopup } = useGlobalPopupCtx()
    //const { setActiveTabId } = useTabCtx()
    const { checkNetwork } = useWeb3()
    // const { checkId } = useUser()
    const checkedLicenses = []
    if (globalItems?.stepperForm?.checkedLicenses) {
        for (let license of globalItems?.stepperForm?.checkedLicenses) {
            checkedLicenses.push(license.item)
        }
    }

    const [initialFormState] = useState({
        userName: {
            value: null,
            error: null,
        },
        userID: {
            value: null,
            error: null,
        },
        commercialAllowed: {
            value: false,
            error: null,
        },
        resaleAllowed: {
            value: false,
            error: null,
        },
        lriif: {
            value: null,
            error: null,
        },
    })
    const { formState, onChange, onError } = useForm(initialFormState)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const { success, errors } = await validateForm(
                licenseCreateFormSchema,
                formState
            )
            if (!success) {
                onError(errors)
                return
            }
            // const checkUserIdRes = await checkId(formState?.userID?.value)
            // if (checkUserIdRes?.status !== 200) {
            //     showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
            //         message: 'this user is not exist!',
            //     })
            //     return
            // }

            const assetLicensePayload = {
                commercialAllowed: formState?.commercialAllowed?.value === 'true',
                resaleAllowed: formState?.resaleAllowed?.value === 'true',
                lriif: formState?.lriif.value,
                userId: formState?.userID?.value,
                username: formState?.userName?.value,
            }
            const assetId = globalItems?.stepperForm?.assetId

            const assetLicenseRes = await saveAssetLicense(assetLicensePayload, assetId)
            if (assetLicenseRes.status === 200) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '라이선스 정보 등록되었습니다.',
                })
                push('/asset/' + globalItems?.stepperForm?.assetId)
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Sorry: cant create license',
                })
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkNetwork().then((chainId) => {
            if (chainId !== '2021') {
                showGlobalPopup(GLOBAL_POPUP_TYPES.CHANGE_NETWORK)
            }
        })
    }, [])

    return (
        <form style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
            <DetailSectionHeader className="text-center mb-10">
                라이선스 정보 등록
            </DetailSectionHeader>
            <FormMainTitle>
                에셋 이름: {globalItems?.stepperForm?.assetName}
            </FormMainTitle>
            {/*<button onClick={() => setActiveTabId(1)}>back</button>*/}
            <FormRow>
                <FormTitle className="mb-4">저작권 유형</FormTitle>
                <Flex gap={5}>
                    {checkedLicenses?.length > 0 &&
                        checkedLicenses.map((license, idx) => (
                            <Checkbox
                                key={'copyright-type-' + idx}
                                name={license.name}
                                label={license.krName}
                                checked={true}
                                item={license}
                                disabled
                            />
                        ))}
                </Flex>
            </FormRow>
            <FormRow>
                <FormTitle className="mb-4">라이선스 정보</FormTitle>
                <Flex gap={2} className="gap-4">
                    <InputText
                        onChange={onChange}
                        name={'userName'}
                        value={formState?.userName?.value}
                        isValid={Boolean(formState?.userName?.error)}
                        placeholder={'이용자 이름'}
                    />
                    <InputText
                        onChange={onChange}
                        name={'userID'}
                        value={formState?.userID?.value}
                        isValid={Boolean(formState?.userID?.error)}
                        placeholder={'이용자 아이디'}
                    />
                </Flex>
            </FormRow>
            <FormRow>
                <FormTitle className="mb-4">라이선스 조건</FormTitle>
                <Flex gap={2}>
                    <Checkbox
                        key={'commercialAllowed-1'}
                        name={'commercialAllowed'}
                        label={'재판매 가능'}
                        checked={Boolean(formState?.commercialAllowed?.value)}
                        onChange={onChange}
                    />
                    <Checkbox
                        key={'resaleAllowed-1'}
                        name={'resaleAllowed'}
                        label={'수익화 가능'}
                        checked={Boolean(formState?.resaleAllowed?.value)}
                        onChange={onChange}
                    />
                </Flex>
            </FormRow>
            <FormRow>
                <TextArea
                    name={'lriif'}
                    onChange={onChange}
                    value={formState?.lriif?.value}
                    isValid={Boolean(formState?.lriif?.error)}
                    placeholder={'라이선스 계약서(LRIIF)를 작성해주세요.'}
                />
            </FormRow>
            <Flex className="justify-center">
                <Button
                    onClick={handleSubmit}
                    width={200}
                    isLoading={isLoading}
                    disabled={isLoading}
                >
                    등록
                </Button>
            </Flex>
        </form>
    )
}

export const FormMainTitle = tw.h3`
    text-lg
    font-bold
    mb-2
`
export default LicenseCreateForm
