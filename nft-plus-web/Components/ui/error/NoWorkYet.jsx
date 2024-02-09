import React from "react";
import Image from "next/image";
import greenRectangle from "public/greenRectangle.png";
import { useRouter } from "next/router";
import useMyPageTranslation from "locale/useMypageTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";

const NoWorkYet = () => {
  const { push } = useRouter();
  const { noWorkYetI18, registerNewNftI18 } = useMyPageTranslation();
  const { authUser } = useGlobalContext()

  return (
    <div className="flex flex-col items-center text-[#666] lg:pt-[100px] lg:mb-[81px] sm:pt-[100px] sm:mb-[81px] pt-0 pb-0">
      <div className="flex flex-col items-center justify-center">
        <div className="lg:w-[242px] lg:h-[242px] sm:w-[242px] sm:h-[242px] w-[200px] h-[200px]">
          <Image src={greenRectangle} alt="greenRectangle" width={242} height={242} />
        </div>
        <div className="text-container">
          <p className=" font-medium lg:text-[20px] sm:text-[20px] text-[15px]">{noWorkYetI18}</p>
        </div>
      </div>
      {
        authUser?.role === "TAMTAM" && (
          <button
            onClick={() => push("/art/createArtwork")}
            className="flex lg:justify-between py-[10px] px-[25px] bg-[#323232] hover:bg-[#413f3f] rounded-[4px] text-[#fff] text-[20px] items-center mt-[36px]"
          >
            {registerNewNftI18}
          </button>
        )
      }  
    </div>
  );
};

export default NoWorkYet;
