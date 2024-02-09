import Image from 'next/image'
import React from 'react'
import { TAnalyzeResults } from 'features/analyze/store/analyzeReducer'
import { useGlobalPopupCtx } from 'common/popup/globalPopups/useGlobalPopupCtx'
import { GLOBAL_POPUP_TYPES } from 'common/popup/globalPopups/globalPopupRegistration'

type TAnalyzeResultTableRow = {
    analyzeResultItem: TAnalyzeResults
}

function AnalyzeTableRow({ analyzeResultItem }: TAnalyzeResultTableRow) {
    console.log('analyzeResultItem: ', analyzeResultItem)
    const { showGlobalPopup, setGlobalPopupState } = useGlobalPopupCtx()

    const showExtendInfo = () => {
        setGlobalPopupState((prev: any) => ({
            ...prev,
            extendInfo: analyzeResultItem?.nftInfo?.extrametadata,
        }))
        showGlobalPopup(GLOBAL_POPUP_TYPES.INFO)
    }

    return (
        <tr>
            <td>
                {analyzeResultItem.nftInfo.chainid === 0 ? (
                    <Image src={'/images/icons/EthereumIcon.svg'} width={40} height={40} alt="image of symbols" />
                ) : analyzeResultItem.nftInfo.chainid === 1 ? (
                    <Image src={'/images/icons/PolygonIcon.svg'} width={40} height={40} alt="image of symbols" />
                ) : (
                    <Image src={'/images/icons/PropertyIcon.svg'} width={40} height={40} alt="image of symbols" />
                )}
            </td>
            <td>
                <span className="text-20">{analyzeResultItem.nftInfo.blocknumber.toLocaleString()}</span>
            </td>
            <td>
                <span className="text-20">{analyzeResultItem.nftInfo.contractaddress.substring(0, 10)}...</span>
            </td>
            <td>
                <span className="text-20">{analyzeResultItem.nftInfo.title}</span>
            </td>
            <td>
                <span className="text-20">{analyzeResultItem.nftInfo.owneraddress}</span>
            </td>
            <td>
                <span className="text-20">{analyzeResultItem.nftInfo.tokenid}</span>
            </td>
            <td>
                <span className="text-20">{analyzeResultItem.nftInfo.asseturl.substring(0, 20)}...</span>
            </td>
            <td>
                <span onClick={() => showExtendInfo()} className="text-20 cursor-pointer">
                    Extend info
                </span>
            </td>
        </tr>
    )
}

export default AnalyzeTableRow
