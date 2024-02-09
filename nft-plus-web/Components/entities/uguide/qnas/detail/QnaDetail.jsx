import { useEffect } from "react";
import { useRouter } from "next/router";
import UguideTabs from "Components/entities/uguide/qnas/detail/UguideTabForQnaDetail";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import parse from "html-react-parser";
import useQnas from "Components/entities/uguide/qnas/useQna";
import { useGlobalContext } from "common/global/useGlobalContext";
import Image from "next/image";

function QnaDetail() {

    const router = useRouter();
	const id = router.query.id;
	const { getQnaDetail, detail } = useQnas();
    const { globalItems, setGlobalItems } = useGlobalContext()
	const {
         answerCompleteI18, 
         waitingforAnswersI18, 
         listI18 
        } = useFAQpageTranslation();

	useEffect(() => {
		if (id) {
            if(router.query?.private){
                if(!globalItems.currentPrivateQnaDetailPass) {
                    router.push('/faq?subtab=contact-us')
                }
                getQnaDetail({
                    id,
                    body: {  password: globalItems.currentPrivateQnaDetailPass },
                });
                return
            } else {
                getQnaDetail({
                id,
                body: {},
                });
            }
		}
        return () => {
            setGlobalItems( prev => (
                {
                  ...prev,
                  currentPrivateQnaDetailPass: null
                }
              ))
        }
	}, [id, router.locale]);

  return (
            <>
                {
                    !detail ? null : 
                    <>
                        <div>
                            <UguideTabs />  
                        </div>
                        <div className="w-full sm:container min-w-[328px] mx-auto">
                        <div className="w-full px-4 py-8  border-t border-[#333] flex-col sm:flex hidden">
                            <div className="flex items-center mb-12 justify-between">
                                <div>
                                    <h2 className="text-[#ff00e4] text-[24px]">{detail?.category}</h2>
                                    <div className="flex items-center mt-2 gap-3 sm:flex-row flex-wrap">
                                        <p className="text-white text-[14px] sm:text-[20px]">
                                            {detail?.title}
                                        </p>
                                        {detail?.status === "RESOLVED" ? (
                                            <button className="text-[#fff] cursor-not-allowed border border-[#DDD] px-3 py-1 rounded-[4px] bg-[#333]">
                                                {answerCompleteI18}
                                            </button>
                                                ) : (
                                                    <button className="text-white cursor-not-allowed border border-[#FB3873] px-3 py-1 rounded-[4px]">
                                                        {waitingforAnswersI18}
                                                    </button>
                                                )}
                                            </div>
                                    </div>
                                    <p className="text-white font-[300]  text-sm w-[100px] sm:justify-end">
                                        {detail?.createdDate?.split(" ")[0]}
                                    </p>
                                </div>
                                <div className="text-white font-[300]">
                                    {parse(`${detail?.question?.replace(/\n\r?/g, "<br />")}`)}
                                </div>
                                {detail?.answer ? (
                                    <div className="w-full border-b flex items-start mt-16 bg-[#333] font-[300] text-[#333] gap-5 py-8 px-14">
                                        <h2 className="text-white relative  font-[600] text-sm bg-[#ff00e4] w-8 h-8 flex items-center justify-center rounded-full before:absolute before:w-full before:h-full before:bg-transparent before:border-b before:border-l before:border-dotted before:border-[#ff00e4] before:right-3/4 before:bottom-1/2 z-30">
                                            Re
                                        </h2>
                                        <div className="flex-1 font-[300]">
                                            <p>{parse(detail?.answer?.replace(/\n\r?/g, "<br />"))}</p>
                                        </div>
                                        <p className="text-white font-[300]  text-sm">
                                            {detail?.modifiedDate}
                                        </p>
                                    </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className="w-full h-12 py-16 flex items-center justify-center">
                                        <button
                                            onClick={() => router.push("/faq?subtab=contact-us")}
                                            className="bg-[#333] text-white py-3 px-8 rounded-md font-[300]">
                                            {listI18}
                                        </button>
                                    </div>
                        </div>
                        <div className="flex flex-col sm:hidden">
                            <div>
                                <div className="flex justify-between p-[10px] border-b-[0.5px] border-t-[0.5px] border-[#ABABAB]">
									<div>
										<div className="text-[#A0A0A0] text-[12px] font-medium tracking-[-0.18px] ">{detail.category}</div>
										<div className="text-[#fff] text-[14px] font-medium tracking-[-0.18px] cursor-pointer flex gap-2" >{detail.title}</div>
									</div>
									<div className="text-end">
										<div className="text-[#999] text-[12px] font-medium tracking-[-0.18px]">{detail?.createdDate?.split(" ")[0]}</div>
										<div className={`${detail.status === "RESOLVED" ? "text-[#BEBEBE]" : "text-[#696969]"} text-[12px] font-medium tracking-[-0.18px]`}>{detail.status === "RESOLVED" ? answerCompleteI18 : waitingforAnswersI18}</div>
									</div>
								</div>
                            </div>
                            <div className="p-[20px] bg-[#000000]">
                                {parse(`${detail?.question?.replace(/\n\r?/g, "<br />")}`)}
                            </div>
                            <div className="flex flex-col p-[10px_20px_20px_20px] bg-[#141414] border-b-[1px] border-t-[0.5px] border-[#373737]">
                                <div className="text-[#FB3873] text-[12px] tracking-[150.8%]">
                                    Answer
                                </div>
                                <div>
                                    {detail?.answer && parse(detail?.answer?.replace(/\n\r?/g, "<br />"))}
                                </div>
                            </div>                
                        </div>
                        </div>
                    </>
                } 
            </>
  )
}

export default QnaDetail