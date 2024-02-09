import React from "react";
import useArtworks from "../useArtworks";
import { useArtworkContext } from "../useArtworkContext";

export default function MediaInfo() {
    const { artworkDetail } = useArtworks();
    const { isLoadingDetail } = useArtworkContext()

    return (
        <div
            data-wow-delay="0s"
            className="wow fadeInRight product-item description"
        >
            <h6>
                미디어 정보
            </h6>
            <i className="icon-keyboard_arrow_down" />
            <div className="h-20vh  content overflow-scroll break-spaces">
                {isLoadingDetail ?
                    <div className="h-100px">
                        <div className="detailSkeletonLoading">
                        </div>
                    </div>
                    :
                    <p>
                        {artworkDetail?.media_metadata?.mediaInfo?.mediaDescription}
                    </p>
                }
            </div>
        </div>
    );
}
