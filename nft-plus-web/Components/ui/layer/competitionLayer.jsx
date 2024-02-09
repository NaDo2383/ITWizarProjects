import React from "react";
import useMyPageTranslation from "locale/useMypageTranslation";
import closeIcon from "public/close.svg";
import Image from "next/image";
import useAlertTranslation from "locale/useAlertTranslation";
import useCommonTranslation from "locale/useCommonTranslation";

function CompetitionLayer(props) {
    const { close } = props;
    const { competitionIsExpiredI18 } = useAlertTranslation();
    const { confirmI18 } = useMyPageTranslation();
    const { noticeI18 } = useCommonTranslation()

    return (
        <>
            <div className="relative flex flex-col bg-white tracking-tighter w-[535px] mx-[10px] rounded-lg">
                <div className="w-full px-6">
                    <div className="flex items-center justify-between py-4 border-b-2 border-black">
                        <h2 className="text-[22px] font-bold">{noticeI18}</h2>
                        <button onClick={close} className="w-[20px] h-[20px]">
                            <Image src={closeIcon} alt="close" />
                        </button>
                    </div>
                    <h3 className="text-lg py-[86px] font-semibold sm:px-[135px]">{competitionIsExpiredI18}</h3>
                </div>
                <button className="w-full py-[13px] text-white text-[20px] font-semibold bg-pinky rounded-b-lg" onClick={close}>{confirmI18}</button>
            </div>
        </>
    );
}


export default CompetitionLayer;