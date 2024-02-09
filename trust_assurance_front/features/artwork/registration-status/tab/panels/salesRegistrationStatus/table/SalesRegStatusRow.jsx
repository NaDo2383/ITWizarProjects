import { POPUP_TYPES } from "@/common/popup/popupRegistration";
import { usePopupCtx } from "@/common/popup/usePopupCtx";
import { OutlineBtn } from "@/components/ui/button/OutlineBtn";
import { useCallback } from "react";
import { Actions } from "../../mediaRegistrationStatus/table/MediaRegStatusRow";

function SalesRegStatusRow({ data }) {
    const { showPopup, setPopupState } = usePopupCtx();
    const { productid, price, medianame, copyrighttypes, date, termsofuse } =
        data;
    const handleClick = useCallback(() => {
        showPopup(POPUP_TYPES.TERMS_USE);
        setPopupState(prev => ({...prev, termsofuse:termsofuse}))
    }, []);

    return (
        <div className="table-item">
            <div className="column">
                <h6 className="price gem">{productid}</h6>
            </div>
            <div className="column">{medianame}</div>
            <div className="column keepWords">
                {copyrighttypes?.length > 0
                    ? copyrighttypes?.map((license, index) => {
                          if (index === 0) {
                              return license;
                          } else {
                              return license;
                          }
                      })+`(${copyrighttypes?.length}종)`
                    : "X"}
            </div>
            <div className="column">{price} ETH</div>
            <div className="column keepWords">{date}</div>
            <div className="column">
                <Actions>
                    <OutlineBtn onClick={handleClick}>상세보기</OutlineBtn>
                </Actions>
            </div>
        </div>
    );
}

export default SalesRegStatusRow;
