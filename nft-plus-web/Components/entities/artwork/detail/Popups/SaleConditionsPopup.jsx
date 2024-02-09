import usePopup from "Components/ui/popup/usePopup";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import MainPopup from "Components/ui/popup/MainPopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupHeader from "Components/ui/popup/popupMaterials/PopupHeader";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";

const SaleConditionsPopup = () => {
  const {
    changeTermsConfirmI18,
    notPossibleChargeI18
  } = useArtworkTranslation();
  const { confirmI18 } = useFAQpageTranslation();
  const { hideModal, hideAllModals } = usePopup()
  
  return (
    <>
      <MainPopup width={530}>
        <PopupContainer>
          <PopupHeader text={changeTermsConfirmI18} />
          <PopupContent>
            <div className="flex items-center pt-[30px] px-[0px]">
              <div className="flex items-center">
                <div className="w-full flex items-center gap-[13px]">
                  <h6 className="font-[400] text-[14px] sm:text-[18px] text-[#DDD]">
                    {notPossibleChargeI18}
                  </h6>
                </div>
              </div>
            </div>
          </PopupContent>
          <div className="w-full flex flex-row justify-end font-[300] gap-[10px] right-[30px] mt-[30px]">
            <button
              className={`max-w-[115px] w-full bg-[#FB3873]  text-white py-[6px] focus:outline-none text-center rounded-[5px] `}
              onClick={() => hideAllModals()}
            >
              <h5 className="lg:text-[18px] md:text-[16px] text-[14px] font-[500]">{confirmI18}</h5>
            </button>
          </div>
        </PopupContainer>
      </MainPopup>
    </>
  );
};

export default SaleConditionsPopup;
