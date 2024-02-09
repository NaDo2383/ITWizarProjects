import { Flex } from 'a/components/ui/containers/flex/Flex'
import useForm from 'a/components/ui/form/store/useForm'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import InputText from 'a/components/ui/form/elements/input/InputText'
import FileUploadIcon from 'a/components/ui/icon/FileUploadIcon'
import { Label } from 'a/components/ui/typography/Label'
import TextArea from 'a/components/ui/form/elements/textArea/TextArea'
import useAsset from '../useAsset'
import { MinusBtn, PlussBtn } from 'a/components/ui/button/PlussBtn'
import Button from 'a/components/ui/button/Button'
import ImageViewer from 'a/components/ui/form/elements/input/file/ImageViewer'
import InputFileUi from 'a/components/ui/form/elements/input/file/choices/InputFileUi'
import { DetailSectionHeader } from 'a/components/ui/typography/header'
import { FormTitle } from '../popup/LicenseAgreementForm'
import Radio from 'a/components/ui/form/elements/radio/Radio'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import useUser from 'a/features/user/useUser'
import { validateForm } from 'a/common/validation/validate'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
import { assetFormSchema } from './assetFormSchema'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import { useTabCtx } from 'a/components/ui/tab/store/useTabCtx'
import useWeb3 from 'a/common/web3/useWeb3'
import { generateHash } from 'a/common/hash/generateHash'
import assetContractAddress from 'common/blockchain/contracts/AssetNFT/location.json'
import { useUserCtx } from 'a/features/user/useUserCtx'
import { checkFileExtension } from 'a/libs/utils/file'

// export const flatFormRadio = [
//     {
//         label: 'Unity',
//         value: 'Unity',
//     },
//     {
//         label: 'Unreal',
//         value: 'Unreal',
//     },
//     {
//         label: 'WebXR',
//         value: 'WebXR',
//     },
// ]

