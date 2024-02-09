import Checkbox from "@/components/ui/form/elements/checkbox/Checkbox";
import CheckboxGroup from "@/components/ui/form/elements/checkbox/CheckboxGroup";
import useCheckbox, { useCheckboxGroup } from "@/components/ui/form/elements/checkbox/useCheckbox";
import useForm from "@/components/ui/form/store/useForm";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import styled from "styled-components";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import { Flex } from "@/components/ui/containers/flex/Flex";
import GhostBtn from "@/components/ui/button/GhostBtn";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import InputText from "@/components/ui/form/elements/input/InputText";
import useArtwork from "../useArtwork";
import InputNumber from "@/components/ui/form/elements/input/InputNumber";
import { consignCopyright } from "@/libs/contract/consignFunctions";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";
import useArtworks from "../useArtworks";
import useJwtAuth from "@/features/user/auth/useJwtAuth";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";

export const rights = [
    {
        id: -1,
        name1: "rightOfReproduction",
        checked: false,
        name: "0",
        name1: "복제권",
    },
    {
        id: 1,
        title: "performance",
        checked: false,
        name: "1",
        name1: "공연권",
    },
    {
        id: 2,
        title: "publicTransmission",
        checked: false,
        name: "2",
        name1: "공중송신권",
    },
    {
        id: 3,
        title: "distribution",
        checked: false,
        name: "3",
        name1: "배포권",
    },
    {
        id: 4,
        title: "rental",
        checked: false,
        name: "4",
        name1: "대여권",
    },
    {
        id: 5,
        title: "createDerivativeWorks",
        checked: false,
        name: "5",
        name1: "2차적저작물작성권",
    },
    {
        id: 6,
        title: "exhibition",
        checked: false,
        name: "6",
        name1: "전시권",
    },
];

