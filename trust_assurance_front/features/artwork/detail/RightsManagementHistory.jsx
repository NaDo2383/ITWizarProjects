import React, { useEffect, useState } from "react";
import { useArtworkContext } from "../useArtworkContext";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";

export default function RightsManagementHistory() {
    const { copyRightList } = useArtworkContext();
    const { showGlobalPopup, hideGlobalPopup } = useGlobalPopupCtx()
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            });
    };

    useEffect(() => {
        if (copied) {
            showGlobalPopup(GLOBAL_POPUP_TYPES.ALERT, {
                message: '복사되었습니다'
            })
        } else {
            hideGlobalPopup()
        }

    }, [copied])

    return (
        <div data-wow-delay="0s" className="wow fadeInUp col-12">
            <div className="product-item offers">
                <h6>저작권 관리 이력</h6>
                <i className="icon-keyboard_arrow_down" />
                <div className="content">
                    <div className="table-heading">
                        <div className="column">토큰 유형</div>
                        <div className="column">트랜잭션 해쉬</div>
                        <div className="column">컨트랙트 주소</div>
                        <div className="column">토큰 ID</div>
                        <div className="column">이벤트</div>
                        <div className="column">일자</div>
                    </div>
                    {copyRightList?.length > 0 &&
                        copyRightList?.map((copyRight, index) => {

                            return (
                                <div className="table-item" key={"nfgdjksa" + index}>
                                    <div className="column">{copyRight.token_type}</div>
                                    <div className="column tooltipcell" onClick={() => handleCopyToClipboard(copyRight.transaction_hash)}>
                                        {copyRight.transaction_hash?.slice(0, 14)}...
                                        <span className="tooltiptext">{copyRight.transaction_hash}</span>
                                    </div>
                                    <div className="column tooltipcell" onClick={() => handleCopyToClipboard(copyRight.contracts_address)}>
                                        {copyRight.contracts_address?.slice(0, 14)}...
                                        <span className="tooltiptextforwallet">{copyRight.contracts_address}</span>
                                    </div>
                                    <div className="column">{copyRight.token_id}</div>
                                    <div className="column">{copyRight.type}</div>
                                    <div className="column pre-wrap">{copyRight.create_date.replace("금요일", "\n금요일")}</div>
                                </div>
                            );

                        })}
                </div>
            </div>
        </div>
    );
}