function AssetCreateForm() {
    const [isLoading, setIsLoading] = useState(false)
    const { setActiveTabId } = useTabCtx()
    const { setGlobalItems, web3Items } = useGlobalCtx()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { saveAsset, saveAssetNft } = useUser()
    const { userInfo } = useUserCtx()
    const { getPlatformList } = useAsset()

    const { assetMint, checkNetwork } = useWeb3()
    const [flatFormRadio, setFlatFormRadio] = useState([])
    useEffect(() => {
        getPlatformList().then((res) => {
            const tempArr = []
            res.map((platform) => {
                tempArr.push({
                    label: platform.name,
                    value: platform.id.toString(),
                })
            })
            setFlatFormRadio(tempArr)
        })
    }, [])

    const [initialAssetFormState] = useState({
        image: { value: null, error: null },
        thumbnail: { value: null, error: null },
        platformType: { value: '1', error: null },
        assetName: { value: null, error: null },
        assetURL: { value: null, error: null },
        description: { value: null, error: null },
        tags: { value: null, error: null },
        creatorList: [
            {
                creatorName: { value: null, error: null },
                creatorId: { value: null, error: null },
            },
        ],
    })

    const {
        onChange,
        formState,
        onChangeGroupList,
        onChangeFile,
        setErrorField,
        resetFormField,
        onError,
    } = useForm(initialAssetFormState)

    const { addCreatorField, removeCreatorField, onChangeCreatorField } = useAsset(
        formState,
        onChangeGroupList
    )

    function handleFileInput(e) {
        onChangeFile(e)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            // check assetUserIDs code
            // const generatedCheckUserFormState = {}
            // for (let creator of formState?.creatorList) {
            //     generatedCheckUserFormState[creator.creatorId.value] = {
            //         value: null,
            //         error: null,
            //     }
            // }
            // showPopup(POPUP_TYPES.ASSET_CHECK_USER)
            // setPopupState((prev) => ({
            //     ...prev,
            //     creatorList: formState?.creatorList,
            //     generatedCheckUserFormState,
            // }))
            //end of check assetUserIDs code

            checkNetwork().then((chainId) => {
                if (chainId !== '2021') {
                    showGlobalPopup(GLOBAL_POPUP_TYPES.CHANGE_NETWORK)
                }
            })

            if (!userInfo.walletAddress) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Please register your wallet address!',
                })
                return
            }

            if (!formState?.thumbnail?.value) {
                setErrorField('thumbnail', 'please insert thumbnail file')
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '썸네일 이미지를 삽입해주세요.',
                })
                return
            }

            let isValueAtHolderINformation = true

            formState?.creatorList?.forEach((holder) => {
                if (!holder?.creatorName?.value || !holder?.creatorId?.value) {
                    showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                        message: '창작자 정보를 입력해주세요.',
                    })
                    isValueAtHolderINformation = false
                    return
                }
            })

            if (!isValueAtHolderINformation) {
                return
            }

            if (!formState?.image?.value) {
                setErrorField('image', 'please insert image file')
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '에셋 파일을 등록 해주세요.',
                })
                return
            }
            const { success, errors } = await validateForm(assetFormSchema, formState)

            if (!success) {
                onError(errors)
                return
            }
            if (formState?.creatorList?.length === 0) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'please insert creator list',
                })
                return
            }

            const formData = {
                thumbnail: formState?.thumbnail?.value,
                image: formState?.image?.value,
                platformId: formState?.platformType?.value,
                title: formState?.assetName?.value,
                assetURL: formState?.assetURL?.value,
                description: formState?.description?.value,
                tags: formState?.tags?.value,
            }

            const form = new FormData()
            form.append('thumbnail', formData?.thumbnail)
            form.append('image', formData?.image)
            form.append('platformId', +formData?.platformId)
            form.append('title', formData?.title)
            form.append('description', formData?.description)

            formState?.tags?.value?.split(',')?.map((e) => {
                if (e.length > 0) {
                    form.append(`tags[]`, e)
                }
            })

            const creators = []
            const creatorIds = []
            const creatorNames = []
            for (let i = 0; i < formState?.creatorList?.length; i++) {
                const creatorId = formState?.creatorList[i]?.creatorId?.value
                creators.push({
                    username: creatorId,
                    name: formState?.creatorList[i]?.creatorName?.value,
                })
                creatorIds.push(creatorId)
                creatorNames.push(formState?.creatorList[i]?.creatorName?.value)
            }
            // const allIdsAreReal = await checkUserIds(creatorIds)

            if (formState?.creatorList?.length > 0) {
                for (let i = 0; i < formState?.creatorList?.length; i++) {
                    form.append(
                        `creatorIds[]`,
                        formState?.creatorList[i]?.creatorId?.value
                    )
                    form.append(
                        `creatorNames[]`,
                        formState?.creatorList[i]?.creatorName?.value
                    )
                }
            }

            const res = await saveAsset(form)

            if (res?.status === 200) {
                const { web3 } = web3Items
                const accounts = await web3.eth.getAccounts()
                const assetId = res?.data?.result?.id
                const assetName = res?.data?.result?.title
                const assetDescription = res?.data?.result?.description
                const assetIpfsUrl = res?.data?.result?.ipfsUrl
                const ipfsMetaData = await fetch(assetIpfsUrl)
                const { image } = await ipfsMetaData.json()
                const ipfsUrl = image.replace('ipfs://', 'https://ipfs.io/ipfs/')
                const assetHash = await generateHash(ipfsUrl)

                const safeMintPayload = {
                    to: accounts[0],
                    assetInfos: [
                        assetName,
                        assetDescription,
                        ipfsUrl,
                        assetHash,
                        'assetDNA',
                    ],
                    creatorNames,
                    creatorIds,
                    validityInfos: [false, false],
                }
                const safeMint = await assetMint(safeMintPayload)

                const token = safeMint?.events?.Minted?.returnValues?.tokenId
                const assetContractAddr = assetContractAddress.address
                const transactionHash = safeMint?.transactionHash
                const tagArray = res?.data?.result?.tags
                const tags = []
                if (tagArray?.length > 0) {
                    for (let tag of tagArray) {
                        tags.push(tag.id)
                    }
                }

                const metaData = {
                    assetId,
                    token,
                    contractAddress: assetContractAddr,
                    transactionHash,
                    ownerAddress: accounts[0],
                    assetName,
                    assetUrl: ipfsUrl,
                    description: assetDescription,
                    creators: creators,
                    tags,
                }

                const savedAssetRes = await saveAssetNft(metaData)

                if (savedAssetRes?.status === 200) {
                    const assetNftId = savedAssetRes?.data?.result.id
                    setGlobalItems((prev) => ({
                        ...prev,
                        stepperForm: { ...metaData, assetNftId },
                    }))
                    setActiveTabId(1)
                    return
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

    useEffect(() => {
        if (formState?.thumbnail?.value) {
            const msg = checkFileExtension(formState?.thumbnail?.value)
            if (msg !== 'success') {
                setErrorField('thumbnail', 'not valid file extension')
                resetFormField('thumbnail')
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '파일 확장자가 일치하지 않습니다.',
                })
            }
        }
    }, [formState?.thumbnail?.value])

    return (
        <form style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
            <DetailSectionHeader className="text-center mb-10">
                에셋 NFT 발행
            </DetailSectionHeader>
            <Flex gap={10} className="flex sm:flex-row flex-col">
                <div style={{ minWidth: '326px', minHeight: '300px' }}>
                    <div
                        className={`border-2 ${
                            formState?.thumbnail?.error
                                ? `border-red`
                                : `border-jacarta-100`
                        } dark:border-jacarta-900 rounded-md p-5 mb-5`}
                    >
                        {!formState?.thumbnail?.value && (
                            <div className="flex justify-between py-1 text-black dark:text-white font-bold">
                                <Label className="text-md text-jacarta-700 font-bold dark:text-white">
                                    썸네일 이미지 등록{' '}
                                </Label>
                                <span className="text-sm flex items-center">
                                    (50MB이하)
                                </span>
                            </div>
                        )}
                        <FileUploadSection style={{ minHeight: '300px' }}>
                            <UploadLabel for="asset-thumbnail">
                                <div
                                    className={`absolute top-[50%] left-[50%] z-10 cursor-pointer ${
                                        formState?.thumbnail?.value
                                            ? 'opacity-0'
                                            : 'opacity-100'
                                    }`}
                                >
                                    <FileUploadIcon />
                                    <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                                        JPG, PNG, GIF, SVG
                                    </p>
                                </div>
                                {formState?.thumbnail?.value &&
                                    typeof formState?.thumbnail?.value === 'object' && (
                                        <ImageViewer
                                            alt="artowrkImage"
                                            file={formState?.thumbnail?.value}
                                            width={369}
                                            height={369}
                                            style={{
                                                position: 'absolute',
                                                zIndex: 101,
                                                borderRadius: '20px',
                                                overflow: 'hidden',
                                            }}
                                        />
                                    )}
                                <UploadInputWrapper>
                                    <div className="opacity-0">
                                        <InputFileUi
                                            id="asset-thumbnail"
                                            name="thumbnail"
                                            onChange={handleFileInput}
                                        />
                                    </div>
                                </UploadInputWrapper>
                            </UploadLabel>
                        </FileUploadSection>
                    </div>
                    <div>
                        <Label className="text-md text-jacarta-700 font-bold dark:text-white">
                            에셋 파일 등록 {formState?.image?.value?.name}
                        </Label>
                        <div className="flex justify-center items-center mt-4">
                            <InputFileUi
                                name="image"
                                onChange={handleFileInput}
                                id="ImageInput"
                                wFull
                            />
                        </div>
                    </div>
                </div>
                <InputSection>
                    <FormTitle>사용플랫폼</FormTitle>
                    <div className="flex flex-row gap-2">
                        {flatFormRadio.length !== 0 && (
                            <Radio
                                key={'platformType-radio-group'}
                                name="platformType"
                                options={flatFormRadio}
                                onChange={onChange}
                                defaultValue={flatFormRadio[0].value}
                            />
                        )}
                    </div>
                    <FormTitle className="mb-4">에셋 정보</FormTitle>
                    <Flex gap={4}>
                        <InputText
                            onChange={onChange}
                            name={'assetName'}
                            value={formState?.assetName?.value}
                            isValid={Boolean(formState?.assetName?.error)}
                            placeholder={'에셋 이름'}
                        />
                        <InputText
                            onChange={onChange}
                            name={'assetURL'}
                            value={'에셋 URL'}
                            isValid={Boolean(formState?.assetURL?.error)}
                            placeholder={'에셋 URL'}
                            readOnly
                        />
                    </Flex>
                    <TextArea
                        name={'description'}
                        onChange={onChange}
                        value={formState?.description?.value}
                        isValid={Boolean(formState?.description?.error)}
                        placeholder={'에셋에 대한 설명을 입력해주세요.'}
                    />

                    <FormTitle>태그</FormTitle>
                    <InputText
                        onChange={onChange}
                        name={'tags'}
                        value={formState?.tags?.value}
                        isValid={Boolean(formState?.tags?.error)}
                        // placeholder={'환경, 판타지'}
                    />

                    <FormTitle className="mb-4">창작자 정보</FormTitle>
                    <Flex
                        column={true}
                        className={`flex gap-4 ${
                            formState?.creatorList?.length > 2 && 'overflow-y-scroll'
                        } 
                        `}
                        style={{ maxHeight: '110px', overflow: 'auto' }}
                    >
                        {formState?.creatorList?.length > 0 &&
                            formState?.creatorList?.map((creator, idx) => (
                                <Flex key={'creator-field' + idx} gap={4} align="center">
                                    {idx === 0 ? (
                                        <PlussBtn
                                            onClick={(e) => {
                                                e.preventDefault()
                                                addCreatorField()
                                            }}
                                        />
                                    ) : (
                                        <MinusBtn
                                            onClick={(e) => {
                                                e.preventDefault()
                                                removeCreatorField(idx)
                                            }}
                                        />
                                    )}
                                    <InputText
                                        name="creatorName"
                                        value={
                                            formState?.creatorList[idx]?.creatorName
                                                ?.value
                                        }
                                        placeholder="창작자 이름"
                                        onChange={(e) => onChangeCreatorField(e, idx)}
                                    />
                                    <InputText
                                        name="creatorId"
                                        value={
                                            formState?.creatorList[idx]?.creatorId?.value
                                        }
                                        placeholder="창작자 ID"
                                        onChange={(e) => onChangeCreatorField(e, idx)}
                                    />
                                </Flex>
                            ))}
                    </Flex>
                </InputSection>
            </Flex>
            <Flex className="justify-end mt-10">
                <Button
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    disabled={isLoading}
                    width={200}
                >
                    발행
                </Button>
            </Flex>
        </form>
    )
}

const FileUploadSection = tw.div`
    dark:bg-jacarta-700 
    dark:border-jacarta-600 
    border-jacarta-100 
    group 
    relative 
    rounded-lg 
    border-2 
    border-dashed 
    bg-white 
    overflow-hidden
`

const UploadLabel = tw.label`
    absolute
    top-0
    left-0
    w-full
    h-full
    flex
    flex-col
    gap-4
    items-center
    justify-center
    text-center
`

const InputSection = tw.div`
    w-full
    flex 
    flex-col 
    gap-5 
`

const UploadInputWrapper = tw.div`
    dark:bg-jacarta-600 
    bg-jacarta-50 
    absolute 
    inset-4 
    cursor-pointer 
    rounded 
    opacity-0 
    group-hover:opacity-100
`
export default AssetCreateForm
