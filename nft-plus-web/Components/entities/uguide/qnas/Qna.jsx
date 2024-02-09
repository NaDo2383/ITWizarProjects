import Loading from "Components/ui/loader";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useEffect, useState } from "react";
import Pagination from "Components/ui/pagination/Pagination";
import { useRouter } from "next/router";
import useFAQPageTranslation from "locale/useFAQpageTranslation";
import useQnas from "./useQna";
import QnaFilter from "./QnaFilter";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import usePopup from "Components/ui/popup/usePopup";
import lockIcon from "public/lock.svg";
import Image from "next/image";

export const  QNA = ({ currentUser }) => {
	const { locale } = useRouter();
	const [myQuestions, setMyQuestions] = useState(false);
	const router = useRouter()
	const [detail, setDetail] = useState(false);
	const { handleShowModal, MODAL_TYPES, setGlobalModalState } = usePopup();
	const {
		load,
		paginate,
		qnas,
		getQnas,
		getCategorys,
		setPageNum,
		filterState,
		cats,
		getPrivQnas
	} = useQnas();

	const {
		allI18,
		inquiryDetailsI18,
		contactUsTableH1I18,
		contactUsTableH2I18,
		contactUsTableH3I18,
		contactUsTableH4I18,
		contactUsTableH5I18,
		answerCompleteI18,
		waitingforAnswersI18,
		tableNoData,
		loginErrorI18
	} = useFAQPageTranslation();

	const allQ = () => {
		setMyQuestions(false);
		setPageNum(0);
	};

	const { authUser } = useAuthUser();
	const myQuestionHandler = () => {
		if (authUser?.id) {
			setMyQuestions(true);
		} else {
			handleShowModal(MODAL_TYPES.ALERT, { message: loginErrorI18 });
		}
	};

	useEffect(() => {
		getCategorys({ params: { lang: locale === "en"? locale : "kr" } });
		getQnas({
			...filterState,
			userId: myQuestions ? authUser?.id : "",
			lang: locale === "en"? locale : "kr"
		});
	}, [filterState, myQuestions, locale, authUser?.id]);

	function handleQNA(row) { 
		if(row.type === "PRIVATE") {
			handleShowModal(MODAL_TYPES.QNA_CHECK_PASSWORD)
			setGlobalModalState(prev => ({
				...prev,
				getPrivQNAList: async (val) => getPrivQnas(val),
				currentQna: row,
				load
			}))
			return
		} 
		router.push('/qna/' +row.id )
	}
	return (
		<div className="sm:container w-[328px] relative mx-auto text-base h-full flex lg:pb-[100px] pb-0 lg:px-0 px-2">
			<div
				className={`transition duration-300 h-full flex-col transform origin-left ${detail ? "hidden w-0" : "flex w-full"
					}`}>
				<div className="flex text-[14px]  md:text-[16px] lg:text-[18px] pt-[15px]  mb-[19px] text-[#fff] items-center font-[400] gap-[10px]">
					<p
						className={`border-[1.5px] ${myQuestions === false 
								? "border-[#FB3873]"
								: "border-[#434343] tabBorder"
							} cursor-pointer truncate w-max rounded-[30px] lg:px-[20px] md:px-[16px] sm:text-[18px] text-[14px] p-[4px_10px_5px_10px] `}
						onClick={allQ}>
						{allI18}
					</p>
					<p
						className={`border-[1.5px] ${myQuestions
								? "border-[#FB3873]"
								: "border-[#434343] tabBorder"
							} cursor-pointer w-max truncate rounded-[30px] lg:px-[20px] md:px-[16px] sm:text-[18px] text-[14px] p-[4px_10px_5px_10px]`}
						onClick={myQuestionHandler}>
						{inquiryDetailsI18}
					</p>
				</div>
				<div className="w-full flex justify-between mb-[30px] items-center gap-1 sm:gap-4">
					<QnaFilter options={cats.result} />
				</div>
				{load ? (
					<div className="w-full h-[500px]">
						<Loading />
					</div>
				) : (
					<>
						<table className={"w-full sm:table hidden"}>
							<thead className="w-full border-y pt-[8px] pb-[35px] border-[#ABABAB] font-[400] lg:text-[18px] md:text-[16px] text-[12px] text-[#6D6D6D] bg-[#181A1A]">
								<tr>
									<th className="pt-[8px] pb-[35px] font-normal w-10 sm:w-16 xl:w-24">
										{contactUsTableH1I18}
									</th>
									<th className="pt-[8px] pb-[35px] font-normal w-20 sm:w-30 xl:w-40">
										{contactUsTableH2I18}
									</th>
									<th className="pt-[8px] pb-[35px] font-normal">{contactUsTableH3I18}</th>
									<th className="pt-[8px] pb-[35px] font-normal w-20 md:w-36">
										{contactUsTableH4I18}
									</th>
									<th className="pt-[8px] pb-[35px] font-normal w-20 md:w-36">
										{contactUsTableH5I18}
									</th>
								</tr>
							</thead>
							<tbody className="w-full">
								{qnas?.content?.length > 0 ? (
									qnas.content.map((row, index) => (
										<tr key={`work-${index}`} className="border-b border-[#373737]">
											<td className="text-center text-[#DDD] font-[400] py-3 border-none lg:text-[18px] md:text-[16px] text-[12px]">
												{qnas.totalElements - qnas.number * 10 - index}
											</td>
											<td className="font-[400] text-center text-[#DDD] lg:text-[16px] md:text-[16px] text-[12px] py-3 border-none">
												{row.category}
											</td>
											<td className={`font-[400] py-3 border-none text-[#DDD] lg:text-[18px] md:text-[16px] text-[12px]`}>
												<div onClick={() => handleQNA(row)} passHref>
													<div className="flex items-center gap-2 md:gap-4 pl-4 md:pl-10  cursor-pointer">
														<p>{row.title}</p>
													{ row.type === 'PRIVATE' && <Image src={lockIcon} alt="lock"/> }
													</div>
												</div>
											</td>
											<td className="text-center font-[400] py-3 border-none text-[#DDDDDD] lg:text-[18px] md:text-[16px] text-[12px]">
												{row.createdDate.split(" ")[0]}
											</td>
											<td className="text-center font-[400] py-3 border-none lg:text-[16px] md:text-[14px] text-[12px]">
												{row.status === "RESOLVED" ? (
													<button className="text-[#555555] cursor-auto border border-[#252525] px-[15px] py-1 rounded-[8px]">
														{answerCompleteI18}
													</button>
												) : (
													<button className="text-[#fff] font-[400] cursor-auto border border-[#9D9D9D] px-[15px] py-1 rounded-[8px]">
														{waitingforAnswersI18}
													</button>
												)}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={5} className="border-none">
											<div className="w-full h-72">
												<div className="w-full h-full flex-col flex justify-center items-center pt-6">
													<MdOutlineImageNotSupported className="text-8xl text-[#666]" />
													<p className="font-[500] ">{tableNoData}</p>
												</div>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
						<div className="sm:hidden border-t-[0.5px] border-[#373737]">
							{qnas?.content?.length > 0 ? (
								qnas.content.map((qna, index) => {
									return (
										<div key={"qnaMobileRow"+index} className="flex justify-between p-[10px] border-b-[0.5px]  border-[#373737]">
											<div>
												<div className="text-[#A0A0A0] text-[12px] font-medium tracking-[-0.18px] ">{qna.category}</div>
												<div className="text-[#fff] text-[14px] font-medium tracking-[-0.18px] cursor-pointer flex gap-2" onClick={() => handleQNA(qna)} passHref>{qna.title}{ qna.type === 'PRIVATE' && <Image src={lockIcon} width={12} height={12} alt="lock"/> }</div>
											</div>
											<div className="text-end">
												<div className="text-[#A0A0A0] text-[12px] font-medium tracking-[-0.18px]">{qna.createdDate.split(" ")[0]}</div>
												<div className={`${qna.status === "RESOLVED" ? "text-[#BEBEBE]" : "text-[#696969]"} text-[12px] font-medium tracking-[-0.18px]`}>{qna.status === "RESOLVED" ? answerCompleteI18 : waitingforAnswersI18}</div>
											</div>
										</div>
									)}
								)
							):(
								<div className="w-full h-full flex-col flex justify-center items-center pt-6">
									<MdOutlineImageNotSupported className="text-8xl text-[#666]" />
									<p className="font-[500] ">{tableNoData}</p>
								</div>	
							)}
						</div>
					</>
				)}
				<div className="w-full h-8 flex justify-center items-center my-[100px]">
					{qnas?.content?.length > 0 && (
						<Pagination
							data={qnas.content}
							current={qnas.number}
							changePage={paginate}
							toNextPage={paginate}
							toPrevPage={paginate}
							toFirstPage={paginate}
							toLastPage={paginate}
							totalPages={qnas.totalPages}
						/>
					)}
				</div>
			</div>
			{/* <ErrorModal open={openAlertLay} setClose={setOpenAlertLay} /> */}
		</div>
	);
};
