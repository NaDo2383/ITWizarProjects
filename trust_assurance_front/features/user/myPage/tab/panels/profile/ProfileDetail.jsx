import React from "react";
import { BiUserCircle } from 'react-icons/bi'
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import { useCallback } from "react";
import { Flex } from "@/components/ui/containers/flex/Flex";
import { OutlineBtn } from "@/components/ui/button/OutlineBtn";
import { useUserCtx } from "@/features/user/useUserCtx";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";
import Form from "@/components/ui/form/Form";
import ChangePasswordForm from "./ChangePasswordForm";

function ProfileDetail() {
    const [btnLoading, setBtnLoading] = useState({
        isUpdateBtnLoading: false,
    })
    const { globalItems, setMyPageState, myPageState } = useGlobalCtx()
    const { userInfo, setUserInfo } = useUserCtx()

    const toggleEditProfile = useCallback(() => {
        setMyPageState(prev => ({
            ...prev,
            isProfileEdit: !prev?.isProfileEdit
        }))
    }, [])




    function handleButton(e) {
        e.preventDefault()
        if (myPageState?.isProfileEdit) {
            onSubmit(e)
            return
        }
        toggleEditProfile()
    }


    function handleAddWalletAddress() {
        // showPopup(POPUP_TYPES.WALLET_LIST, {
        //     setValueField: (value) => setValueField('wallet_address', value)
        // })
    }

    return (
        <>
            <Flex gap={10} className="mb-30">
                <Button
                    onClick={handleButton}
                    width={100}
                    isLoading={btnLoading.isUpdateBtnLoading}
                >
                    수정하기
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
                                userInfo?.profile_image ? (
                                    <>
                                        <img
                                            alt=""
                                            src={userInfo?.profile_image}
                                            width={100} height={100}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <BiUserCircle fontSize={50} />
                                    </>
                                )
                            }
                        </>
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
                    {userInfo?.nickname}
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        주소
                    </h6>
                </div>
                <div className="column">
                    {userInfo?.address || '주소를 입력해주세요.'}
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        연락처
                    </h6>
                </div>
                <div className="column">
                    {userInfo?.phone || '전화번호를 입력해주세요'}
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        자기소개
                    </h6>
                </div>
                <div className="column break-spaces text-align-start">
                    {userInfo?.introduction || '자기소개를 입력해주세요.'}
                </div>
            </div>
            <div className="table-item">
                <div className="column">
                    <h6 className="price gem">
                        Web3 지갑
                    </h6>
                </div>
                <div className="column">
                    {
                        <OutlineBtn onClick={handleAddWalletAddress}>
                            {globalItems?.chosenWalletAddress || userInfo?.wallet_address || 'web3 지갑 주소 업데이트'}
                        </OutlineBtn>
                    }
                </div>
            </div>
            <Form>
                <ChangePasswordForm />
            </Form>
        </>
    );
}

export default ProfileDetail;
