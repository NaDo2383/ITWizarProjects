import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";

const NoticeFirstBigCard = ({ firstNotice }) => {
	const router = useRouter();
	const [isHover, setIsHover] = useState(false)

	return (
		<div
			id='NoticeMainCard'
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onClick={() => router.push(window.location.href + "/" + firstNotice?.id)}
			className="w-full cursor-pointer sm:flex hidden lg:min-w-[930px] min-h-[300px] rounded-[20px]">
			<div className="w-full bg-[#393939] h-[300px] rounded-l-[20px] relative overflow-hidden">
				{firstNotice?.imageUrl ? (
					<Image
						src={firstNotice?.imageUrl}
						alt="noticePic"
						objectFit="cover"
						layout="fill"
					/>
				) : (
					<div className="w-full h-full bg-[#393939]"></div>
				)}
			</div>
			<div className="w-full bg-black h-[300px] rounded-r-[20px] p-[30px]">
				<div className="w-full flex flex-col justify-between text-left h-full">
					<h3 className="text-[20px] font-medium">{firstNotice?.title}</h3>
					<div className="h-[70px] w-full text-ellipsis overflow-hidden mt-[68px] mb-[25px]">
						<div className="noticeDesc h-[70px] text-ellipsis overflow-hidden text-[15px] text-[#DDD] leading-[159.3%]" dangerouslySetInnerHTML={{ __html: firstNotice?.description }} />
					</div>
					<div className="flex justify-between items-center text-[#6D6D6D] ">
						<p className="text-[18px] text-[#6D6D6D]">
							{moment(firstNotice?.createDate).format("YYYY.MM.DD")}
						</p>
						<div className="flex flex-row gap-1 items-center text-[#6D6D6D] ">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="true">
								<path id="eyeIcon" d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke="#6D6D6D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
							<span className="text-[18px] text-[#6D6D6D]">
								{" "}
								{firstNotice?.viewCount}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoticeFirstBigCard;
