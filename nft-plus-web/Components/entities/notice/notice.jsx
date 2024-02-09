import React, { useState } from "react";
import eyeIcon from "public/eyeIcon.svg";
import Image from "next/image";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import NoticeCard from "../uguide/notices/NoticeCard";
import useNotice from "./useNotice";
import { useEffect } from "react";
import Pagination from "Components/ui/pagination/Pagination";
import NoticeFirstBigCard from "./NoticeFirstBigCard";
import useCommonTranslation from "locale/useCommonTranslation";
import useArtworkTranslation from "locale/useArtworkTranslation";
import { useRouter } from "next/router";

export default function Notice() {
	const [isHover, setIsHover] = useState(false)
	const { tab1Title } = useFAQpageTranslation();
	const { totalI18 } = useCommonTranslation();
	const { category } = useArtworkTranslation();
	const { getNotice, notices, noticeCategory, setPageNum, pageNum, load, getNoticeCategory } =
		useNotice();
	const paginate = (num) => {
		setPageNum(num);
	};
	const [currentCategory, setCurrentCategory] = useState(null);
	const { locale } = useRouter();

	function searchNotice() {
		getNotice(currentCategory);
	}

	useEffect(() => {
		getNoticeCategory()
		getNotice();
	}, [locale]);

	useEffect(() => {
		searchNotice()
	}, [pageNum]);

	useEffect(() => {
		if (pageNum === 0) {
			searchNotice()
		} else {
			setPageNum(0)
		}
	}, [currentCategory]);

	return (
		<div className="flex justify-center items-center flex-col w-full  text-[#DDD]">
			<h2 className="text-[#E0E6E8] sm:text-[30px] text-[20px] font-medium flex items-center justify-center sm:mt-[50px] sm:mb-[60px] mt-[25px] mb-[50px] sm:tracking-[-0.45px] tracking-[-0.3px]">
				{tab1Title}
			</h2>
			<div className="max-w-[1410px] 2xl:w-[1410px] flex gap-[30px] flex-wrap mx-[6px]">
				<div className="w-full flex xl:flex-row flex-col gap-[35px] justify-center items-center sm:mx-0 mx-[16px]">
					{!load ? (notices?.content?.length > 0 && (
						<NoticeFirstBigCard firstNotice={notices?.content?.[0]} />
					)) : (
						<div className="w-full cursor-pointer sm:flex hidden lg:w-[930px] min-h-[300px] rounded-[20px]">
							<div className="w-full cursor-pointer flex lg:w-[930px] min-h-[300px]">
								<div className="w-full bg-[#393939] h-[300px] rounded-l-[20px]"></div>
								<div className="w-full bg-black h-[300px] rounded-r-[20px] p-[30px]">
									<div className="w-full flex flex-col justify-between text-left h-full">
										<h3 className="text-[20px] font-medium"></h3>
										<p className="mt-[50px] mb-[20px] text-[15px] font-[400]"></p>
										<div className="flex justify-between items-center text-[#6D6D6D] ">
											<p className="text-[18px] text-[#6D6D6D]">YYYY.MM.DD</p>
											<div className="flex flex-row gap-1 items-center text-[#6D6D6D] ">
												<Image src={eyeIcon} alt="eyeIcon" />
												<span className="text-[18px] text-[#6D6D6D]"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					<div
						className={`min-w-[328px] w-full bg-[#252525] sm:rounded-[20px] rounded-[8px] sm:p-[30px] p-[5px] sm:min-h-[300px]`}>
						<h3 className="text-[20px] mb-[20px] sm:block hidden">{category}</h3>
						<div className="flex flex-col">
							<div
								onClick={() => {
									setCurrentCategory(null);
								}}
								onMouseEnter={() => setIsHover(true)}
								onMouseLeave={() => setIsHover(false)}
								className="flex justify-between border-b-[1px] border-[#353535] sm:py-[10.38px] p-[9px_10px_9px_10px] cursor-pointer">
								{isHover ? (
									<>
										<p className={`sm:text-[18px] text-[13px] font-medium ${currentCategory === null ? "text-[#FB3873]" : "text-[#FB3873]"}`}>{totalI18}</p>
										<p className="sm:text-[18px] text-[13px] font-medium text-[#DDD]">
											{noticeCategory?.totalCount}
										</p>
									</>
								) : (
									<>
										<p className={`sm:text-[18px] text-[13px] font-medium ${currentCategory === null ? "text-[#fff]" : "text-[#DDD]"}`}>{totalI18}</p>
										<p className="sm:text-[18px] text-[13px] font-medium text-[#6D6D6D]">
											{noticeCategory?.totalCount}
										</p>
									</>
								)}
							</div>
							{noticeCategory &&
								noticeCategory?.result?.map((category, index) => {
									return (
										<div
										id={`notice-row-${index+1}`}
											key={"category" + index}
											onClick={() => {
												setCurrentCategory(category.id)
											}}
											className={`flex justify-between ${index === noticeCategory?.result?.length - 1 ? "" : "border-b-[1px]"} sm:border-b-[1px] border-[#373737] sm:py-[10.38px] p-[9px_10px_9px_10px]  cursor-pointer`}>
											<p id={`notice-row-title-${index+1}`} className={`sm:text-[18px] text-[13px] font-medium text-[#DDD]`}>{locale === 'en' ? category.nameEn : category.name}</p>
											<p id={`notice-row-count-${index+1}`} className="sm:text-[18px] text-[13px] font-medium text-[#6D6D6D]">
												{category.count}
											</p>
										</div>
									);
								})}
						</div>
					</div>
				</div>
				{
					!load ? (
						<>
							{/*<div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 content-center sm:gap-x-[30px] gap-x-[12px] sm:gap-y-[40px] gap-y-[11px] px-2 sm:px-0">
								{notices?.content?.length > 0 &&
									notices?.content
										?.slice(1, notices?.content?.length)
										.map((not, index) => <NoticeCard key={index} data={not} />)}
								</div>*/}
							<div className="w-full flex xl:flex-row flex-wrap content-center gap-x-[12px] gap-y-[11px] min-w-[328px] sm:mx-0 mx-[16px]">
								<div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-[30px] sm:gap-y-[40px] gap-x-[12px] gap-y-[11px]">
									{notices?.content?.length > 0 &&
										notices?.content?.map((not, index) => <NoticeCard key={index} data={not} />)}
								</div>
							</div>
						</>
					) : (
						<div className="w-full flex xl:flex-row flex-col flex-wrap content-center justify-between gap-x-[30px] gap-y-[40px]">
							<div
								className={`2xl:w-[450px] h-[450px] bg-[#000000] text-white rounded-[20px] overflow-hidden rounded-t-[20px] recent-work  animate-pulse`}>
								<div className="w-full h-[300px] relative bg-[#393939]"></div>
								<div className={`p-[20px] flex-1 rounded-b-[20px] bg-black`}>
									<div className="w-full flex flex-col justify-between text-left h-full">
										<h3 className="text-[20px] font-medium">Title</h3>
										<div className="flex justify-between items-center mt-[26px] text-[#6D6D6D] text-[18px]">
											<p className="text-[18px] text-[#6D6D6D]">YYYY.MM.DD</p>
											<div className="flex flex-row items-center gap-1">
												<Image src={eyeIcon} alt="eyeIcon" />
												<span className="text-[18px] text-[#6D6D6D]">∞</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								className={`2xl:w-[450px] h-[450px] bg-[#000000] text-white rounded-[20px] overflow-hidden rounded-t-[20px] recent-work  animate-pulse`}>
								<div className="w-full h-[300px] relative bg-[#393939]"></div>
								<div className={`p-[20px] flex-1 rounded-b-[20px] bg-black`}>
									<div className="w-full flex flex-col justify-between text-left h-full">
										<h3 className="text-[20px] font-medium">Title</h3>
										<div className="flex justify-between items-center mt-[26px] text-[#6D6D6D] text-[18px]">
											<p className="text-[18px] text-[#6D6D6D]">YYYY.MM.DD</p>
											<div className="flex flex-row items-center gap-1">
												<Image src={eyeIcon} alt="eyeIcon" />
												<span className="text-[18px] text-[#6D6D6D]">∞</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								className={`2xl:w-[450px] h-[450px] bg-[#000000] text-white rounded-[20px] overflow-hidden rounded-t-[20px] recent-work  animate-pulse`}>
								<div className="w-full h-[300px] relative bg-[#393939]"></div>
								<div className={`p-[20px] flex-1 rounded-b-[20px] bg-black`}>
									<div className="w-full flex flex-col justify-between text-left h-full">
										<h3 className="text-[20px] font-medium">Title</h3>
										<div className="flex justify-between items-center mt-[26px] text-[#6D6D6D] text-[18px]">
											<p className="text-[18px] text-[#6D6D6D]">YYYY.MM.DD</p>
											<div className="flex flex-row items-center gap-1">
												<Image src={eyeIcon} alt="eyeIcon" />
												<span className="text-[18px] text-[#6D6D6D]">∞</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				<div className="w-full flex justify-center pt-16 pb-8">
					<Pagination
						data={notices?.content}
						current={notices?.number}
						changePage={paginate}
						toNextPage={paginate}
						toPrevPage={paginate}
						toFirstPage={paginate}
						toLastPage={paginate}
						totalPages={notices?.totalPages}
					/>
				</div>
			</div>
		</div >
	)
}
