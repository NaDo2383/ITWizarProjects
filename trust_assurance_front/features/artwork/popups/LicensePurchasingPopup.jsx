import MainPopup from "@/common/popup/_partials/MainPopup";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import CustomDatePicker from "@/components/ui/customDatePicker/CustomDatePicker";
import { MY_PAGE_TAB } from "@/libs/constants";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { useArtworkContext } from "../useArtworkContext";
import useArtworks from "../useArtworks";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";
import { useUserCtx } from "@/features/user/useUserCtx";
import { consignLicense } from "@/libs/contract/consignFunctions";
import useToken from "@/common/token/useToken";

export default function LicensePurchasingPopup() {
    const { hidePopup } = usePopupCtx();
    const { selectedLicense, artworkDetail } = useArtworkContext();
    const { purchaseLicense } = useArtworks();
    const initialDate = new Date();
    const tomDate = new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        initialDate.getDate() + 1
    );
    const tomDateFinish = new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        initialDate.getDate() + 2
    );
    const [startingDate, setStartingDate] = useState(tomDate);
    const [finishingDate, setFinishingDate] = useState(tomDateFinish);
    const { setLoadingWithContract } = useGlobalCtx();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { userInfo } = useUserCtx()
    const [token, setToken] = useState();
    const { getAuthToken } = useToken();


    const handleConfirm = async () => {
        await getAuthToken().then(async (result) => {
            setToken(result)

            if (result) {
                setLoading(true)
                setLoadingWithContract(true)
                function convertDates(inputDates) {
                    const formattedDates = inputDates.map((dateString) => {
                        const date = new Date(dateString);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const day = String(date.getDate()).padStart(2, "0");
                        return parseInt(year + month + day);
                    });

                    return formattedDates;
                }

                const inputDates = [startingDate, finishingDate];

                const formattedDates = convertDates(inputDates);
                const requestBody = {
                    accessToken: result,
                    productId: selectedLicense?.product_id.toString(),
                    periodofuse: JSON.stringify(formattedDates),
                    price: (
                        ((finishingDate - startingDate) / 86400000) *
                        selectedLicense?.selling_price
                    ).toString(),
                };
                const payload = {
                    copyrightOwnerName: artworkDetail?.copyright_metadata?.copyrightOwnerInfo?.copyrightOwnerName,
                    copyrightOwnerId: artworkDetail?.copyright_metadata?.copyrightOwnerInfo?.copyrightOwnerId,
                    userInfo: [userInfo.name, userInfo.id],
                    licenseInfo: selectedLicense?.terms_of_use,
                    price: ((finishingDate - startingDate) / 86400000) * selectedLicense?.selling_price
                }

                purchaseLicense(requestBody).then((res) => {
                    if (res.status === 200) {
                        consignLicense(selectedLicense?.copyright_token_id, payload, res => {
                            if (res.status === "successful") {
                                setLoadingWithContract(false)
                                setTimeout(() => { router.push("/my-page?tab=" + MY_PAGE_TAB.LICENSE_HISTORY) }, 1500)

                            } else {
                                alert("Purchase failed");
                                setLoadingWithContract(false)
                            }
                        }, setLoading)
                    } else {
                        alert("Purchase request failed");
                        setLoading(false)
                        setLoadingWithContract(false)
                    }
                });
            }
        });
    };


    return (
        <MainPopup>
            <Container>
                <Row>
                    <Header5>저작물명</Header5>
                    <Division>
                        {artworkDetail?.media_metadata?.mediaInfo?.mediaName}
                    </Division>
                </Row>
                <Row>
                    <Header5>저작자</Header5>
                    <Division>
                        {artworkDetail?.media_metadata?.createrInfo?.createrName
                            .length > 0 &&
                            artworkDetail?.media_metadata?.createrInfo?.createrName?.map(
                                (creator, index) => {
                                    if (index === 0) {
                                        return creator;
                                    } else {
                                        return ", " + creator;
                                    }
                                }
                            )}
                    </Division>
                </Row>
                <Row>
                    <Header5>저작권 이용자</Header5>
                    <Division>
                        {artworkDetail?.copyright_metadata?.copyrightOwnerInfo?.copyrightOwnerName
                            .length > 0 &&
                            artworkDetail?.copyright_metadata?.copyrightOwnerInfo?.copyrightOwnerName?.map(
                                (copyrightOwner, index) => {
                                    if (index === 0) {
                                        return copyrightOwner;
                                    } else {
                                        return ", " + copyrightOwner;
                                    }
                                }
                            )}
                    </Division>
                </Row>
                <Row>
                    <Header5>계약 대상 권리</Header5>
                    <Division>{selectedLicense?.copyright_type}</Division>
                </Row>
                <Row>
                    <Header5>이용조건</Header5>
                    <Division3 className="break-spaces overflow-scroll descCustomCSS">{selectedLicense?.terms_of_use}</Division3>
                </Row>
                <Row>
                    <Header5>이용 기간</Header5>
                    <Division>
                        <CustomDatePicker
                            dateValue={tomDate}
                            onChange={setStartingDate}
                            minDateValue={LicensePurchasingPopup}
                        />{" "}
                        ~{" "}
                        <CustomDatePicker
                            dateValue={tomDateFinish}
                            onChange={setFinishingDate}
                            minDateValue={LicensePurchasingPopup}
                        />{" "}
                        ({(finishingDate - startingDate) / 86400000}일)
                    </Division>
                </Row>
                <Row>
                    <Header5>계약 금액</Header5>
                    <Division1>
                        <h5>
                            {((finishingDate - startingDate) / 86400000) *
                                selectedLicense?.selling_price}{" "}
                            ETH (일시금) W58,670.25
                        </h5>
                        <div>
                            1일 기준: {selectedLicense?.selling_price} ETH
                            W195,56.75
                        </div>
                    </Division1>
                </Row>
                <Division2>
                    <button onClick={() => hidePopup()}>취소</button>
                    {
                        loading ?
                            <button>로드중 ...</button>
                            :
                            <button onClick={() => handleConfirm()}>구매하기</button>
                    }
                </Division2>
            </Container>
        </MainPopup>
    );
}

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`;

const Header5 = styled.h5`
    width: 300px;
`;

const Division3 = styled.div`
    font-size: 16px;
    display: flex;
    align-items: start;
    max-height: 200px;
`;

const Division = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
`;

const Division1 = styled.div`
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Division2 = styled.div`
    width: 100%;
    font-size: 16px;
    display: flex;
    justify-content: end;
    gap: 30px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: start;
    width: 50vw;
`;
