import React from "react";
import useArtworks from "../useArtworks";
import { useArtworkContext } from "../useArtworkContext";

export default function LicenseTermsAndConditions() {
    const { artworkDetail } = useArtworks();
    const { isLoadingDetail } = useArtworkContext()

    return (
        <div
            data-wow-delay="0s"
            className="wow fadeInRight product-item description"
        >
            <h6>
                라이선스 이용 조건
            </h6>
            <i className="icon-keyboard_arrow_down" />
            <div className="content">
                {isLoadingDetail ?
                    <div className="h-100px">
                        <div className="detailSkeletonLoading">
                        </div>
                    </div>
                    :
                    <p className="h-20vh overflow-scroll break-spaces">
                        {artworkDetail?.terms_of_use}
                    </p>
                }
            </div>
        </div>
    );
}
