import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useCommonTranslation from "locale/useCommonTranslation";
import whiteLogo from "public/whiteLogo.svg";

function AdFooter() {
	const [isHover, setIsHover] = useState(false);
	const [isInstHover, setIsInstHover2] = useState(false);
	const { push } = useRouter();
	const { footerTexts } = useCommonTranslation();

	return (
		<footer className="relative z-100 bg-black text-[#DDD] sm:pt-[60px] pt-[30px] sm:pb-[60px] px-[20px] md:px-[30px] md:pb-[60px] text-[15px] leading-[22px] tracking-tight pb-[110px]">
			<div className="flex justify-between lg:flex-row flex-col">
				<div className="flex flex-col md:flex-row md:items-center sm:gap-[18px] gap-[5px] lg:mb-0 sm:mb-4 mb-[13px] font-[500] text-[#DDD] sm:text-[15px] text-[11px] tracking-[-0.225px]">
					<div className="relative sm:w-[155px] sm:h-[40px] h-[24px] w-[93px]">
						<Image
							onClick={() => push("/")}
							src={whiteLogo}
							width={155}
							height={40}
							alt="tamtam-footer-logo"
						/>
					</div>
					<p className=" font-[500] text-[#DDD] sm:text-[15px] text-[11px] tracking-[-0.225px]">
						{footerTexts.copyright}
					</p>
				</div>
				<p className="sm:hidden text-[10px] font-[350] text-[#B0B0B0]">{footerTexts.subText}</p>
				<div className="hidden md:flex items-center">
					<Link href="https://docs.google.com/forms/d/e/1FAIpQLSe9PRVUDMqaTOrlwDf5L67qyh6-dWYF4dhOgSdnQ05HCbKiLg/viewform" passHref>
						<a target="_blank">
							<button className=" bg-black hover:bg-[#FB3873] text-center text-[#fff] border border-[#fff] hover:border-[#FB3873] rounded-full min-w-[200px] py-[4px] px-[4px]">
								{footerTexts.footerApplyAsCreatorI18}
							</button>
						</a>
					</Link>
				</div>
			</div>
			<div className="flex flex-col-reverse md:flex-row items-start md:justify-between md:items-center mt-[50px] sm:mt-[87px] sm:border-t sm:border-b-[#fff] sm:border-b sm:border-t-[#DDD]">
				<div>
					<ul className="flex flex-row gap-2 sm:gap-[64px] md:py-[16px] font-bold mb-[20px] md:mb-[0px]">
						<li>
							<Link href={"/serviceInfo/terms-of-use"} passHref>
								<a target="_blank" className="text-[#DDD] hover:text-[#FB3873] text-[11px] md:text-[15px]">{footerTexts.termsOfService}</a>
							</Link>
						</li>
						<div className="text-[#4E4E4E]  md:hidden">|</div>
						<li>
							<Link href={"/serviceInfo/privacy-policy"} passHref>
								<a target="_blank" className="text-[#DDD] hover:text-[#FB3873] text-[11px] md:text-[15px]">{footerTexts.privacyPolicy}</a>
							</Link>
						</li>
						<div className="text-[#4E4E4E]  md:hidden">|</div>
						<li>
							<Link href={"/notice"} passHref>
								<a target="_blank" className="text-[#DDD] hover:text-[#FB3873] text-[11px] md:text-[15px]">{footerTexts.Notice}</a>
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex items-center gap-2">
					<div
						onMouseEnter={() => setIsInstHover2(true)}
						onMouseLeave={() => setIsInstHover2(false)}
					>
						<Link href={"https://www.instagram.com/tamtam_artncity/"} passHref>
							{isInstHover ?
								<a target="_blank">
									<Image
										src={"/insta_pink.svg"}
										width={24}
										height={24}
										alt="instagram-tamtam"
									/>
								</a>
								:
								<a target="_blank">
									<Image
										src={"/insta.svg"}
										width={24}
										height={24}
										alt="instagram-tamtam"
									/>
								</a>
							}
						</Link>
					</div>
					<div
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
					>
						<Link href={"https://blog.naver.com/tamtam_art"} passHref>
							{isHover ?
								<a target="_blank">
									<Image
										src={"/naver-pink-logo.svg"}
										width={20}
										height={20}
										alt="naver-tamt am"
									/>
								</a>
								:
								<a target="_blank">
									<Image
										src={"/naver-logo.svg"}
										width={20}
										height={20}
										alt="naver-tamt am"
									/>
								</a>
							}
						</Link>
					</div>
				</div>
			</div>
			<div className="sm:mt-[17px] sm:border-none border-b border-b-[#646464] sm:mb-0 mb-[10px]">
				<p className="hidden md:block font-[350] text-[15px] text-[#FFF]  ">
					{footerTexts.footerLongTextI18}
				</p>
			</div>
			<div className="inline md:flex flex-col gap-3 md:flex-row md:justify-between text-[#999999] mt-[9px] tracking-[-0.15px] md:tracking-normal pt-[10px] sm:leading-0 leading-[-0.18px]">
				<ul className="inline md:flex flex-col gap-3 md:flex-row md:gap-6 text-[10px] md:text-[15px]">
					<li className="md:whitespace-pre inline md:block">{footerTexts.footerSmallText1I18}</li><div className="text[#999] text-[10px] inline md:hidden">|</div>
					<li className="md:whitespace-pre inline md:block">{footerTexts.footerSmallText2I18}</li><div className="text[#999] text-[10px] inline md:hidden">|</div>
					<li className="md:whitespace-pre inline md:block">
						{footerTexts.footerSmallText3I18}
					</li><div className="text[#999] inline md:hidden">|</div>
					<li className="md:whitespace-pre inline md:block">{footerTexts.footerSmallText4I18}</li><div className="text[#999] text-[10px] inline md:hidden">|</div>
					<li className="md:whitespace-pre inline md:block">{footerTexts.footerSmallText5I18}</li>
				</ul><div className="text[#999] text-[10px] inline md:hidden">|</div>
				<p className="md:block inline font-[500] text-[10px] md:text-[15px] tracking-[-0.225px] text-[#999]">Copyright EYES Protocol All rights reserved</p>
			</div>
		</footer>
	);
}

export default AdFooter;
