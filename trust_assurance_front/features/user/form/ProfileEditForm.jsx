import { useGlobalCtx } from '@/common/global/useGlobalCtx'
import { useMetamaskCtx } from '@/common/metamask/useMetamaskCtx'
import Button from '@/components/ui/button/Button'
import { OutlineBtn } from '@/components/ui/button/OutlineBtn'
import { Flex } from '@/components/ui/containers/flex/Flex'
import InputNumber from '@/components/ui/form/elements/input/InputNumber'
import InputText from '@/components/ui/form/elements/input/InputText'
import ImageViewer from '@/components/ui/form/elements/input/file/ImageViewer'
import InputFileUi from '@/components/ui/form/elements/input/file/choices/InputFileUi'
import TextArea from '@/components/ui/form/elements/textArea/TextArea'
import React, { useCallback, useEffect, useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { useUserCtx } from '../useUserCtx'
import useUser from '../useUser'
import { useGlobalPopupCtx } from '@/common/popup/useGlobalPopupCtx'
import useForm from '@/components/ui/form/store/useForm'
import useFile from '@/components/ui/form/elements/input/file/useFile'
import { getAuthToken } from '@/common/token/token'
import { validateForm } from '@/common/validation/validate'
import { profileFormSchema } from '../myPage/tab/panels/profile/profileSchema'
import { GLOBAL_POPUP_TYPES } from '@/common/popup/globalPopupRegistration'
import useToken from '@/common/token/useToken'
import FieldError from '@/components/ui/form/FieldError'

function ProfileEditForm() {
    const [btnLoading, setBtnLoading] = useState({
        isUpdateBtnLoading: false,
    })
    const { globalItems, setMyPageState, myPageState } = useGlobalCtx()
    const { userInfo, setUserInfo } = useUserCtx()
    const { updateUserInfo } = useUser()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const [token, setToken] = useState();

    const toggleEditProfile = useCallback(() => {
        setMyPageState(prev => ({
            ...prev,
            isProfileEdit: !prev?.isProfileEdit
        }))
    }, [])

    const [initialProfileFormData, setInitialProfileFormData] = useState(null)
    useEffect(() => {
        const initialFormTimer = setTimeout(() => {
            if (userInfo) {
                setInitialProfileFormData({
                    profile_image: { value: userInfo?.profile_image, error: null },
                    name: { value: userInfo?.name, error: null },
                    address: { value: userInfo?.address, error: null },
                    phone: { value: userInfo?.phone, error: null },
                    introduction: { value: userInfo?.introduction, error: null },
                    wallet_address: { value: userInfo?.wallet_address, error: null },
                    nickName: { value: userInfo?.nickname, error: null }
                })
            }
        }, 500)
        return () => clearTimeout(initialFormTimer)
    }, [])

    const {
        onChange,
        formState,
        onError,
        setValueField,
        onChangeFile
    } = useForm(initialProfileFormData)
    const { convertedFile } = useFile(formState?.profile_image?.value)
    const { getAuthToken } = useToken();

    async function onSubmit(e) {
        e.preventDefault()
        setBtnLoading(prev => ({
            ...prev,
            isUpdateBtnLoading: true
        }))
        try {
            getAuthToken().then(async (result) => {
                setToken(result)


                if (result) {
                    const editedProfile = {
                        accessToken: result,
                        profile_image: typeof formState?.profile_image?.value === 'string' ? formState?.profile_image?.value : convertedFile,
                        name: formState?.name?.value,
                        address: formState?.address?.value,
                        phone: formState?.phone?.value,
                        introduction: formState?.introduction?.value,
                        nickname: formState?.nickName?.value
                    }
                    const { success, errors } = await validateForm(profileFormSchema, formState)
                    if (!success) {
                        onError(errors)
                        return
                    }
                    const res = await updateUserInfo(editedProfile)

                    if (res.status === 200) {
                        if (res.data.editInfo || res.data.editInfo === "true") {

                            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, { message: "프로필이 업데이트되었습니다!" })
                            toggleEditProfile()
                            setUserInfo(prev => ({
                                ...prev,
                                ...editedProfile
                            }))
                            return
                        }
                    }
                }
            });
        } catch (e) {
            console.error(e)
        } finally {
            setBtnLoading(prev => ({
                ...prev,
                isUpdateBtnLoading: false
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

    function handleAddWalletAddress() {
        // showPopup(POPUP_TYPES.WALLET_LIST, {
        //     setValueField: (value) => setValueField('wallet_address', value)
        // })
    }

    function handleChangeDefaultImg() {
        setValueField('profile_image', null)
    }


    return (
        <>
            <Flex gap={10} className='mb-30'>
                <OutlineBtn onClick={handleBack}>
                    뒤로가기
                </OutlineBtn>
                <Button
                    onClick={handleButton}
                    width={100}
                    isLoading={btnLoading.isUpdateBtnLoading}
                >
                    저장하기
                </Button>
            </Flex>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        프로필 사진
                    </h6>
                </div>
                <div className="column">
                    <Flex gap={10} align="center" width="100%">
                        <>
                            {
                                formState?.profile_image?.value ? (
                                    <>
                                        {
                                            typeof formState?.profile_image?.value === 'object' ?
                                                <>
                                                    <ImageViewer
                                                        alt='profile-image'
                                                        file={formState?.profile_image?.value}
                                                        width={100}
                                                        height={100}
                                                    />
                                                </>
                                                :
                                                <>
                                                    <img
                                                        alt=""
                                                        src={formState?.profile_image?.value}
                                                        width={100} height={100}
                                                    />
                                                </>
                                        }
                                    </>
                                ) : (
                                    <>
                                        <BiUserCircle fontSize={70} />
                                    </>
                                )

                            }
                        </>
                        <InputFileUi
                            name="profile_image"
                            placeholder="사진 업로드"
                            onChange={onChangeFile}
                            width={300}
                        />
                        <Button onClick={handleChangeDefaultImg}>
                            기본 이미지로 변경
                        </Button>
                    </Flex>
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        사용자 이름
                    </h6>
                </div>
                <div className="column">{
                    userInfo?.name
                }</div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        닉네임
                    </h6>
                </div>
                <div className="column">
                    <InputText
                        name={'nickName'}
                        onChange={onChange}
                        value={formState?.nickName?.value}
                        isValid={Boolean(formState?.nickName?.error)}
                        placeholder="닉네임을 입력해주세요."
                    />
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        주소
                    </h6>
                </div>
                <div className="column">
                    <InputText
                        name={'address'}
                        onChange={onChange}
                        value={formState?.address?.value}
                        isValid={Boolean(formState?.address?.error)}
                        placeholder="주소를 입력해주세요."
                    />
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        연락처
                    </h6>
                </div>
                <div className="column">
                    <Flex column={'column'} width={"100%"}>
                        <InputText
                            name={'phone'}
                            onChange={onChange}
                            value={formState?.phone?.value}
                            isValid={Boolean(formState?.phone?.error)}
                            placeholder="전화번호를 입력해주세요"

                        />
                        {<FieldError text={formState?.phone?.error} />}
                    </Flex>
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        자기소개
                    </h6>
                </div>
                <div className="column break-spaces">
                    <TextArea
                        name="introduction"
                        cols={15}
                        onChange={onChange}
                        placeholder="자기소개를 입력해주세요."
                        value={formState?.introduction?.value}
                    />
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        Web3 지갑
                    </h6>
                </div>
                <div className="column">
                    <OutlineBtn onClick={handleAddWalletAddress}>
                        {globalItems?.chosenWalletAddress || userInfo.wallet_address || 'web3 지갑 주소 업데이트'}
                    </OutlineBtn>
                </div>
            </div>
        </>
    )
}

export default ProfileEditForm