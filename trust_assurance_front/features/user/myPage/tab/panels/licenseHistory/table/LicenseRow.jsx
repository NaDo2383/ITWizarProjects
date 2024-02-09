import { useGlobalPopupCtx } from "@/common/popup/useGlobalPopupCtx";
import React from "react";
import { useState } from "react";
import { GLOBAL_POPUP_TYPES } from "@/common/popup/globalPopupRegistration";
import { useEffect } from "react";

function LicenseRow(props) {
  const [copied, setCopied] = useState(false);
  const { showGlobalPopup, hideGlobalPopup } = useGlobalPopupCtx()

  const { media_name, period_of_use, price, purchase_completed_at, transaction_hash, type } = props;
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
    <div className="table-item">
      <div className="column">
        <h6 className="price gem">
          {media_name}
        </h6>
      </div>
      <div className="column">{type}</div>
      <div className="column tooltipcell" onClick={() => { handleCopyToClipboard(transaction_hash) }}>
        <span className="tooltiptext">{transaction_hash}</span>
        {transaction_hash?.slice(0, 14) + "..."}
      </div>
      <div className="column">{formatDate(period_of_use[0]) + "~\n" + formatDate(period_of_use[1])}</div>
      <div className="column">
        <span className="tf-color">{price} ETH</span>
      </div>
      <div className="column">
        <span className="tf-color pre-wrap">{purchase_completed_at.replace("수요일", "\n수요일")}</span>
      </div>
    </div>
  );
}

export default LicenseRow;
