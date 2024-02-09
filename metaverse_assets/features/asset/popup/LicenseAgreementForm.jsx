import React, { useEffect, useState } from 'react'
import Checkbox from 'a/components/ui/form/elements/checkbox/Checkbox'
// import CheckboxGroup from 'a/components/ui/form/elements/checkbox/CheckboxGroup'
import tw from 'tailwind-styled-components'
import Button from 'a/components/ui/button/Button'
import { useAssetCtx } from '../useAssetCtx'
import useAsset from '../useAsset'
import { useGlobalCtx } from 'a/common/global/useGlobalCtx'
import useWeb3 from 'a/common/web3/useWeb3'
import { useGlobalPopupCtx } from 'a/common/popup/globalPopups/useGlobalPopupCtx'
import licenseContractAddress from 'common/blockchain/contracts/LicenseNFT/location.json'
import { GLOBAL_POPUP_TYPES } from 'a/common/popup/globalPopups/globalPopupRegistration'
import { usePopupCtx } from 'a/common/popup/usePopupCtx'
import { useRouter } from 'next/router'
import { useUserCtx } from 'a/features/user/useUserCtx'
export const licenseInformation = [
    {
        name: '수익화 가능',
        checked: false,
    },
    {
        name: '재판매 가능',
        checked: false,
    },
]

function LicenseAgreementForm() {
    const { userInfo } = useUserCtx()
    const [isLoading, setIsLoading] = useState(false)
    const { web3Items } = useGlobalCtx()
    const { assetDetail } = useAssetCtx()
    const { saveLicenseToken, getLicenseAndCopyrightList } = useAsset()
    const { licenseMint, checkNetwork } = useWeb3()
    const { showGlobalPopup } = useGlobalPopupCtx()
    const { hidePopup } = usePopupCtx()
    const { push } = useRouter()

    async function handlePurchaseLicense() {
        setIsLoading(true)
        try {
            const { web3 } = web3Items
            const accounts = await web3.eth.getAccounts()
            if (accounts[0].toLowerCase() !== userInfo.walletAddress.toLowerCase()) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '본인 지갑 주소를 연결해주세요.',
                })
                return
            }
            const userName = assetDetail?.termsOfUse?.licenseInfo?.username
            const userId = assetDetail?.termsOfUse?.licenseInfo?.userId
            // const assetTokenId = assetDetail?.tokens?.find(
            //     (token) => token.type === 'ASSET'
            // )?.token
            const assetTokenId = assetDetail?.token
            const licenses = assetDetail?.termsOfUse?.licenseInfo?.copyrightTypes
            // const checkedLicenseIds = licenses.map((license) => Number(license.id - 1))
            const checkedLicenseNames = licenses.map((license) => license.name)
            const payloadLicenseNames = checkedLicenseNames.join(', ')

            const licenseContractInfos = [
                `저작권유형:${payloadLicenseNames}`,
                `재판매가능:${
                    assetDetail?.termsOfUse?.resaleAllowed ? 'yes' : 'no'
                } 수익화가능:${
                    assetDetail?.termsOfUse?.commercialAllowed ? 'yes' : 'no'
                }`,
                assetDetail?.termsOfUse?.licenseInfo?.lriif,
            ]
            // энд safeMint дуудагдана
            const payload = {
                to: accounts[0],
                srcTokenId: assetTokenId,
                userInfos: [userName, userId],
                licenseContractInfos,
            }

            const safeMint = await licenseMint(payload)

            if (!safeMint) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message:
                        '블록체인에서 라이센스 거래를 하는 동안 문제가 발생했습니다!',
                })
                return
            }
            const licenseTokenId = safeMint?.events?.Minted?.returnValues?.tokenId
            // / дараа нь
            const licenseTokenPayload = {
                assetId: assetDetail?.id,
                token: licenseTokenId,
                contractAddress: licenseContractAddress.address,
                transactionHash: safeMint?.transactionHash,
                ownerAddress: accounts[0],
                licenseInfoId: assetDetail?.termsOfUse?.licenseInfo?.id,
                licenseUserId: 'phill',
                licenseUserName: 'phill',
            }

            const licenseTokenRes = await saveLicenseToken(licenseTokenPayload)

            if (licenseTokenRes.status === 200) {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: '라이선스 계약이 완료되었습니다.!',
                })
                getLicenseAndCopyrightList(assetTokenId)
                push({
                    pathname: '/my-page',
                    query: { activeTabId: 1 },
                })
                hidePopup()
            } else {
                showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                    message: 'Sorry: cant create license',
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkNetwork().then((chainId) => {
            if (chainId !== '2021') {
                showGlobalPopup(GLOBAL_POPUP_TYPES.CHANGE_NETWORK)
            }
        })
    }, [])

    return (
        <>
            <h1 className="font-bold">
                에셋 이름:
                <span className="ml-1">{assetDetail?.title}</span>
            </h1>
            <div className="mt-2">
                <FormTitle>저작권 유형</FormTitle>
                <div className="p-2">
                    {/* <CheckboxGroup groupName="copyRightTypes"> */}
                    {assetDetail?.termsOfUse?.licenseInfo?.copyrightTypes.map(
                        (item, idx) => (
                            <Checkbox
                                key={'copyright-type-' + idx}
                                name={item.name}
                                label={item.name}
                                checked={true}
                                item={item}
                                disabled
                            />
                        )
                    )}
                    {/* </CheckboxGroup> */}
                </div>
            </div>
            <div className="mt-2">
                <FormTitle>라이선스 정보</FormTitle>
                <h3>
                    {assetDetail?.termsOfUse?.licenseInfo?.username} -{' '}
                    {assetDetail?.termsOfUse?.licenseInfo?.userId}
                </h3>
                <div className="p-2">
                    <h1 className="font-bold mb-2">라이선스 조건</h1>
                    <Checkbox
                        key={'commercialAllowed-checkbox'}
                        name={'commercialAllowed'}
                        label={'재판매 가능'}
                        checked={assetDetail?.termsOfUse?.commercialAllowed}
                        disabled
                    />
                    <Checkbox
                        key={'resaleAllowed-checkbox'}
                        name={'resaleAllowed'}
                        label={'수익화 가능'}
                        checked={assetDetail?.termsOfUse?.resaleAllowed}
                        disabled
                    />
                </div>
                <div className="p-2">
                    <h1 className="font-bold mb-2">라이선스 계약서(LRIIF)</h1>
                    <p className="bg-white p-2">
                        {assetDetail?.termsOfUse?.licenseInfo?.lriif}
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <Button
                        width={200}
                        onClick={handlePurchaseLicense}
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        계약하기
                    </Button>
                </div>
            </div>
        </>
    )
}

export const FormTitle = tw.h3`
    bg-jacarta-100
    dark:bg-jacarta-700
    px-4
    py-2
`

export default LicenseAgreementForm
