import Button from "@/components/ui/button/Button";
import { Flex } from "@/components/ui/containers/flex/Flex";
import InputText from "@/components/ui/form/elements/input/InputText";
import useForm from "@/components/ui/form/store/useForm";
import { useState } from "react";
import styled from "styled-components";
import { verify } from "@/libs/contract/consignFunctions";
import useArtworks from "../useArtworks";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import { useEffect } from "react";

const initialState = {
    contractAddress: { value: null, error: null },
    tokenId: { value: null, error: null },
};

export default function NFTContractAddressVerify(props) {
    const { onChange, onError, formState } = useForm(initialState);
    const { setPopupState, popupState } = usePopupCtx();
    const [isloading, setIsLoading] = useState(false);
    const { isTokenVerified, setIsTokenVerified } = props


    async function handleSubmit() {
        setIsLoading(true);
        verify(formState?.tokenId?.value ? +formState?.tokenId?.value : popupState?.verifiedData?.consigningMediaId, formState?.contractAddress?.value ? formState?.contractAddress?.value : popupState?.verifiedData?.consigningContractAddress
        )
            .then((res) => {
                console.log(res);
                console.log(JSON.parse(res));
                if (res) {
                    setPopupState((prev) => ({
                        ...prev,
                        consignMetadata: { ...JSON.parse(res), language: "ko", creatorList: [{ creatorName: "", creatorId: "" }] },
                        consigningMediaId: +formState?.tokenId?.value
                    }))
                    setIsTokenVerified(true)
                    setPopupState((prev) => ({
                        ...prev,
                        verifiedData: {
                            consigningMediaId: +formState?.tokenId?.value,
                            consigningContractAddress: formState?.contractAddress?.value
                        }
                    }))
                    alert("토큰이 확인되었습니다")
                } else {
                    setPopupState((prev) => ({
                        ...prev,
                        consignMetadata: null,
                        consigningMediaId: null
                    }))
                    alert("토큰 아이디가 유효하지 않습니다")
                }
            })
            .catch((err) => {
                alert("토큰 아이디가 유효하지 않습니다");
                console.log("Here is error: ", err);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <Container>
            <div>
                <Flex gap={20} py={30}>
                    <InputText
                        name="contractAddress"
                        onChange={onChange}
                        value={formState?.contractAddress?.value ? formState?.contractAddress?.value : popupState?.verifiedData?.consigningContractAddress}
                        isValid={Boolean(formState?.contractAddress?.error)}
                        placeholder={"NFT 컨트랙트 주소"}
                        isDisabled={isTokenVerified}
                    />
                    <InputText
                        name="tokenId"
                        onChange={onChange}
                        value={formState?.tokenId?.value ? formState?.tokenId?.value : popupState?.verifiedData?.consigningMediaId}
                        isValid={Boolean(formState?.tokenId?.error)}
                        placeholder={"NFT Token ID"}
                        isDisabled={isTokenVerified}
                    />
                </Flex>
                <Flex justify={"end"} align={"center"} width={"100%"}>
                    {isTokenVerified ?
                        <Button
                            width={150}
                            onClick={() => setIsTokenVerified(false)}
                        >
                            변경
                        </Button>
                        :
                        <Button
                            width={150}
                            isLoading={isloading}
                            onClick={() => handleSubmit()}
                        >
                            검증
                        </Button>}
                </Flex>
            </div>
        </Container>
    );
}

const Container = styled.div`
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
`;
