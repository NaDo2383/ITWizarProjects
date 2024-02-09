import useArtworkTranslation from "locale/useArtworkTranslation";
import React from "react";
import Link from "next/link";
import descIcon from "public/descIcon.svg";
import Image from "next/image";
import useArtDetail from "Components/entities/artwork/detail/useArtDetail";

function ProjectIntroduction() {
	const { projectIntroductionI18, productIntroLinkI18 } = useArtworkTranslation();
	const { artDetail } = useArtDetail();

	return (
		<>
		<div className="sm:mt-8 mt-[15px] w-full h-full rounded-xl bg-[#252525] sm:p-[30px] p-[15px]">
			<h3 className="sm:text-[22px] text-[14px] font-medium text-white mb-[10px]">
				{projectIntroductionI18}
			</h3>
			<div className="w-full  ">
				<p className="font-[400] leading-[28px] sm:mb-[20px] mb-[10px] sm:text-[16px] text-[14px] sm:text-[#ddd] text-[#B3B3B3] whitespace-pre">
					<span className="flex flex-col">{artDetail?.projectDesc}</span>
				</p>
				<div>
					<Link passHref href={`/events?tabIndex=1&index=0&projectId=${artDetail?.projectId}`}>
						<a className="sm:gap-2 gap-[5px] flex flex-row items-center">
							<div className="flex items-center sm:w-[17px] sm:h-[17px] w-[11px] h-[11px]">
								<Image src={descIcon} alt="descIcon" width={17} height={17} />
							</div>
							<span className="font-[500] sm:text-[18px] text-[14px] text-[#FF2681] leading-[26.6px] items-center">
								{productIntroLinkI18}
							</span>
						</a>
					</Link>
				</div>
			</div>
		</div>
		</>
	);
}

export default ProjectIntroduction;
