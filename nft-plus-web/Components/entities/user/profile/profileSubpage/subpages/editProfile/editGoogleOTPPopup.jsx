/**
 * @createdBy duka 
 */
import { useEffect, useState } from "react";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import Image from "next/image";
import shield_icon from "public/shield_icon.png";
import closeIcon from "public/close.svg";
import useMyPageTranslation from "locale/useMypageTranslation";
import Verificate from "./VerificationInput";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import useArtworkTranslation from "locale/useArtworkTranslation";

function EditPasswordPopup() {
    const [opt, setOpt] = useState(false)
    const { hideModal, getCurrentModalprops } = usePopup()
    const {
        confirmI18,
        googleAuthIsEnabledI18
    } = useMyPageTranslation()
    const { cancel: cancelI18 } = useArtworkTranslation();
    const [enableOTP, setEnableOTP] = useState(false);
    const [enableQuInput, setEnableQrInput] = useState(false);
    const [qr, setQr] = useState(null);

    useEffect(() => {
        getCurrentModalprops().then(res => { setQr(res?.res?.qrCode); setOpt(res?.otpVerified) })
    }, [])

    return (
        <MainPopup>
            <div className="max-w-[580px] p-[30px] rounded-[5px] overflow-hidden max-h-screen relative  flex flex-col">
                <div className="w-full bg-[#181A1A] relative">
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-full">
                            <h3 className="text-base lg:text-[22px] px-2 md:px-4 text-[#fff] font-[500]">
                                Google OTP
                            </h3>
                        </div>
                        <button onClick={() => hideModal()} className="w-[29px] h-[29px]">
                            <Image src={closeIcon} alt="closeIcon" />
                        </button>
                    </div>
                    {!enableOTP ? (
                        <>
                            {enableQuInput ? (
                                <div className="input">
                                    <Verificate
                                        otpVerified={opt}
                                        cancel={() => setEnableQrInput(false)}
                                        done={() => setEnableOTP(true)} />
                                </div>
                            ) : (
                                <>
                                    <div className="w-[100px] h-[100px] relative flex justify-center items-center my-[40px] sm:mx-[200px] mx-[30px]">
                                        {qr && (
                                            <Image
                                                unoptimized
                                                alt="image"
                                                layout="fill"
                                                objectFit="cover"
                                                src={`data:image/jpeg;base64,${qr}`}
                                            />
                                        )}
                                    </div>
                                    <PopupActionButtons
                                        yes={() => setEnableQrInput(true)}
                                        no={() => hideModal()}
                                        btnTexts={{ no: cancelI18, yes: confirmI18 }}
                                    />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="w-full pb-7">
                                <h3 className="text-base md:text-[20px] px-2 md:px-4 tracking-[-1px] leading-[57px] text-[#010101] font-[500]  text-center">
                                    {googleAuthIsEnabledI18}
                                </h3>
                            </div>
                            <div className="w-[142px] h-[142px] rounded-full bg-[#f5f5f5] mb-4 mx-auto relative flex justify-center items-center">
                                <Image alt="shield_icon" className="absolute" src={shield_icon} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </MainPopup>
    )
}

export default EditPasswordPopup;