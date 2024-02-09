import { usePopupCtx } from "@/common/popup/usePopupCtx";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { POPUP_TYPES } from "@/common/popup/popupRegistration";
import { useArtworkContext } from "../useArtworkContext";
import { useGlobalCtx } from "@/common/global/useGlobalCtx";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUserCtx } from "@/features/user/useUserCtx";

export default function MainInfo() {
    const {
        selectedLicense,
        setSelectedLicense,
        artworkDetailLicense,
        artworkDetail,
    } = useArtworkContext();
    const { showPopup } = usePopupCtx();
    const { authState } = useGlobalCtx();
    const { userInfo } = useUserCtx()
    const router = useRouter();
    const { isLoadingDetail } = useArtworkContext()

    const purchaseLisence = () => {
        if (!userInfo) {
            router.push("/login");
            return;
        }

        showPopup(POPUP_TYPES.LICENSEPURCHASE);
    };



    return (
        <div className="col-md-6">
            {isLoadingDetail ?
                <div data-wow-delay="0s" className="wow mainInfoSkeletonContainer product-item">
                    <h3 className="mb-30">
                        <div className="h-30px">
                            <div className="detailSkeletonLoading">
                            </div>
                        </div>
                    </h3>
                    <div>
                        <h4>창작자</h4>
                        <div className="flex gap30">
                            <div
                                className="author flex items-center mb-30 mt-10"
                            >
                                <div className="avatar">
                                    <Image
                                        src={"/assets/images/avatar/avatar-box-05.jpg"}
                                        alt="Image"
                                        width={38}
                                        height={38}
                                    />
                                </div>

                                <div className="info">
                                    <div className="h-30px">
                                        <div className="detailSkeletonLoading">
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>저작권자</h4>
                        <div className="flex gap30">
                            <div
                                className="author flex items-center mb-30 mt-10"
                            >
                                <div className="avatar">
                                    <Image
                                        src={"/assets/images/avatar/avatar-box-05.jpg"}
                                        alt="Image"
                                        width={38}
                                        height={38}
                                    />
                                </div>

                                <div className="info">
                                    <div className="h-30px">
                                        <div className="detailSkeletonLoading">
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>구매 가능한 이용권</h4>
                        <div id="license">
                            <div className="h-40px">
                                <div className="detailSkeletonLoading">
                                </div>
                            </div>
                        </div>
                    </div>
                    <ButtonAndPrice>
                        <button onClick={() => purchaseLisence()}>
                            이용권 구매
                        </button>
                    </ButtonAndPrice>
                </div>
                :
                <div data-wow-delay="0s" className="wow fadeInRight product-item">
                    <h3 className="mb-30">
                        {artworkDetail?.media_metadata?.mediaInfo?.mediaName &&
                            artworkDetail?.media_metadata?.mediaInfo?.mediaName}
                    </h3>
                    <div>
                        <h4>창작자</h4>
                        <div className="flex gap30">
                            {artworkDetail?.media_metadata?.createrInfo?.createrName
                                .length > 0 &&
                                artworkDetail?.media_metadata?.createrInfo?.createrName?.map(
                                    (creator, index) => {
                                        return (
                                            <div
                                                className="author flex items-center mb-30 mt-10"
                                                key={"creator" + index}
                                            >
                                                <div className="avatar">
                                                    <Image
                                                        src={artworkDetail
                                                            ?.media_metadata
                                                            ?.createrInfo
                                                            ?.createrProfile
                                                            ?.length > 0 && artworkDetail
                                                                ?.media_metadata
                                                                ?.createrInfo
                                                                ?.createrProfile[
                                                            index
                                                            ] ?
                                                            artworkDetail
                                                                ?.media_metadata
                                                                ?.createrInfo
                                                                ?.createrProfile[
                                                            index
                                                            ] : "/assets/images/avatar/avatar-box-05.jpg"}
                                                        alt="Image"
                                                        width={38}
                                                        height={38}
                                                    />
                                                </div>

                                                <div className="info">
                                                    <span>{creator}</span>
                                                    <h6>
                                                        {artworkDetail
                                                            ?.media_metadata
                                                            ?.createrInfo
                                                            ?.createrID
                                                            ?.length > 0 &&
                                                            artworkDetail
                                                                ?.media_metadata
                                                                ?.createrInfo
                                                                ?.createrID[
                                                            index
                                                            ]}
                                                    </h6>
                                                </div>

                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                    <div>
                        <h4>저작권자</h4>
                        <div className="flex gap30">
                            {artworkDetail?.copyright_metadata?.copyrightOwnerInfo
                                ?.copyrightOwnerName.length > 0 &&
                                artworkDetail?.copyright_metadata?.copyrightOwnerInfo?.copyrightOwnerName?.map(
                                    (copyrightOwner, index) => {
                                        return (
                                            <div
                                                className="author flex items-center mb-30 mt-10"
                                                key={"creator" + index}
                                            >
                                                <div className="avatar">
                                                    <Image
                                                        src={artworkDetail
                                                            ?.copyright_metadata
                                                            ?.copyrightOwnerInfo
                                                            ?.copyrightProfile
                                                            ?.length > 0 && artworkDetail
                                                                ?.copyright_metadata
                                                                ?.copyrightOwnerInfo
                                                                ?.copyrightProfile[
                                                            index
                                                            ] ?
                                                            artworkDetail
                                                                ?.copyright_metadata
                                                                ?.copyrightOwnerInfo
                                                                ?.copyrightProfile[
                                                            index
                                                            ] :
                                                            "/assets/images/avatar/avatar-box-05.jpg"}
                                                        alt="Image"
                                                        width={38}
                                                        height={38}
                                                    />
                                                </div>

                                                <div className="info">
                                                    <span>{copyrightOwner}</span>
                                                    <h6>
                                                        {artworkDetail
                                                            ?.copyright_metadata
                                                            ?.copyrightOwnerInfo
                                                            ?.copyrightOwnerId
                                                            ?.length > 0 &&
                                                            artworkDetail
                                                                ?.copyright_metadata
                                                                ?.copyrightOwnerInfo
                                                                ?.copyrightOwnerId[
                                                            index
                                                            ]}
                                                    </h6>
                                                </div>

                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                    <div>
                        <h4>구매 가능한 이용권</h4>
                        <div id="license">
                            {artworkDetailLicense?.map((licenses, index) => {
                                return selectedLicense?.copyright_type ===
                                    licenses.copyright_type ? (
                                    <div
                                        onClick={() => setSelectedLicense({ ...licenses, copyright_token_id: artworkDetailLicense?.artworkDetailLicense })}
                                        key={"licenses" + index}
                                        className="item-title active"
                                    >
                                        {licenses.copyright_type}
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => setSelectedLicense({ ...licenses, copyright_token_id: artworkDetailLicense?.artworkDetailLicense })}
                                        key={"licenses" + index}
                                        className="item-title"
                                    >
                                        {licenses.copyright_type}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <ButtonAndPrice>
                        <Price>
                            <h4>
                                판매가: (1일 기준) {selectedLicense?.selling_price}{" "}
                                ETH
                            </h4>
                            <h4>W195,56.75</h4>
                        </Price>
                        <button onClick={() => purchaseLisence()}>
                            이용권 구매
                        </button>
                    </ButtonAndPrice>
                </div>
            }

        </div>
    );
}

const ButtonAndPrice = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const Price = styled.div`
    display: flex;
    justify-content: space-between;
`;
