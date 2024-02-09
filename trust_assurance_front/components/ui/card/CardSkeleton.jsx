import React from "react";
import Link from "next/link";
import Countdown from "@/components/templateElements/Countdown";

const currentTime = new Date();
function CardSkeleton({ idx }) {
    return (
        <div
            data-wow-delay={`0s`}
            className="wow fadeInUp col-xl-3 col-lg-4 col-md-6 col-sm-6"
        >
            <div className="tf-card-box style-1">
                <div className="card-media">
                    <Link href="/artwork/1">
                        <img
                            src="/assets/images/box-item/card-item-05.jpg"
                            alt=""
                        />
                    </Link>
                    <span className="wishlist-button icon-heart" />
                </div>
                
                <div className="divider" />
                <div className="meta-info flex items-center justify-between">
                    <span className="text-bid">Media Name</span>
                    <h6 className="price gem">
                        0,34 ETH
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default CardSkeleton;
