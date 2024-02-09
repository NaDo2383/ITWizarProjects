import { useState, useEffect} from "react";
import Title from "Components/ui/typography/Title";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import { useRouter } from "next/router";
import Link from "next/link";

export default function  UguideTabs({ children }) {
  const router = useRouter();
  const { 
    title, 
    tab1Title, 
    tab2Title, 
    tab3Title 
  } = useFAQpageTranslation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    if (router.route.indexOf("/faq") > -1) {
      setActiveTabIndex(0);
    } else if (router.route.indexOf("/qna") > -1) {
      setActiveTabIndex(1);
    }
  }, [router]);

  return (
    <div className="flex-1 sm:pt-[50px] lg:pb-[80px] sm:pb-2 w-full  flex flex-col items-center justify-center lg:px-[250px] px-0">
      <div className="w-full h-full flex flex-col items-center justify-start">
        <Title title={tab3Title} />
        <div className="w-full lg:px-0 px-2 sm:block hidden">
          <div className="flex text-[#fff] w-full ">
            {/*<Link href="/notice" passHref>
              <button
                className={`${
                  activeTabIndex === 0
                    ? "border-t-black bg-white text-[#333] border-b-white font-[500]"
                    : "bg-[#f7f7f7]"
                } py-3 w-[105px] sm:w-40 text-[18px] border`}
                style={{ transition: ".3s ease" }}>
                {tab1Title}
              </button>
              </Link>*/}
            <Link href="/faq" passHref>
              <button
                className={`${
                  activeTabIndex === 0
                    ? "bg-[#FB3873] text-[#fff]"
                    : "bg-[#252525]"
                } py-3 w-full font-medium lg:text-[20px] md:text-[18px] text-[16px]`}
                style={{ transition: ".3s ease" }}>
                {tab2Title}
              </button>
            </Link>
            <Link href="/faq" passHref>
              <button
                className={`${
                  activeTabIndex === 1
                    ? "bg-[#FB3873] text-[#fff]"
                    : "bg-[#252525]"
                } py-3 w-full lg:text-[20px] md:text-[18px] text-[16px] font-medium`}
                style={{ transition: ".3s ease" }}>
                {tab3Title}
              </button>
            </Link>
          </div>
        </div>
        <div
          style={{ transition: "all .3s ease" }}
          className={`container mx-auto my-[25px] hidden`}>
          {children && children}
        </div>
      </div>
    </div>
  );
}