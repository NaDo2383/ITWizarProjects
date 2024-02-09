import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import Button from 'a/components/ui/button/Button'
import { OutlineBtn } from 'a/components/ui/button/OutlineBtn'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import FormRow from 'a/components/ui/form/FormRow'
//import InputNumber from 'a/components/ui/form/elements/input/InputNumber'
import InputText from 'a/components/ui/form/elements/input/InputText'
import ImageViewer from 'a/components/ui/form/elements/input/file/ImageViewer'
import InputFileUi from 'a/components/ui/form/elements/input/file/choices/InputFileUi'
import TextArea from 'a/components/ui/form/elements/textArea/TextArea'
import useForm from 'a/components/ui/form/store/useForm'
import { Label } from 'a/components/ui/typography/Label'
import useUser from 'a/features/user/useUser'
import { useUserCtx } from 'a/features/user/useUserCtx'
import React, { useCallback, useEffect, useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { profileFormSchema } from './profileSchema'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import { validateForm } from 'a/common/validation/validate'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
import Image from 'next/image'

export default function ProfileEditForm() {
    const [btnLoading, setBtnLoading] = useState({
        isUpdateBtnLoading: false,
    })

    const { web3Items, setMyPageState, myPageState, setAuthState } = useGlobalCtx()
    const [loggedWallet, setLoggedWallet] = useState(null)
    useEffect(() => {
        web3Items.web3.eth.getAccounts().then((accounts) => setLoggedWallet(accounts[0]))
    }, [])

    const { showGlobalPopup } = useGlobalPopupCtx()
    const { userInfo, setUserInfo } = useUserCtx()
    const { updateUserInfo, updateWallet } = useUser()
    const [initialProfileFormData, setInitialProfileFormData] = useState(null)
    const [willDeleteImg, setWillDeleteImg] = useState('N')

    useEffect(() => {
        const initialFormTimer = setTimeout(() => {
            if (userInfo) {
                setInitialProfileFormData({
                    profile_image: { value: userInfo?.image?.url, error: null },
                    name: { value: userInfo?.name, error: null },
                    address: { value: userInfo?.address, error: null },
                    phone: { value: userInfo?.phone, error: null },
                    introduce: { value: userInfo?.introduce, error: null },
                })
            }
        }, 500)
        return () => clearTimeout(initialFormTimer)
    }, [])

    const { onChange, formState, onError, setValueField, onChangeFile } =
        useForm(initialProfileFormData)

    const toggleEditProfile = useCallback(() => {
        setMyPageState((prev) => ({
            ...prev,
            isProfileEdit: !prev?.isProfileEdit,
        }))
    }, [])

    async function onSubmit(e) {
        e.preventDefault()
        setBtnLoading((prev) => ({
            ...prev,
            isUpdateBtnLoading: true,
        }))
        try {
            const editedProfile = {
                profile_image: formState?.profile_image?.value,
                name: formState?.name?.value,
                address: formState?.address?.value,
                phone: formState?.phone?.value,
                introduce: formState?.introduce?.value,
            }
            const theFormState = {
                ...formState,
                phone: {
                    value: formState?.phone?.value,
                    error: null,
                },
            }

            const { success, errors } = await validateForm(
                profileFormSchema,
                theFormState
            )
            if (!success) {
                onError(errors)
                return
            }

            const formData = new FormData()
            formData.append('name', editedProfile.name)
            formData.append('address', editedProfile.address)
            formData.append('phone', editedProfile.phone)
            formData.append('introduce', editedProfile.introduce)
            typeof formState?.profile_image?.value === 'object' &&
                formState?.profile_image?.value &&
                formData.append('image', editedProfile.profile_image)
            willDeleteImg === 'Y' && formData.append('delFile', willDeleteImg)

            const res = await updateUserInfo(formData)

            if (res.status === 200) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '프로필이 업데이트되었습니다!',
                })
                toggleEditProfile()
                setUserInfo((prev) => ({
                    ...prev,
                    ...res?.data?.result,
                }))
                return
            }
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading((prev) => ({
                ...prev,
                isUpdateBtnLoading: false,
            }))
        }
    }

    function handleButton(e) {
        e.preventDefault()
        if (myPageState?.isProfileEdit) {
            onSubmit(e)
            return
        }
        toggleEditProfile()
    }

    function handleBack(e) {
        e.preventDefault()
        toggleEditProfile()
    }

    async function handleAddWalletAddress(e) {
        e.preventDefault()
        const walletPayload = {
            walletAddress: loggedWallet,
        }
        const res = await updateWallet(walletPayload)
        if (res.status === 200) {
            setAuthState((prev) => ({
                ...prev,
                walletAddress: walletPayload.loggedWallet,
            }))
            setUserInfo((prev) => ({
                ...prev,
                walletAddress: walletPayload.loggedWallet,
            }))

            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: '지갑 주소가 성공적으로 업데이트되었습니다.',
            })
        }
        if (res.status === 400) {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: `Web3 지갑 주소를 변경할 수 없습니다.`,
            })
        }
    }

    function handleChangeDefaultImg(e) {
        e.preventDefault()
        setValueField('profile_image', null)
        setWillDeleteImg('Y')
    }

    console.log(formState)
    return (
        <form>
            <Flex className="mb-30">
                <div className="flex gap-3 w-full justify-end pb-2">
                    <OutlineBtn style={{ width: '200px' }} onClick={handleBack}>
                        뒤로가기
                    </OutlineBtn>
                    <Button
                        onClick={handleButton}
                        width={200}
                        isLoading={btnLoading.isUpdateBtnLoading}
                    >
                        저장하기
                    </Button>
                </div>
            </Flex>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">프로필 사진</Label>
                    <Flex align="center" gap={4}>
                        <>
                            {formState?.profile_image?.value ? (
                                <>
                                    {typeof formState?.profile_image?.value ===
                                    'object' ? (
                                        <ImageViewer
                                            alt="profile-image"
                                            file={formState?.profile_image?.value}
                                            width={100}
                                            height={100}
                                        />
                                    ) : (
                                        <Image
                                            alt=""
                                            src={formState?.profile_image?.value}
                                            width={100}
                                            height={100}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <BiUserCircle fontSize={70} />
                                </>
                            )}
                        </>
                        <div className="flex w-full gap-4">
                            <InputFileUi
                                name="profile_image"
                                placeholder="사진 업로드"
                                onChange={onChangeFile}
                                width={180}
                            />
                            <OutlineBtn width={200} onClick={handleChangeDefaultImg}>
                                기본 이미지로 변경
                            </OutlineBtn>
                        </div>
                    </Flex>
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">사용자 이름</Label>
                    <InputText
                        name={'name'}
                        onChange={onChange}
                        value={formState?.name?.value}
                        isValid={Boolean(formState?.name?.error)}
                        placeholder="닉네임을 입력해주세요."
                    />
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">주소</Label>
                    <InputText
                        name={'address'}
                        onChange={onChange}
                        value={formState?.address?.value}
                        isValid={Boolean(formState?.address?.error)}
                        placeholder="주소를 입력해주세요."
                    />
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">연락처</Label>
                    <Flex className="flex-col justify-end">
                        <InputText
                            name={'phone'}
                            onChange={onChange}
                            value={formState?.phone?.value}
                            isValid={Boolean(formState?.phone?.error)}
                            placeholder="전화번호를 입력해주세요"
                        />
                        {/*
                      <p className=" text-red justify-end">{formState?.phone?.error}</p>
                      */}
                    </Flex>
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2}>
                    <Label className="w-[30%]" align="center">
                        자기소개
                    </Label>
                    <TextArea
                        name="introduce"
                        cols={15}
                        onChange={onChange}
                        placeholder="자기소개를 입력해주세요."
                        value={formState?.introduce?.value}
                        isValid={Boolean(formState?.introduce?.error)}
                    />
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">Web3 지갑</Label>
                    <OutlineBtn onClick={handleAddWalletAddress}>
                        {userInfo?.walletAddress ? (
                            userInfo?.walletAddress
                        ) : (
                            <>
                                {loggedWallet
                                    ? '지갑 주소로 프로필을 업데이트해주세요! 저장하기 버튼을 클릭하세요.'
                                    : '메타마스크에 로그인해주세요!'}
                            </>
                        )}
                    </OutlineBtn>
                </Flex>
            </FormRow>
        </form>
    )
}
