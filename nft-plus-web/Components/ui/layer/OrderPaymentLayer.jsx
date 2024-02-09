import React, {useState} from "react";
import MainLayer from "./MainLayer";
import Web3 from "web3";
import matic_logo from "public/matic-logo.png";
import eyesicon from "public/eyesicon.svg";
import closeIcon from "public/close.svg";
import useCommonTranslation from "locale/useCommonTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import Image from "next/image";
import {useEffect} from "react";
import Checkbox from "Components/ui/checkbox/Checkbox";
import defart from "public/no_photo.png";
import defpro from "public/def_pro.png";

function OrderPaymentLayer(props) {
    const { thumbnail, title, owner , price } = props
    const {isOpen, type, currency, close, makePayment} = props;
    const {total: totalI18, checkAllTermsI18, makePaymentI18} = useCommonTranslation();
    const {orderPaymentI18, cancel} = useArtworkTranslation();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [acceptTermsError, setAcceptTermsError] = useState(false);

    function handlePayment() {
        if (acceptTerms) {
            makePayment();
        } else {
            setAcceptTermsError(true);
            alert(checkAllTermsI18);
        }
    }

    function updateAcceptTerms() {
        setAcceptTerms((prev) => !prev);
    }
    useEffect(() => {
        if (acceptTerms) {
            setAcceptTermsError(false);
        }
    }, [acceptTerms]);
    
    return (
        <MainLayer isOpen={isOpen}>
            <div className="px-[25px] pt-[15px] pb-[20px]">
                <div className=" flex  justify-between pb-3 border-b border-[#000000] items-center">
                    <h4 className="text-[22px] font-medium">{orderPaymentI18}</h4>
                    <button onClick={close} className="w-[20px] h-[20px]">
                        <Image  src={closeIcon} alt="closeIcon" />
                    </button>
                </div>
                <div className="flex items-center justify-between border-b  py-6 px-[0px]">
                    <div className="flex items-center">
                        <div className="relative w-[140px] h-[117px] overflow-hidden rounded-xl">
                            <Image unoptimized priority src={thumbnail ? thumbnail : defart} alt="thumbnail" objectFit="cover" layout="fill" />
                        </div>
                        <div className="ml-5  w-56">
                            <h4 className="font-semibold text-[20px]">{title}</h4>
                            <div className="flex items-center mt-2">
                                <div className="relative w-[27px] h-[27px] rounded-full overflow-hidden bg-[#333] border-[#999] border">
                                    <span
                                        style={{
                                            boxSizing: "border-box",
                                            display: "block",
                                            overflow: "hidden",
                                            height: "27px",
                                            width: "27px",
                                            background: "none",
                                            opacity: "1",
                                            border: "0px",
                                            margin: "0px",
                                            padding: "0px",
                                            position: "absolute",
                                            inset: "0px",
                                        }}>
                                        <Image priority unoptimized layout="fill" objectFit="cover" src={owner?.avatar ? owner?.avatar : defpro} alt="owner-avatar" />
                                    </span>
                                </div>
                                <span className="font-normal ml-2 text-[16px]">{owner?.name}</span>
                            </div>
                            <div className=" text-[15px] mt-3 md:hidden font-normal">
                                <span>{Web3.utils.fromWei((price || "0").toString(), "ether")}</span> {currency}
                            </div>
                        </div>
                    </div>
                    <div className=" text-[18px] text-bold text-[#DDD] hidden md:flex font-bold">
                        <div className="relative flex h-[17px] w-[17px] mx-1 my-[2px]">{type === "NOT_SELL" ? null : <Image src={currency == "EYES" ? eyesicon : matic_logo} alt="currency" />}</div>
                        {Web3.utils.fromWei((price || "0").toString(), "ether")} {currency}
                    </div>
                </div>
                <div className="flex items-center justify-between px-0 py-3  font-medium text-[20px] h-[53px]">
                    <div>{totalI18}</div>
                    <div>
                        <span className="font-bold">{Web3.utils.fromWei((price || "0").toString(), "ether")}</span> {currency}
                    </div>
                </div>
                {showTerms && <OrderPaymentTerms updateAcceptTerms={updateAcceptTerms} acceptTermsError={acceptTermsError} />}
            </div>
            <div>
                {!showTerms ? (
                    <>
                        <button className=" w-1/2 py-3 text-white bg-[#333] text-[20px] h-[56px]" onClick={close}>
                            {cancel}
                        </button>
                        <button className=" w-1/2 py-3 text-white bg-[#ff00e4] text-[20px] h-[56px]" onClick={() => setShowTerms(true)}>
                            {makePaymentI18}
                        </button>
                    </>
                ) : (
                    <button className="w-full bg-[#333] text-white py-3 text-[20px] h-[61px]" onClick={() => handlePayment()}>
                        {makePaymentI18}
                    </button>
                )}
            </div>
        </MainLayer>
    );
}

function OrderPaymentTerms({updateAcceptTerms, acceptTermsError}) {
    const {orderPurchaseI18, orderDescription1I18, orderDescription2I18, orderCheckboxI18} = useArtworkTranslation();
    return (
        <div>
            <h4 className="text-center text-[20px] mt-[16px] font-medium">{orderPurchaseI18}</h4>
            <div
                style={{
                    backgroundColor: "#F5F5F5",
                    border: "1px solid #D9D9D9",
                    color: "#4E4949",
                }}
                className="px-2 py-5 my-4 mx-[5px] text-sm text-[14px] h-full w-[518px]">
                <p className="text-[14px] text-[#DDD] font-[400] mb-4">{orderDescription1I18}</p>
                <p className="text-[14px] text-[#DDD] font-[400] mb-4">{orderDescription2I18}</p>
            </div>
            <div className="text-base flex justify-center">
                <label htmlFor="check" className="inline-flex pointer items-center">
                    <Checkbox onClick={updateAcceptTerms} id="check" />
                    {/*   <input
            type="checkbox"
            style={{ border: "1px solid #D9D9D9" }}
            className="my-1 mx-2 w-[18px] h-[18px]"
            onClick={updateAcceptTerms}
          /> */}
                    <p className={`${acceptTermsError ? " text-[#FB3873]" : " text-[#4E4949]"} mx-2`}>{orderCheckboxI18}</p>
                </label>
            </div>
        </div>
    );
}

export default OrderPaymentLayer;
