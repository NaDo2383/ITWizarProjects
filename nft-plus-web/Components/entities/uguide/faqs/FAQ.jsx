import Pagination from "Components/ui/pagination/Pagination";
import Loading from "Components/ui/loader";
import { BsChevronDown } from "react-icons/bs";
import AnimateHeight from "react-animate-height";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useEffect, useState } from "react";
import useFAQPageTranslation from "locale/useFAQpageTranslation";
import { useRouter } from "next/router";
import useFaq from "./useFaq";

const FAQ = ({}) => {
  const { locale } = useRouter();
  const { tableNoData } = useFAQPageTranslation();
  const {
    faqs,
    setfaqs,
    getFaqs,
    changeCategory,
    paginate,
    showAnswer,
    chosenCategory,
    questionIndex,
    loading,
    pageNum,
    isAnswer,
    setChosenCategory,
    getCategorys,
    cats,
    setCats
  } = useFaq();
  
  useEffect(() => {
    getCategorys();
  }, []);

  useEffect(() => {
    if (cats && cats?.length > 0) {
      setChosenCategory(cats[0].value);
    }
  }, [cats, cats?.length]);

  useEffect(() => {
    if (chosenCategory) {
      getFaqs({
        id: chosenCategory,
        params: {
          lang: locale === "en" ? locale : "",
          page: pageNum,
          size: 10
        }
      });
    }
  }, [chosenCategory, pageNum, locale]);

  return (
    <div className="sm:container min-w-[328px] w-full mx-auto h-full flex flex-col lg:px-0">
      <div className="flex items-center gap-[10px] pt-[15px] mb-8 md:mb-16 lg:mb-[80px] overflow-x-scroll scrollbar-hide">
        {cats.length > 0 &&
          cats.map((cat) => (
            <p
              key={`category-${cat.value}`}
              style={{transition: ' transform 250ms ease-in-out'}}
              onClick={() => changeCategory(cat.value)}
              className={`lg:text-[18px] md:text-[16px] text-[14px] text-[#fff] font-[400] cursor-pointer border-[1.5px] rounded-[30px] lg:px-[20px]  md:px-4 p-[4px_10px_5px_10px] whitespace-nowrap ${
                chosenCategory === cat.value
                  ? "border-[#FB3873]"
                  : "border-[#434343] tabBorder"
              }`}>
              {cat.value}
            </p>
          ))}
      </div>
      {
        <div className="w-full">
          {loading ? (
            <div className="h-[300px]">
              <Loading />
            </div>
          ) : faqs ? (
            faqs.content ? (
              <div>
                {faqs.content.map((item, index) => (
                  <div key={`item-${index}`}>
                    <div
                      onClick={() => showAnswer(index)}
                      className={`w-full bg-[#282828] relative py-5 flex items-center sm:border-t border-t-[0.5px] border-[#ABABAB] sm:border-b-0 border-b-[0.5px] ${
                        isAnswer && questionIndex === index
                          ? "text-[#FB3873]"
                          : "text-[#fff]"
                      }`}>
                      <p className={` font-[400] sm:text-[20px] text-[12px] pl-[20px] pr-[45px] text-[#fff]`}>
                        Q
                      </p>
                      <p
                        className={`flex-1 cursor-pointer sm:text-[20px] text-[12px]  ${
                          isAnswer && questionIndex === index
                            ? "font-[500] text-[#FB3873]"
                            : "font-[300] text-[#fff]"
                        }`}>
                        {item.question}
                      </p>
                      <div className="px-4 sm:px-5">
                        <div
                          className={`transform text-[#fff] ${
                            index === questionIndex && isAnswer
                              ? "rotate-180"
                              : "rotate-0"
                          }`}>
                          <BsChevronDown />
                        </div>
                      </div>
                    </div>
                    {
                      <div
                        style={{
                          transition: "all .3s !important"
                        }}
                        className={`w-full transition duration-300 origin-top transform overflow-hidden ${
                          isAnswer ? "scale-y-100" : "scale-y-0"
                        }`}>
                        {
                          <div className="w-full">
                            <AnimateHeight
                              duration={300}
                              height={
                                isAnswer && index === questionIndex ? "auto" : 0
                              }>
                              <div
                                className={`transition bg-[#141414] h-full text-[#DDD] duration-300 transform sm:px-[80px] px-24 sm:pt-[30px] sm:pb-[50px] p-5 flex items-start gap-4`}>
                                <div className="flex-1 font-[300] whitespace-normal sm:text-[16px] text-[12px]">
                                  <div dangerouslySetInnerHTML={{ __html: item?.answer }}></div>
                                </div>
                              </div>
                            </AnimateHeight>
                          </div>
                        }
                      </div>
                    }
                  </div>
                ))}
                <div className="w-full flex justify-center mt-[100px] mb-[200px]">
                  {faqs?.content && (
                    <Pagination
                      data={faqs.content}
                      current={faqs.number}
                      changePage={paginate}
                      toNextPage={paginate}
                      toPrevPage={paginate}
                      toFirstPage={paginate}
                      toLastPage={paginate}
                      totalPages={faqs.totalPages}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-72">
                <div className="w-full h-full flex-col flex justify-center items-center pt-6">
                  <MdOutlineImageNotSupported className="text-8xl text-[#666]" />
                  <p className="font-[500] ">{tableNoData}</p>
                </div>
              </div>
            )
          ) : (
            <p></p>
          )}
        </div>
      }
    </div>
  );
};

export default FAQ;
