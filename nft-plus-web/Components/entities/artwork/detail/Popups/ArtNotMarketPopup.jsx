import MainPopup from "Components/ui/popup/MainPopup";
import React from "react";
import useArtworkTranslation from "locale/useArtworkTranslation";

const ArtNotMarketPopup = () => {
  const {
    stopSellingQuestionI18,
    stopSellingWarningI18
  } = useArtworkTranslation()

  return (
    <MainPopup>
      <div className="tracking-tighter w-full relative">
        {(artStatusNotMarket || unlisting) && (
          <div className="w-full h-full absolute top-0 left-0">
          </div>
        )}
        <div className="full pt-8 pb-6 flex flex-col justify-center items-center relaive">
          <h5 className="tracking-[-1px] text-[16px] text-center px-[20x] ">
            {stopSellingQuestionI18}
          </h5>
          <h5 className="tracking-[-1px] text-[16px] text-center px-[20x] ">
            {" "}
            {stopSellingWarningI18}
          </h5>
        </div>
      </div>
    </MainPopup>
  );
};

export default ArtNotMarketPopup;
