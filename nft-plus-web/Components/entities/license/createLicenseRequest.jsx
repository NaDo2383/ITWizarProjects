import useArtworkTranslation from "locale/useArtworkTranslation";
import ResponsiveLicenseForm from "./ResponsiveLicenseForm";
import LicenseForm from "./LicenseForm";
import { useEffect } from "react";
import useArtDetail from "../artwork/detail/useArtDetail";
import { useRouter } from 'next/router'
import useLicenseForm from "./useLicenseForm";

export default function CreateArtworkLicenseRequest() {
  const { query, back } = useRouter()
  const { getArtDetail } = useArtDetail()
  const { handleClickApply } = useLicenseForm()
  const {
    createArtworkTitleI18,
    cancel: cancelI18,
    apply: applyI18,
  } = useArtworkTranslation();
  
  useEffect(() => {
    query?.id && getArtDetail(query?.id)
  },[query])

  return (
    <div className="w-full md:w-[760px] py-12 mx-auto min-h-screen flex flex-col justify-between bg-white">
      <div className="w-full h-full py-[31px] border px-[30px] relative">
        <div className="w-full py-5 flex justify-between items-center border-b-2 border-[#000]">
          <h3 className="font-medium text-[22px]">
            {createArtworkTitleI18}
          </h3>
        </div>
        <LicenseForm />
        <ResponsiveLicenseForm />
      </div>
      <div className="flex w-full  text-[15px] text-white">
        <button
          className="w-1/2 text-center bg-[#333] font-light py-4"
          type="button"
          onClick={() => back()}>
          {cancelI18}
        </button>
        <button
          className="w-1/2 text-center bg-[#ff00e4] font-light py-4"
          type="button"
          onClick={() => handleClickApply(query?.id) }>
          {applyI18}
        </button>
      </div>
    </div>
  );
}
