import React from "react";
import AccordionPanel from "../../AccordionPanel";
import { useAccordionCtx } from "../../store/useAccordionCtx";
import useAccordion from "../../store/useAccordion";
import styled from "styled-components";
import TextArea from "@/components/ui/form/elements/textArea/TextArea";
import InputNumber from "@/components/ui/form/elements/input/InputNumber";
import { Flex } from "@/components/ui/containers/flex/Flex";
import Button from "@/components/ui/button/Button";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RiCloseCircleLine, RiCheckboxCircleLine } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import useArtworks from "@/features/artwork/useArtworks";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import useToken from "@/common/token/useToken";
import { usePopupCtx } from "@/common/popup/usePopupCtx";

export default function RegisterTicketSalesAccordionTab(props) {
    const { id, title, copyrighttoken, mediaNftId } = props;
    const { activeAccordionId, setActiveAccordionId } = useAccordionCtx();
    const [isPriceSettled, setIsPriceSettled] = useState();
    const [settledDetail, setSettledDetail] = useState();
    const [licenseDetail, setLicenseDetail] = useState();
    const [formState, setFormState] = useState({});
    const { handleKeyDown } = useAccordion();
    const { getAuthToken } = useToken();
    const [token, setToken] = useState();
    const { registerProduct, getMediaLicenseDetail, getMediaSalesStatus } = useArtworks();
    const isOpen = activeAccordionId === id;
    const { showGlobalPopup } = useGlobalPopupCtx();
    const { popupState } = usePopupCtx();

    function handleClick() {
        if (isOpen) {
            setActiveAccordionId(null);
        } else {
            setActiveAccordionId(id);
        }
    }

    function handleSubmit() {
        getAuthToken().then((result) => {
            setToken(result)


            if (result) {
                const payload = {
                    accessToken: result,
                    mediaNftId: mediaNftId,
                    copyrightTokenId: copyrighttoken,
                    lreif: "string",
                    ...formState,
                };
                registerProduct(payload).then((res) => {
                    if (res.status === 200) {
                        setActiveAccordionId(null);
                        getMediaLicenseDetail(mediaNftId).then((res) => setLicenseDetail(res.data))
                        showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                            message: '상품이 등록되었습니다.'
                        });
                        getMediaSalesStatus(popupState.getMediaSalesStatusPayload)
                    }
                });
            }
        });
    }

    useEffect(() => {
        mediaNftId && getMediaLicenseDetail(mediaNftId).then((res) => setLicenseDetail(res.data))
    }, [mediaNftId]);

    useEffect(() => {
        licenseDetail &&
            licenseDetail?.forEach((element) => {
                if (element.copyright_type === title) {
                    setIsPriceSettled(true);
                    setSettledDetail(element);
                    return;
                }
            });
    }, [licenseDetail]);

    return (
        <div>
            <Title
                role="button"
                tabIndex={isOpen ? 0 : -1}
                isexpanded={isOpen.toString()}
                aria-controls={`content-${id}`}
                className="cursor-pointer focus:outline-none"
                onClick={handleClick}
                onKeyDown={(e) => handleKeyDown(e, handleClick)}
            >
                <div>
                    {isPriceSettled ? (
                        <StyledRiCheckboxCircleLine />
                    ) : (
                        <StyledRiCloseCircleLine />
                    )}
                    {title}
                </div>
                <SVG isexpanded={isOpen.toString()}>
                    <MdOutlineArrowForwardIos />
                </SVG>
            </Title>
            <AccordionPanel id={id}>
                <Content isexpanded={isOpen.toString()}>
                    {isPriceSettled ? (
                        <TextArea
                            placeholder={settledDetail?.terms_of_use}
                            disabled={true}
                        />
                    ) : (
                        <TextArea
                            placeholder={"이용조건을 입력해주세요."}
                            value={formState?.licenseInfo}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    licenseInfo: e.target.value,
                                }))
                            }
                        />
                    )}
                    <Flex py={20} align={"center"} gap={20}>
                        {isPriceSettled ? (
                            <InputNumber
                                value={settledDetail?.selling_price}
                                disabled
                            />
                        ) : (
                            <InputNumber
                                placeholder={"판매할 가격을 입력해주세요."}
                                value={formState?.price}
                                onChange={(e) =>
                                    setFormState((prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    }))
                                }
                            />
                        )}
                        <h5>ETH (이용기간 1일당)</h5>
                    </Flex>
                    {isPriceSettled ? <Button disabled={true}>등록</Button> : <Button onClick={() => handleSubmit()}>등록</Button>}
                </Content>
            </AccordionPanel>
        </div>
    );
}
const SVG = styled.div`
    transform: ${(props) => props.isexpanded == "true" && "rotate(90deg);"};
`;

const Title = styled.h4`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid
        ${(props) => (props.isexpanded == "true" ? "#C8E022" : "white")};
    color: ${(props) => props.isexpanded == "true" && "#C8E022"};
`;
const Content = styled.div`
    padding: 10px;
    display: ${(props) => (props.isexpanded == "true" ? "block" : "none")};
`;

const StyledRiCheckboxCircleLine = styled(RiCheckboxCircleLine)`
    color: green;
`;

const StyledRiCloseCircleLine = styled(RiCloseCircleLine)`
    color: red;
`;
