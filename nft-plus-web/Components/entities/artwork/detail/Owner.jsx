import Image from "next/image";
import Link from "next/link";
import def from "public/def_pro.png";
import { getLocal } from "utils/storage";
import React, { useEffect } from "react";

export default function Owning(props) {
	const { src, id, userName, userStatus } = props;
	const user = getLocal("user")?.result;

	return (
		<div className="flex items-center lg:gap-3 sm:gap-3 gap-[9px] w-full lg:w-auto">
			<div
				className={`userBtn sm:w-[48px] sm:h-[48px] w-[41px] h-[41px] ${src ? "relative" : "flex items-end justify-center"
					}`}>
				<Image
					width={48}
					height={48}
					priority
					src={src ? src : def}
					unoptimized
					alt="src"
					objectFit={src && "cover"}
					layout={src && "fill"}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-[#DDD] font-[400] lg:text-[14px] text-[12px] tracking-[0px] ">
					{userStatus}
				</p>
				{userName === "Unknown" ?
					<a className="font-bold lg:text-[16px] text-[13px] text-[#DDD] tracking-[-1px]  truncate sm:max-w-[150px] max-w-[80px] ">
						{userName}
					</a>
					:
					<Link href={`/artist/${id}`}>
						<a className="font-bold lg:text-[16px] text-[13px] text-[#DDD] tracking-[-1px]  truncate sm:max-w-[150px] max-w-[80px] ">
							{userName}
						</a>
					</Link>
				}
			</div>
		</div>
	);
}
