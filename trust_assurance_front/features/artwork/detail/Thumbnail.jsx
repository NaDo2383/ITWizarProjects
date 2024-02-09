import Image from "next/image";
import Link from "next/link";
import React from "react";
import useArtworks from "../useArtworks";
import { useArtworkContext } from "../useArtworkContext";

export default function Thumbnail() {
    const { artworkDetail } = useArtworks();
    const { isLoadingDetail } = useArtworkContext()

    return (
        <div className="col-md-6">
            <div
                data-wow-delay="0s"
                className="wow fadeInLeft tf-card-box style-5"
            >
                <div className="card-media mb-0">
                    {isLoadingDetail ?
                        <div className="detailSkeletonLoading">
                        </div> :
                        <Link target="_blank" rel="noopener noreferrer" href={`${artworkDetail?.thumbnail_url ? artworkDetail?.thumbnail_url : artworkDetail?.media_metadata?.mediaInfo?.mediaURL}`}>
                            <Image src={artworkDetail?.thumbnail_url ? artworkDetail?.thumbnail_url : artworkDetail?.media_metadata?.mediaInfo?.mediaURL} alt="media thumbnail" fill style={{ objectFit: "cover" }} />
                        </Link>}
                </div>
            </div>
        </div>
    );
}
