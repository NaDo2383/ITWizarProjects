import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function CardSkeleton() {
    return (
        <div
            data-wow-delay={`0s`}
            className="wow fadeInUp col-xl-3 col-lg-4 col-md-6 col-sm-6"
        >
            <div className="tf-card-box style-1">
                <div className="card-media">
                    <Link href="/artwork/1">
                        <Image
                            src="/assets/images/box-item/card-item-05.jpg"
                            alt=""
                            width={600}
                            height={450}
                        />
                    </Link>
                    <span className="wishlist-button icon-heart" />
                </div>

                <div className="divider" />
                <div className="meta-info flex items-center justify-between">
                    <span className="text-bid">Media Name</span>
                    <h6 className="price gem">0,34 ETH</h6>
                </div>
            </div>
        </div>
    )
}

export default CardSkeleton
