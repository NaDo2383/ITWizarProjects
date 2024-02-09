import React from 'react'
import Image from 'next/image'
// import metaImg from 'public/images/metaImg.png'
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io'
import { useAssetCtx } from '../useAssetCtx'

export default function AssetDetailThumbnail() {
    const { assetDetail } = useAssetCtx()

    return (
        <div className="sm:mb-8 md:w-1/2 w-full h-full md:flex-shrink-0 md:flex-grow-0 md:basis-auto">
            <div style={{ position: 'relative', height: '540px' }} className=" w-full">
                {assetDetail?.thumbnailUrl ? (
                    <Image
                        fill
                        src={assetDetail?.thumbnailUrl}
                        alt={'thumbnail'}
                        style={{
                            objectFit: 'cover',
                        }}
                        className="rounded-lg cursor-pointer h-full object-cover w-full"
                    />
                ) : (
                    <div className="h-full object-cover w-full rounded-lg bg-jacarta-100"></div>
                )}
            </div>
            <div className="w-full h-full flex gap-5 text-lg my-2">
                <div className="flex items-center justify-center gap-2">
                    {assetDetail?.termsOfUse?.resaleAllowed === false ? (
                        <IoMdCloseCircleOutline className="text-red" />
                    ) : (
                        <IoMdCheckmarkCircleOutline className="text-green" />
                    )}
                    재판매 가능
                </div>
                <div className="flex items-center justify-center gap-2">
                    {assetDetail?.termsOfUse?.commercialAllowed === false ? (
                        <IoMdCloseCircleOutline className="text-red" />
                    ) : (
                        <IoMdCheckmarkCircleOutline className="text-green" />
                    )}
                    수익화 가능
                </div>
            </div>
        </div>
    )
}
