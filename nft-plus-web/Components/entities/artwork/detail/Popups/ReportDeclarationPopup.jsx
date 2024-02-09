/**
 * @createdBy duka
 */
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from 'Components/ui/popup/usePopup'
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import closeIcon from "public/close.svg";
import Image from "next/image";

const ReportDeclarationPopup = () => {
    const { hideAllModals } = usePopup()
    const { receptionCompleteI18, declarationI18 } = useArtworkTranslation()
    const { confirmI18 } = useMyPageTranslation()
    
    return (
        <MainPopup width={572}>
            <PopupContainer>
                <div className="flex flex-row justify-between">
                    <div className="block sm:hidden w-[25px] h-[25px]"></div>
                    <h3 className="sm:text-[22px] text-[18px] text-white sm:font-bold font-medium">{declarationI18}</h3>
                    <button onClick={() => hideAllModals()} className="sm:w-[29px] sm:h-[29px] w-[25px] h-[25px] self-center">
                        <Image src={closeIcon} alt="closeIcon" />
                    </button>
                </div>
                <PopupContent>
                    <h3 className="sm:text-[18px] text-[14px] font-medium text-[#DDD] sm:my-[30px] mt-[26.96px] mb-[60px]">
                        {receptionCompleteI18}
                    </h3>
                </PopupContent>
                <div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px]">
                    <button
                        className={`sm:min-w-[74px] sm:w-auto w-full sm:bg-[#FB3873] bg-[#404040]  text-white py-[6px] focus:outline-none text-center rounded-[5px]`}
                        onClick={() => hideAllModals()}
                        type='submit'
                    >
                        <h3 className="lg:text-[18px] md:text-[16px] text-[15px] font-[500] px-[20px]">{confirmI18}</h3>
                    </button>
                </div>
            </PopupContainer>
        </MainPopup>
    )
}

export default ReportDeclarationPopup;