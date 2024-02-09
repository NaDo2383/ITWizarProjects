import React, { useCallback, useState } from 'react'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import { useUserCtx } from 'a/features/user/useUserCtx'
import { Flex } from 'a/components/ui/containers/flex/Flex'
import Button from 'a/components/ui/button/Button'
import FormRow from 'a/components/ui/form/FormRow'
import { BiUserCircle } from 'react-icons/bi'
import { Label } from 'a/components/ui/typography/Label'
import tw from 'tailwind-styled-components'
import Image from 'next/image'

export default function ProfileDetail() {
    const [btnLoading] = useState({
        isUpdateBtnLoading: false,
    })
    const { setMyPageState, myPageState } = useGlobalCtx()
    const { userInfo } = useUserCtx()

    const toggleEditProfile = useCallback(() => {
        setMyPageState((prev) => ({
            ...prev,
            isProfileEdit: !prev?.isProfileEdit,
        }))
    }, [])

    function handleButton(e) {
        e.preventDefault()
        if (myPageState?.isProfileEdit) {
            return
        }
        toggleEditProfile()
    }

    // function handleAddWalletAddress() {
    //     // showPopup(POPUP_TYPES.WALLET_LIST, {
    //     //     setValueField: (value) => setValueField('wallet_address', value)
    //     // })
    // }
    return (
        <div>
            <Flex gap={3} justify="end" className="mb-30">
                <Button
                    onClick={handleButton}
                    width={200}
                    isLoading={btnLoading.isUpdateBtnLoading}
                >
                    수정하기
                </Button>
            </Flex>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">프로필 사진</Label>
                    <>
                        {userInfo?.image?.url ? (
                            <>
                                <Image
                                    alt=""
                                    src={userInfo?.image?.url}
                                    width={100}
                                    height={100}
                                />
                            </>
                        ) : (
                            <>
                                <BiUserCircle fontSize={50} />
                            </>
                        )}
                    </>
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">사용자 이름</Label>
                    <PTitle>{userInfo?.name}</PTitle>
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">사용자 아이디</Label>
                    <PTitle>{userInfo?.username}</PTitle>
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">주소</Label>
                    <PTitle>{userInfo?.address}</PTitle>
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">연락처</Label>
                    <PTitle>{userInfo?.phone}</PTitle>
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">자기소개</Label>
                    <PTitle>{userInfo?.introduce}</PTitle>
                </Flex>
            </FormRow>
            <FormRow>
                <Flex gap={2} align="center">
                    <Label className="w-[30%]">Web3 지갑</Label>
                    <PTitle>{userInfo?.walletAddress}</PTitle>
                </Flex>
            </FormRow>
        </div>
    )
}

const PTitle = tw.div`
        text-black
        dark:text-white
        normal-case
    `
