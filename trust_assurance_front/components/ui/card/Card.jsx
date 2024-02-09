import React from "react";
import Link from "next/link";
import Image from "next/image";

const currentTime = new Date();
function Card({ artwork }) {
    const {
        seller,
        copyRightInfo,
        createrInfo,
        mediaInfo,
        mediaPrice,
        mediaThumbnailUrl,
        productId,
        type,
    } = artwork;

    return (
        <div
            data-wow-delay={`0s`}
            className="wow fadeInUp col-xl-3 col-lg-4 col-md-6 col-sm-6"
        >
            <div className="tf-card-box style-1">
                <div className="card-media">
                    <Link href={`/artwork/${productId}`}>
                        <Image src={mediaThumbnailUrl ? mediaThumbnailUrl : mediaInfo?.mediaURL} alt="media thumbnail" fill style={{ objectFit: "cover" }} />
                    </Link>
                </div>
                <div className="divider" />
                <div className="meta-info flex items-center justify-between">
                    <span className="text-bid">{mediaInfo?.mediaName}</span>
                    <h6 className="price gem">
                        {mediaPrice} ETH
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default Card;
