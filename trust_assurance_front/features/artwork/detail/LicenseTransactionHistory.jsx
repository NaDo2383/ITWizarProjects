import React, { useEffect, useState } from "react";
import { useArtworkContext } from "../useArtworkContext";
import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";

export default function LicenseTransactionHistory() {
    const { licenseList } = useArtworkContext();
    const [copied, setCopied] = useState(false);
    const { showGlobalPopup, hideGlobalPopup } = useGlobalPopupCtx()

    function formatDate(Date) {
        const inputDate = Date.toString()
        if (inputDate.length !== 8) {
            // Check if the input date is in the correct format
            return "Invalid date format";
        }

        const year = inputDate.slice(0, 4);
        const month = inputDate.slice(4, 6);
        let day = inputDate.slice(6);

        // Convert the last two digits of the day to an integer
        day = parseInt(day, 10);

        // Check if the day is less than 10, and if so, convert it to a single digit string
        if (day < 10) {
            day = day.toString();
        }

        // Create the formatted date string
        const formattedDate = `${year}년 ${parseInt(month, 10)}월 ${day}일`;

        return formattedDate;
    }

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
                <h6>이용권 거래 이력</h6>
                <i className="icon-keyboard_arrow_down" />
                <div className="content">
                    <div className="table-heading">
                        <div className="column">저작권 유형</div>
                        <div className="column">구매자</div>
                        <div className="column">트랜잭션 해쉬</div>
                        <div className="column">이용기간</div>
                        <div className="column">이용권 구매일</div>
                    </div>
                    {licenseList?.length > 0 &&
                        licenseList?.map((licenseList, index) => {

                            return (
                                <div className="table-item" key={"bnvgjfds" + index}>
                                    <div className="column">{licenseList.type}</div>
                                    <div className="column">
                                        {licenseList.customer_id}
                                    </div>
                                    <div className="column tooltipcell" onClick={() => handleCopyToClipboard(licenseList.transaction_hash)}>
                                        {licenseList.transaction_hash?.slice(0, 14)}...
                                        <span className="tooltiptext">{licenseList.transaction_hash}</span>
                                    </div>
                                    <div className="column pre-wrap">
                                        {formatDate(licenseList.period_of_use[0]) + " ~ \n" + formatDate(licenseList.period_of_use[1])}
                                    </div>
                                    <div className="column pre-wrap">{licenseList.purchase_completed_at.replace("화요일", "\n화요일")}</div>
                                </div>
                            );

                        })}
                </div>
            </div>
        </div>
    );
}
