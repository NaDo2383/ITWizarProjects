import React from "react";
import useFAQpageTranslation from "locale/useFAQpageTranslation";
import { useEffect } from "react";
import useNotice from "../useNotice";
import { useRouter } from "next/router";
import moment from "moment";
import useCommonTranslation from "locale/useCommonTranslation";
import IFrame from "Components/ui/Iframe";
import RoundButton from "Components/ui/button/RoundButton";
import Link from "next/link";

export default function NoticeDetail() {
	const { id } = useRouter().query;
	const { tab1Title, listI18 } = useFAQpageTranslation();
	const { getNoticeDetail, notice } = useNotice();
	const router = useRouter();
	const { noticeDownloadI18 } = useCommonTranslation()
	useEffect(() => {
		if (id) {
			getNoticeDetail(id);
		}
	}, [id]);

	const handleClick = () => {
		router.push("/notice");
	};

	return (
		<div className="sm:py-[80px] py-[25px] w-full lg:px-[250px] px-2 text-[#DDD]">
			<h2 className="text-[#DDD] text-[30px] sm:flex hidden items-center justify-center mb-[80px]">
				{tab1Title}
			</h2>
			<div className="w-full  h-auto flex flex-col justify-center items-center gap-[40px]">
				<div className="w-full flex flex-col sm:gap-2 gap-[5px] relative sm:max-w-[1410px] max-w-[328px]">
					<h2 className="sm:text-[#DDD] text-[#E0E6E8] sm:text-[32px] text-[15px] sm:font-normal font-medium sm:tracking-normal tracking-[-0.225px] text-center text-shadow-notice-detail">
						{notice?.title}
					</h2>
					<h2 className="text-[#6D6D6D] sm:text-[20px] text-[12px] text-center">
						{moment(notice?.createdDate).format("YYYY.MM.DD")}
					</h2>
					{notice?.attachmentUrl ? (
						<button className=" absolute right-0 bottom-0 sm:translate-y-[50%] translate-y-[100%] tracking-[0px] sm:text-[18px] text-[12px] sm:min-w-[219px] min-w-[111px] sm:pt-[6px] pt-[4px] sm:pb-[7px] pb-[5px] sm:px-[20px] px-[10px] rounded-[30px] border-[1.5px] border-[#434343] hover:border-[#FB3873] flex items-center whitespace-nowrap sm:text-[#DDDDDD] text-[#FFFFFF] justify-center">

							<Link href={notice?.attachmentUrl} passHref>
								{noticeDownloadI18}
							</Link>

						</button>
					) : ("")}
				</div>
				<div className="bg-[#1F1F1F] lg:p-[50px] p-[16px_20px_20px_20px] 2xl:w-[1410px] sm:w-[100vw] w-[328px] flex justify-center text-[#C6C6C6]">
					<IFrame src={notice?.description} />
				</div>
				<div className="sm:hidden mt-[10px] flex justify-center">
					<div className=" p-[5px_20px_5px_20px] text-[14px] text-[#fff] bg-[#404040] rounded-[5px] cursor-pointer" onClick={() => handleClick()}>
						{listI18}
					</div>
				</div>
			</div>

		</div>
	);
}
