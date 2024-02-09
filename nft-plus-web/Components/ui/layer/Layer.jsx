import { useState } from "react";
import Backdrop from "Components/ui/popup/BackDrop";
import { motion } from "framer-motion";
import Image from "next/image";
import closeIcon from "public/close.svg";
import Checkbox from "../checkbox/Checkbox";
import useAlertTranslation from "locale/useAlertTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";

export default function Layer({ noHeader, onTop, children, layer, closeLay, width, title, confirmVal, errorLay, borderless, triple, tripleVal, noPadding, confirm, loading, confirmTriple, contract, closeLayVal, forBuy, agreed }) {
    const [buyContractCheckTxt, setbuyContractCheckTxt] = useState(false);
    const [buyCheckbox, setbuyCheckbox] = useState(false);
    const { purchaseI18 } = useAlertTranslation();
    const {
        orderPurchaseI18,
        orderDescription1I18,
        orderDescription2I18,
        orderCheckboxI18
    } = useArtworkTranslation();

    function closedAdd() {
        setbuyContractCheckTxt(false);
        setbuyCheckbox(false);
        closeLay();
    }

    function confirmAdd() {
        // setbuyContractCheckTxt(false);
        // setbuyCheckbox(false);
        confirm();
    }
    return (
        <Backdrop isLayer={layer} onTop={onTop}>
            <motion.div animate={{ scale: layer ? [0.5, 1.2, 0.9, 1.1, 1] : 0.5 }} transition={{ duration: 0.5 }} className={`${width ? width : "w-[572px]"} rounded-[10px] max-h-screen relative  bg-white flex flex-col`}>
                {!errorLay &&
                    (!noHeader ? (
                        <div className={`w-full py-4 px-[25px] flex flex-col justify-between flex-1 overflow-auto`}>
                            <div className={`flex items-center justify-between  pb-4 ${borderless ? "" : "border-b-2"} border-[#333]`}>
                                <h3 className="font-[500] text-[#010101] text-[22px]">{title}</h3>
                                <button onClick={!loading ? closedAdd : () => { }} className="w-[20px] h-[20px]">
                                    <Image  src={closeIcon} alt="closeIcon" />
                                </button>
                            </div>
                            {children}
                            {forBuy && buyContractCheckTxt && (
                                <div>
                                    <h3 className="text-center text-xl">{orderPurchaseI18}</h3>
                                    <div style={{ backgroundColor: "#F5F5F5", border: "1px solid #D9D9D9", color: "#4E4949" }} className="p-4 mt-3 mb-3 text-sm">
                                        <p className="text-[14px] text-[#DDD] font-[400] mb-4">{orderDescription1I18}</p>
                                        <p className="text-[14px] text-[#DDD] font-[400]">{orderDescription2I18}</p>
                                    </div>
                                    <div className="text-base flex justify-center">
                                        <div className="flex items-center mt-4">
                                            <label htmlFor="checkbox" className="inline-flex pointer items-center">
                                                <Checkbox
                                                    id="checkbox"
                                                    onClick={() => {
                                                        setbuyCheckbox(!buyCheckbox);
                                                    }}
                                                />
                                                <p style={{ color: "#D9D9D9" }} htmlFor="checkbox" className="ml-[4px] mr-[10px]">
                                                    {orderCheckboxI18}
                                                </p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full">{children}</div>
                    ))}
                {!errorLay && !forBuy && (
                    <div className="w-full flex font-[300] relative z-40 ">
                        <button onClick={closeLay} disabled={loading ? true : false} className={`w-1/2 bg-[#333] text-white py-4 text-center rounded-bl-lg cursor-pointer`} style={buyContractCheckTxt ? { display: "none" } : {}}>
                            <h3 className="text-[20px] font-[500]">{closeLayVal}</h3>
                        </button>
                        {triple && (
                            <button onClick={confirmTriple} disabled={loading ? true : false} className="w-1/2 bg-[#484848] text-white py-4 cursor-pointer text-center">
                                <h3 className="text-[20px] font-[500]">{tripleVal}</h3>
                            </button>
                        )}
                        <button onClick={confirm} disabled={loading ? true : contract ? true : false} className={`w-1/2 bg-[#ff00e4] ${loading ? "cursor-wait bg-opacity-60" : contract ? "cursor-not-allowed bg-opacity-60" : "cursor-pointer"} text-white py-4 focus:outline-none text-center rounded-br-lg`}>
                            <h3 className="text-[20px] font-[500]">{confirmVal}</h3>
                        </button>
                    </div>
                )}

                {!errorLay && forBuy && (
                    <div className="w-full flex font-[300] relative z-40">
                        <button onClick={closeLay} disabled={loading ? true : false} className={`w-1/2 bg-[#333] text-white py-4 text-center cursor-pointer`} style={buyContractCheckTxt ? { display: "none" } : {}}>
                            <h3>{closeLayVal}</h3>
                        </button>
                        <button
                            onClick={() => {
                                setbuyContractCheckTxt(!buyContractCheckTxt);
                            }}
                            disabled={!agreed}
                            className={`w-1/2 bg-[#ff00e4] ${!agreed ? "cursor-not-allowed bg-opacity-60" : contract ? "cursor-not-allowed bg-opacity-60" : "cursor-pointer"} text-white py-4 text-center rounded-br-lg`}
                            style={buyContractCheckTxt ? { display: "none" } : {}}>
                            <h3 className="text-[20px] font-[500]">{confirmVal}</h3>
                        </button>
                        <button
                            onClick={() => {
                                buyCheckbox ? confirmAdd() : alert(purchaseI18);
                            }}
                            disabled={!agreed}
                            className={`w-full bg-[#333] rounded-bl-lg ${!agreed ? "cursor-not-allowed bg-opacity-60" : contract ? "cursor-not-allowed bg-opacity-60" : "cursor-pointer"} text-white py-4 text-center`}
                            style={!buyContractCheckTxt ? { display: "none" } : { display: "block" }}>
                            <h3 className="text-[20px] font-[500]">{confirmVal}</h3>
                        </button>
                    </div>
                )}

                {errorLay && <div className={`" ${noPadding ? "" : "py-12 px-8"}  flex flex-col items-center  justify-center text-center relative"`}>{children}</div>}
            </motion.div>
        </Backdrop>
    );
}
