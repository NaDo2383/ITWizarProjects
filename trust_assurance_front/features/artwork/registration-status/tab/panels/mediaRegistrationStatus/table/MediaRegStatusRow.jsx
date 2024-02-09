import { POPUP_TYPES } from "@/common/popup/popupRegistration";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import { OutlineBtn } from "@/components/ui/button/OutlineBtn";
import useArtworks from "@/features/artwork/useArtworks";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
function MediaRegStatusRow({ data }) {
  const { showPopup, setPopupState } = usePopupCtx();
  const { tokenid, date, token_type, media_name, type, copyrighttoken, consignednftaddress } = data;
  const [licenseDetail, setLicenseDetail] = useState();
  const { getMediaLicenseDetail } = useArtworks();

  const handleCancelConsignment = useCallback(() => {
    setPopupState(prev => ({ ...prev, consignCancelingTokenId: tokenid, consignedNFTAdress: consignednftaddress }))
    showPopup(POPUP_TYPES.NFT_CONSIGNMENT);
  }, []);
  const showRegisterTicketSalesPopup = () => {
    showPopup(POPUP_TYPES.REGISTER_TICKET_SALES);
    setPopupState(prev => ({ ...prev, type: type, copyrighttoken: copyrighttoken, mediaNftId: tokenid }))
  };

  const showMintCopyrighttokenPopup = () => {
    showPopup(POPUP_TYPES.LICENSE_MINT);
    setPopupState(prev => ({ ...prev, newId: tokenid, mintedRights: type, consignedNFTAdress: consignednftaddress }))
  };

  useEffect(() => {
    tokenid && getMediaLicenseDetail(tokenid).then((res) => setLicenseDetail(res.data))
  }, [tokenid]);

  return (
    <div className="table-item">
      <div className="column">
        <h6 className="price gem break-words">{media_name}</h6>
      </div>
      <div className="column">{token_type}</div>
      <div className="column">{tokenid}</div>
      <div className="column keep-all">{date}</div>
      <div className="column break-words flex-wrap">
        {
          type?.length > 0 && type?.[0] ? type?.map((license, index) => {
            if (index === 0) {
              return license
            } else {
              return license
            }
          }) + `(${type?.length}종)` : "X"
        }
      </div>
      <div className="column">
        <Actions>
          {type?.length > 0 && type?.length < 7 && token_type !== "위탁 취소" &&
            <OutlineBtn onClick={() => showMintCopyrighttokenPopup()}>저작권 토큰 발행</OutlineBtn>
          }
          {type?.length > 0 && licenseDetail?.length < 7 && type?.[0] && token_type !== "위탁 취소" &&
            <OutlineBtn onClick={() => showRegisterTicketSalesPopup()}>
              판매 등록
            </OutlineBtn>}
          {token_type === "위탁" && <OutlineBtn danger="true" onClick={handleCancelConsignment}>
            위탁 취소
          </OutlineBtn>}
        </Actions>
      </div>
    </div>
  );
}

export const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    & button {
        min-width: 140px;
        font-size: 12px;
    }
    justify-content: center;
`;

export default MediaRegStatusRow;
