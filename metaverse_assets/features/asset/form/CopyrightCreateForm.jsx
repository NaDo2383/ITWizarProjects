import useCheckbox, {
    useCheckboxGroup,
} from 'a/components/ui/form/elements/checkbox/useCheckbox'
import useForm from 'a/components/ui/form/store/useForm'
import React, { useState, useEffect } from 'react'
import useAsset from '../useAsset'
import { DetailSectionHeader } from 'a/components/ui/typography/header'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import CheckboxGroup from 'a/components/ui/form/elements/checkbox/CheckboxGroup'
import Checkbox from 'a/components/ui/form/elements/checkbox/Checkbox'
import FormRow from 'a/components/ui/form/FormRow'
import { MinusBtn, PlussBtn } from 'a/components/ui/button/PlussBtn'
import InputText from 'a/components/ui/form/elements/input/InputText'
import InputNumber from 'a/components/ui/form/elements/input/InputNumber'
import Button from 'a/components/ui/button/Button'
import { FormTitle } from '../popup/LicenseAgreementForm'
import { licenseTypes } from 'a/libs/constants'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
// import useUser from 'a/features/user/useUser'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'
import useWeb3 from 'a/common/web3/useWeb3'
import coprightContractAddress from 'a/common/blockchain/contracts/CopyrightNFT/location.json'
function CopyrightCreateForm() {
    const { transformedCheckboxGroup: licenseItems } = useCheckboxGroup(licenseTypes)
    const [isLoading, setIsLoading] = useState(false)
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { globalItems, setGlobalItems, web3Items } = useGlobalCtx()
    const { setActiveTabId } = useTabCtx()
    const { copyrightMint, checkNetwork } = useWeb3()
    const [initialFormState] = useState({
        licenseItems,
        copyrightHolders: [
            {
                creatorName: { value: null, error: null },
                creatorId: { value: null, error: null },
                share: { value: null, error: null },
            },
        ],
    })

    const { formState, onChangeGroupList } = useForm(initialFormState)
    const {
        addField,
        removeField,
        onChangeField,
        bindCopyrightsToUsers,
        copyrightToken,
    } = useAsset(formState, onChangeGroupList)
    const { getCheckedList } = useCheckbox()
    // const { checkUserIds } = useUser()

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const checkedLicenses = getCheckedList(formState?.licenseItems)
            const checkedLicenseIds = checkedLicenses.map(
                (license) => license?.item?.id + 1
            )

            if (checkedLicenses?.length === 0) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '저작권 유형을 선택해 주세요.',
                })
                return
            }

            const copyrightHolders = []
            const copyrightHolderUserNames = []
            const copyrightHolderNames = []
            const copyrightHolderStakes = []
            const createrShare = []
            let sumOfShare = 0
            let isShareLessThan100 = true

            if (formState?.copyrightHolders?.length > 1) {
                for (let i = 0; i < formState?.copyrightHolders?.length; i++) {
                    createrShare.push(+formState?.copyrightHolders[i]?.share.value)
                    sumOfShare += +formState?.copyrightHolders[i]?.share.value
                    if (sumOfShare > 100) {
                        isShareLessThan100 = false
                    }
                }
            } else {
                createrShare.push(+formState?.copyrightHolders[0]?.share.value)
                sumOfShare += +formState?.copyrightHolders[0]?.share.value
                if (sumOfShare > 100) {
                    isShareLessThan100 = false
                }
            }

            if (!isShareLessThan100) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '지분의 총 합은 100이 되어야 합니다.',
                })
                return
            }

            let isValueAtHolderINformation = true

            formState?.copyrightHolders?.forEach((holder) => {
                if (!holder?.share?.value) {
                    showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                        message: '지분을 입력해주세요.',
                    })
                    isValueAtHolderINformation = false
                    return
                }
                if (!holder?.creatorName?.value || !holder?.creatorId?.value) {
                    showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                        message: '저작권자 정보를 입력해주세요.',
                    })
                    isValueAtHolderINformation = false
                    return
                }
            })

            if (!isValueAtHolderINformation) {
                return
            }

            for (let copyrightHolder of formState?.copyrightHolders) {
                const item = {
                    username: copyrightHolder.creatorId?.value,
                    name: copyrightHolder.creatorName?.value,
                    holdStake: copyrightHolder.share?.value,
                }
                copyrightHolders.push(item)
                copyrightHolderUserNames.push(item.username)
                copyrightHolderNames.push(item.name)
                copyrightHolderStakes.push(+item.holdStake)
            }

            // const allIdsAreReal = await checkUserIds(copyrightHolderUserNames)
            // if (!allIdsAreReal?.users) return

            // console.log('allIdsAreReal?.users', allIdsAreReal?.users)
            if (formState?.copyrightHolders?.length > 0) {
                const copyrightHoldersForHerlen = copyrightHolders.map((copyright) => ({
                    username: copyright.username,
                    name: copyright.name,
                }))
                const payload = {
                    assetId: globalItems?.stepperForm?.assetId,
                    copyrightTypes: checkedLicenseIds,
                    copyrightHolders: copyrightHoldersForHerlen,
                }
                const bindCopyrightRes = await bindCopyrightsToUsers(payload)
                if (bindCopyrightRes?.status === 200) {
                    // энд safeMint дуудагдана
                    const { web3 } = web3Items
                    const accounts = await web3.eth.getAccounts()
                    const tokenId = globalItems?.stepperForm?.token

                    const checkedLicensesIntoBlockChain = checkedLicenses.map(
                        (license) => license?.item?.id
                    )

                    const payload = {
                        to: accounts[0],
                        srcTokenId: tokenId,
                        copyrightOnwerNames: copyrightHolderNames,
                        copyrightOwnerIds: copyrightHolderUserNames,
                        copyrightOwnerStakes: copyrightHolderStakes,
                        copyrightTypes: checkedLicensesIntoBlockChain,
                    }
                    const safeMint = await copyrightMint(payload)
                    if (!safeMint) {
                        showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                            message:
                                '블록체인에서 저작권 거래를 하는 동안 문제가 발생했습니다.',
                        })
                        return
                    }

                    const token = safeMint?.events?.Minted?.returnValues?.tokenId
                    const copyrightTokenPayload = {
                        assetId: globalItems?.stepperForm?.assetId,
                        assetNftId: globalItems?.stepperForm?.assetNftId,
                        token,
                        contractAddress: coprightContractAddress.address,
                        transactionHash: safeMint?.transactionHash,
                        ownerAddress: accounts[0],
                        copyrightHolders: copyrightHolders,
                        copyrightTypes: checkedLicenseIds,
                    }
                    const copyrightTokenRes = await copyrightToken(copyrightTokenPayload)
                    if (copyrightTokenRes?.status === 200) {
                        setGlobalItems((prev) => ({
                            ...prev,
                            stepperForm: {
                                ...prev.stepperForm,
                                checkedLicenses,
                                // token,
                            },
                        }))
                        setActiveTabId(2)
                    } else {
                        showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                            message: 'something went wrong copyright token process',
                        })
                    }
                }
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
                저작권 토큰 발행
            </DetailSectionHeader>
            <FormRow>
                <FormTitle className="mb-4">저작권 유형</FormTitle>
                <CheckboxGroup groupName="licenseItems">
                    {licenseTypes.map((license, idx) => (
                        <Checkbox
                            key={'flatform-group-' + idx}
                            name={license.name}
                            label={license.krName}
                            item={license}
                            checked={
                                license.checked ||
                                Boolean(formState?.[license.name]?.value)
                            }
                        />
                    ))}
                </CheckboxGroup>
            </FormRow>
            <FormRow>
                <FormTitle className="mb-4">저작권자 정보</FormTitle>
                <Flex
                    gap={5}
                    column={true}
                    className={`flex gap-4 ${
                        formState?.copyrightHolders?.length > 2 && 'overflow-y-scroll'
                    }`}
                    style={{ maxHeight: '110px', overflow: 'auto' }}
                >
                    {formState?.copyrightHolders?.length > 0 &&
                        formState?.copyrightHolders?.map((creator, idx) => (
                            <Flex key={'creator-field' + idx} gap={4} align="center">
                                {idx === 0 ? (
                                    <PlussBtn
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addField('copyrightHolders')
                                        }}
                                    />
                                ) : (
                                    <MinusBtn
                                        onClick={(e) => {
                                            e.preventDefault()
                                            removeField(idx, 'copyrightHolders')
                                        }}
                                    />
                                )}
                                <InputText
                                    name="creatorName"
                                    value={
                                        formState?.copyrightHolders[idx]?.creatorName
                                            ?.value
                                    }
                                    placeholder="저작권자 이름"
                                    onChange={(e) =>
                                        onChangeField(e, idx, 'copyrightHolders')
                                    }
                                />
                                <InputText
                                    name="creatorId"
                                    value={
                                        formState?.copyrightHolders[idx]?.creatorId?.value
                                    }
                                    placeholder="저작권자 ID"
                                    onChange={(e) =>
                                        onChangeField(e, idx, 'copyrightHolders')
                                    }
                                />
                                <InputNumber
                                    name="share"
                                    value={
                                        formState?.copyrightHolders[idx]?.share?.value ||
                                        null
                                    }
                                    onChange={(e) =>
                                        onChangeField(e, idx, 'copyrightHolders')
                                    }
                                    width={120}
                                    placeholder="지분"
                                    max={100}
                                />
                            </Flex>
                        ))}
                </Flex>
            </FormRow>
            <Flex className="justify-center">
                <Button
                    onClick={handleSubmit}
                    width={200}
                    isLoading={isLoading}
                    disabled={isLoading}
                >
                    발행
                </Button>
            </Flex>
        </form>
    )
}

export default CopyrightCreateForm
