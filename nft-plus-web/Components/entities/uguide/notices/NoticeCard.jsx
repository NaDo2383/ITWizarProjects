import { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import { subStr } from "utils/string";

const NoticeCard = ({ data }) => {
	const router = useRouter();
	const [isHover, setIsHover] = useState(false)

	return (
		<div id={`noticeCardContainer`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			className={`lg:min-h-[450px] sm:min-h-[450px] min-h-[257px] bg-[#000000] text-white sm:rounded-[20px] rounded-[8px_8px_9.576px_9.576px] overflow-hidden `}
			onClick={() => router.push(window.location.href + "/" + data.id)}>
			<div className="w-full xl:h-[330px] lg:h-[330px] sm:h-[330px] h-[158px] relative bg-[#393939]">
				{data?.imageUrl ? (<Image src={data.imageUrl} alt="noticePic" objectFit="cover" layout='fill' />) : (<div className="w-full h-full bg-[#393939]"></div>)}
			</div>
			<div className={`sm:p-[20px] p-[10px] flex-1 rounded-b-[20px] bg-black sm:h-[150px] h-[92px] `}>
				<div className="w-full flex flex-col justify-between text-left h-full ">
					<h3 className="noticeCard sm:text-[20px] text-[10px] font-medium text-[#DDD]">
						{subStr(data?.title, 20)}
					</h3>
					<div className="flex justify-between items-center sm:mt-[26px] text-[#6D6D6D] text-[18px] border-t border-t-[#4E4E4E] sm:border-0">
						<p className="noticeCard sm:text-[18px] text-[10px] text-[#6D6D6D]">{moment(data?.createdDate).format("YYYY.MM.DD")}</p>
						<div className="flex flex-row items-center gap-1">
							{/* {isHover ? (
								<>
									<div className="sm:hidden duration-4 flex items-center">
										<Image src={eyeWhiteIcon} alt="" width={11.691} height={11.691} className="duration-400" />
										
									</div>
									<div className="hidden duration-4 sm:flex items-center">
										<Image src={eyeWhiteIcon} alt="" />
									</div>
								</>
							) : (
								<>
									<div className="sm:hidden flex items-center">
										<Image src={eyeIcon} alt="" width={11.691} height={11.691} />
									</div>
									<div className="hidden sm:flex items-center">
										<Image src={eyeIcon} alt="" />
									</div>
								</>
							)} */}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="true">
								<path id="eyeIcon" d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke="#6D6D6D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
							<span className="sm:text-[18px] text-[10px] text-[#6D6D6D]">{data?.viewCount}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoticeCard;
