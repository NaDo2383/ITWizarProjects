import React from 'react'
import Image from 'next/image'
import metaImg from 'public/images/metaImg.png'
import { OutlineBtnSmall } from 'a/components/ui/button/OutlineBtn'
import { useAssetCtx } from '../useAssetCtx'
import { AiOutlineAlert } from 'react-icons/ai'
import { usePopupCtx } from 'a/common/popup/usePopupCtx'
import { POPUP_TYPES } from 'a/common/popup/popupRegistration'

export default function AssetDetailMainInfo() {
    const { assetDetail } = useAssetCtx()
    const { showPopup, setPopupState } = usePopupCtx()

    function showReportPopup() {
        showPopup(POPUP_TYPES.REPORT_ASSET)
        setPopupState((prev) => ({ ...prev, reportingAssetId: assetDetail?.id }))
    }

    return (
        <div
            className="bg-jacarta-100 dark:bg-jacarta-700 bg-opacity-70 rounded-lg p-5 md:w-1/2 w-full md:basis-auto md:pl-8"
            style={{ maxWidth: '50%' }}
        >
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <h1 className="font-display text-jacarta-700 mb-4 text-2xl font-semibold dark:text-white">
                        {assetDetail?.title}
                    </h1>
                    <p className="font-bold text-lg text-jacarta-400">
                        {assetDetail?.type}
                    </p>
                </div>
                <div
                    onClick={() => showReportPopup()}
                    className=" w-8 h-8 rounded-full hover:bg-accent focus:bg-accent cursor-pointer flex justify-center items-center border border-jacarta-900"
                >
                    <AiOutlineAlert className=" w-6 h-6 " />
                </div>
            </div>
            <h3 className="font-display text-jacarta-700 mb-4 text-l font-semibold dark:text-white">
                태그
            </h3>
            <div className="flex gap-3 mb-5 overflow-x-auto max-w-full">
                {assetDetail?.tags?.length > 0 && (
                    <div className="flex flex-nowrap gap-3">
                        {assetDetail?.tags
                            ?.sort((a, b) => a.name.localeCompare(b.name))
                            .map((tag, index) => {
                                return (
                                    <div
                                        className="flex-shrink-0  mb-4 flex"
                                        key={'tag' + index}
                                    >
                                        <OutlineBtnSmall className="border-jacarta-200 py-1 text-center">
                                            {tag.name ? tag.name : 'noTag'}
                                        </OutlineBtnSmall>
                                    </div>
                                )
                            })}
                    </div>
                )}
                {/*  <OutlineBtnSmall className="border-jacarta-200 py-1">SNS</OutlineBtnSmall>
                <OutlineBtnSmall className="border-jacarta-200 py-1">
                    블로그
                </OutlineBtnSmall>*/}
            </div>
            <h3 className="font-display text-jacarta-700 mb-4 text-l font-semibold dark:text-white">
                창작자
            </h3>
            <div className="flex mb-5 gap-5 overflow-x-auto max-w-full">
                {assetDetail?.creators?.length > 0 && (
                    <div className="flex flex-nowrap gap-3">
                        {assetDetail?.creators?.map((creator, index) => {
                            return (
                                <div
                                    className="flex-shrink-0 mb-4 flex"
                                    key={'creator' + index}
                                >
                                    <figure className="mr-2 ">
                                        <div className="relative block">
                                            <Image
                                                width={38}
                                                height={38}
                                                src={metaImg}
                                                alt={'owner photo'}
                                                className="rounded-full h-12 w-12"
                                                loading="lazy"
                                            />
                                        </div>
                                    </figure>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-black dark:text-white block text-sm font-semibold">
                                            {creator.username
                                                ? creator.username
                                                : 'noUserName'}
                                        </span>
                                        <div className="text-accent block">
                                            <span className="text-sm font-bold">
                                                {creator.name ? creator.name : 'noName'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <h3 className="font-display text-jacarta-700 mb-4 text-l font-semibold dark:text-white">
                저작권자
            </h3>
            <div className="flex mb-5 gap-5 overflow-x-auto max-w-full">
                {assetDetail?.copyrightHolders?.length > 0 && (
                    <div className="flex flex-nowrap gap-3">
                        {assetDetail?.copyrightHolders?.map((copyrightHolder, index) => {
                            return (
                                <div
                                    className="mb-4 flex flex-shrink-0"
                                    key={'copyrightHolder' + index}
                                >
                                    <figure className="mr-2 ">
                                        <div className="relative block">
                                            <Image
                                                width={38}
                                                height={38}
                                                src={metaImg}
                                                alt={'owner photo'}
                                                className="rounded-full h-12 w-12"
                                                loading="lazy"
                                            />
                                        </div>
                                    </figure>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-black dark:text-white block text-sm font-semibold">
                                            {copyrightHolder.username
                                                ? copyrightHolder.username
                                                : 'noUserName'}
                                        </span>
                                        <div className="text-accent block">
                                            <span className="text-sm font-bold">
                                                {copyrightHolder.name
                                                    ? copyrightHolder.name
                                                    : 'noName'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <h3 className="font-display text-jacarta-700 mb-4 text-l font-semibold dark:text-white">
                발행된 라이선스 목록
            </h3>
            <div className="flex gap-2 flex-wrap">
                {assetDetail?.copyrightTypes
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((license, index) => {
                        return (
                            <OutlineBtnSmall
                                className="border-jacarta-200 py-1"
                                key={'license' + index}
                            >
                                {license.name ? license.name : 'noLicense'}
                            </OutlineBtnSmall>
                        )
                    })}
            </div>
        </div>
    )
}
