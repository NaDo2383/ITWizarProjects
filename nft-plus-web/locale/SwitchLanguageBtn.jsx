import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { setLocal } from "../utils/storage";

function SwitchLanguageBtn() {
  const { locale, locales } = useRouter();
  const router = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);

  const lanActiveColor = { color: "#000" };
  useEffect(() => {
    setLocal("chosenLang", locale);
  }, [locale]);
  
  return (
    <div className="flex flex-1 flex-wrap gap-6">
      <Link href={router.asPath} locale="ko" passHref>
        <h3
          className={`font-[500] text-base xl:text-[20px] cursor-pointer w-max py-3 text-[#666]  flex items-center Pretendard_Font`}
          style={otherLocale === "ko" ? {} : lanActiveColor}>
          KR
        </h3>
      </Link>
      <Link href={router.asPath} locale="en" passHref>
        <h3
          className={`font-[500] text-base xl:text-[20px] cursor-pointer w-max py-3 text-[#666]  flex items-center Pretendard_Font`}
          style={otherLocale === "en" ? {} : lanActiveColor}>
          ENG
        </h3>
      </Link>
    </div>
  );
}

export default SwitchLanguageBtn;
