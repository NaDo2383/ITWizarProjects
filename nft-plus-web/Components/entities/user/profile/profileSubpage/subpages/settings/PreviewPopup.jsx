import React, { useEffect } from "react";
import Image from "next/image";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import MainCard from "Components/ui/card/MainCard";
import MainImage from "Components/ui/image/MainImage";
import closeIcon from "public/close.svg";
import useMyPageTranslation from "locale/useMypageTranslation";

function PreviewPopup() {
	const {hideAllModals} = usePopup();
    const { artistBgPreviewI18, exampleI18 } = useMyPageTranslation()

	return (
		<MainPopup width={390}>
			<div className="flex flex-col gap-4 p-[30px]">
                <div className="flex justify-between ">
                    <div className="flex flex-col gap-3 text-[16px]">
                        <p className="text-[16px] text-[#FFFFFF] ">{artistBgPreviewI18}</p>
                        <p className="text-[16px] text-[#DDDDDD]">({exampleI18})</p>
                    </div>
                    <button onClick={() => hideAllModals()} className="w-[29px] h-[29px]">
                        <Image src={closeIcon} alt="closeIcon" />
                    </button>
                </div>
                <MainCard>
                    <MainCard.Header height={200}>
                        <div className=" rounded-t-[20px] border-[2px dashed #FB3873]  ">
                            <MainImage src={"/artistDefault.png" } />                  
                        </div>
                    </MainCard.Header>
                    <MainCard.Body>
                            <div className='absolute -top-[55%] left-[50%] -translate-x-[50%] w-[110px] h-[110px] overflow-hidden rounded-full'>
                                <Image  src="/greenRectangle.png" width={110} height={110} objectFit='cover' alt='circle' className=''/>
                            </div>
                            {/* <h2 className='pt-[49px] pb-[30px] text-[18px] text-center'>{ globalModalState?.nickName }</h2> */}
                            <h4 className='pt-[49px] pb-[30px] text-[18px] font-medium text-center'>탐탐</h4>
                    </MainCard.Body>
                </MainCard>
            </div>
		</MainPopup>
	);
}

export default PreviewPopup;
