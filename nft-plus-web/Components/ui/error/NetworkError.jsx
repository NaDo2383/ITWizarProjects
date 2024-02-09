import React from "react";
import { MdReportGmailerrorred } from "react-icons/md";
import useCommonTranslation from "locale/useCommonTranslation";

const NetWorkError = () => {
  const { errorI18 } = useCommonTranslation();
  
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <MdReportGmailerrorred className="text-8xl text-[#666]" />
      <p className="text-[#666] font-bold">{errorI18}</p>
    </div>
  );
};

export default NetWorkError;