export default function LicenseMintForm() {
    const { hideAllPopups, popupState } = usePopupCtx();
    const { transformedCheckboxGroup } = useCheckboxGroup(rights);
    const { getCheckedList } = useCheckbox()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { setLoadingWithContract } = useGlobalCtx()
    const [initialFormState, setInitialProfileFormData] = useState({
        checkboxGroup: transformedCheckboxGroup,
        creatorList: [
            {
                creatorName: { value: "", error: null },
                creatorId: { value: "", error: null },
                share: { value: "", error: null },
            },
        ],
    });
    const [loading, setLoading] = useState(false);
    const {
        onChange,
        onChangeWithoutEvent,
        onChangeFile,
        formState,
        onError,
        onChangeGroupList,
    } = useForm(initialFormState);
    const { getMediaRegistrationStatus, getTokenId } = useArtworks();
    const { checkId } = useJwtAuth()

    const { addCreatorField, removeCreatorField, onChangeCreatorField } =
        useArtwork(formState, onChangeGroupList);

    async function checkUserIds(createrID) {
        try {
            let result = true;
            await Promise.all(createrID.map(async (id) => {
                if (!id) return;
                const res = await checkId(id);

                if (!res.data.isId) {
                    showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                        message: '존재하지 않는 저작권자 ID입니다. 저작권자 ID를 확인해주세요.'
                    });
                    result = false;
                } else {
                    result = true;
                }
            }));

            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    const handleClick = async () => {
        setLoading(true)
        setLoadingWithContract(true)
        const rights = []
        const createrName = [];
        const createrID = [];
        const createrShare = [];
        let sumOfShare = 0;
        let isShareLessThan100 = true;

        if (formState?.creatorList?.length > 1) {
            for (let i = 0; i < formState?.creatorList?.length; i++) {
                createrName.push(
                    formState?.creatorList[i]?.creatorName?.value
                );
                createrID.push(formState?.creatorList[i]?.creatorId?.value);
                createrShare.push(+formState?.creatorList[i]?.share.value)
                sumOfShare += +formState?.creatorList[i]?.share.value
                if (sumOfShare > 100) {
                    isShareLessThan100 = false;
                }
            }
        } else {
            createrName.push(formState?.creatorList[0]?.creatorName?.value);
            createrID.push(formState?.creatorList[0]?.creatorId?.value);
            createrShare.push(+formState?.creatorList[0]?.share.value)
            sumOfShare += +formState?.creatorList[0]?.share.value
            if (sumOfShare > 100) {
                isShareLessThan100 = false;
            }
        }

        const allIdsAreReal = await checkUserIds(createrID)
        if (!allIdsAreReal) {
            setLoading(false)
            setLoadingWithContract(false)
            return
        }

        Object.entries(formState.checkboxGroup).map(item => {
            if (item[1].value === "true") {
                rights.push(+item[0]);
            }
        })

        console.log("popupState before calling getTokenId: ", popupState);

        const tokenId = await getTokenId({
            nftAddress: popupState.consignedNFTAdress,
            mediaNftId: popupState.newId
        })

        console.log("tokenId: ", tokenId);

        const payload = {
            mediaId: popupState.newId,
            srcTokenId: tokenId?.data?.tokenId,
            copyrightType: rights,
            copyrightOwnerName: createrName,
            copyrightOwnerId: createrID,
            copyrightOwnerStake: createrShare
        }

        if (isShareLessThan100) {
            await consignCopyright(payload, ((res) => {
                if (res.code === "successfully") {
                    setTimeout(() => { getMediaRegistrationStatus(popupState?.getMediaRegistrationStatusPayload) }, 500)
                    setTimeout(() => { getMediaRegistrationStatus(popupState?.getMediaRegistrationStatusPayload) }, 5000)
                }
            }), setLoading)
            setLoadingWithContract(false)
            hideAllPopups();
        } else {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT,
                { message: '지분의 총 합은 100이 되어야 합니다.' })
            setLoading(false)
            setLoadingWithContract(false)
            return
        }
        hideAllPopups();
    };

    console.log(popupState);

    return (
        <>
            <div>
                <h4>저작권 유형</h4>
                {
                    <CheckboxGroup groupName="checkboxGroup">
                        {rights.map((item, idx) => {
                            if (popupState?.mintedRights?.includes(item.name1)) {
                                return <Checkbox
                                    key={"rightCheckBox-" + idx}
                                    id={item.id}
                                    name={item.name}
                                    label={item.name1}
                                    checked={true}
                                    disabled={true}
                                />
                            } else {
                                return <Checkbox
                                    key={"rightCheckBox-" + idx}
                                    id={item.id}
                                    name={item.name}
                                    label={item.name1}
                                    checked={
                                        item.checked ||
                                        Boolean(formState?.[item.name]?.value)
                                    }
                                />
                            }
                        })}
                    </CheckboxGroup>
                }
            </div>
            <Header4>저작권자 정보</Header4>
            {formState?.creatorList?.length > 0 &&
                formState?.creatorList?.map((creator, idx) => (
                    <Flex key={"creator-field" + idx} gap={10} align="center">
                        {idx === 0 ? (
                            <GhostBtn>
                                <BsPlusCircle
                                    fontSize={80}
                                    color="#fff"
                                    onClick={addCreatorField}
                                />
                            </GhostBtn>
                        ) : (
                            <GhostBtn>
                                <BiMinusCircle
                                    fontSize={80}
                                    color="#fff"
                                    onClick={() => removeCreatorField(idx)}
                                />
                            </GhostBtn>
                        )}
                        <InputText
                            name="creatorName"
                            value={
                                formState?.creatorList[idx]?.creatorName?.value
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
                        <InputNumber
                            name="share"
                            value={formState?.creatorList[idx]?.share?.value}
                            onChange={(e) => onChangeCreatorField(e, idx)}
                            width={135}
                            placeholder="지분"
                            max={100}
                        />
                    </Flex>
                ))}
            {
                loading ?
                    <Button className="mt-10">
                        로드 중 ...
                    </Button> :
                    <Button className="mt-10" onClick={() => handleClick()}>
                        발행
                    </Button>
            }
        </>
    );
}

const Header4 = styled.h4`
    margin-top: 20px;
    margin-bottom: 20px;
`;
