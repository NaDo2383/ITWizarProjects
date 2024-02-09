/**
 * @createdBy duka
 */
import React, { useEffect, useState } from "react";
import useProfile from "../useProfile";
import Image from "next/image";
import setting from "public/setting.svg";
import edit from "public/edit.svg";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import useMyPageTranslation from "locale/useMypageTranslation";
import { useRouter } from "next/router";
import { pageType } from "../Profile";
import Link from "next/link";
import { useGlobalContext } from "common/global/useGlobalContext";
import xIcon from "public/xIcon.svg";
import xWhiteIcon from "public/xWhiteIcon.svg"

function ProfileDesc() {
	const [isHover, setIsHover] = useState(false)
	const { push } = useRouter();
	const { globalItems } = useGlobalContext()
	const { profileUser, getUserProfile } = useProfile();
	const {
		edit_personal_informationI18: editProfileI18,
		settingI18,
		addNewNftI18
	} = useMyPageTranslation();

	return (
		<div className="container flex flex-col relative sm:pb-[119px] pb-[40px]">
			<div className="flex lg:flex-row sm:flex-row xs:flex-col-reverse flex-col-reverse sm:justify-between xs:gap-2">
				<div className="hidden sm:flex justify-center gap-2 z-50">
					<button
						className="flex lg:justify-between border border-[#4A4A4A] hover:border-[#828282] py-1 bg-[#4A4A4A] hover:bg-[#828282] rounded-[4px] text-[#fff] px-[11.5px] items-center sm:gap-[9px] gap-[4px] lg:text-[16px] text-[12px]
						lg:max-h-[36px] sm:max-h-[36px] max-h-[25px] lg:min-w-[135px] sm:min-w-[135px] min-w-[85px]"
						onClick={() =>
							push(`/mypage?subpage=${pageType.SETTINGSPAGE}`)
						}>
						<div className="flex items-center justify-center lg:w-[24px] lg:h-[24px] sm:w-[24px] sm:h-[24px] w-[15px] h-[15px]">
							<Image src={edit} alt="edit" />
						</div>
						{editProfileI18}
					</button>
					<button
						className="flex lg:justify-between border border-[#4A4A4A] hover:border-[#828282] py-1 bg-[#4A4A4A] hover:bg-[#828282] rounded-[4px] text-[#fff] px-[11.5px] items-center sm:gap-[9px] gap-[4px] lg:text-[16px] text-[12px]
						lg:max-h-[36px] sm:max-h-[36px] max-h-[25px]"
						onClick={() =>
							push(`/mypage?subpage=${pageType.EDITPROFILEPAGE}`)
						}>
						<div className="flex items-center justify-center lg:w-[24px] lg:h-[24px] sm:w-[24px] sm:h-[24px] w-[15px] h-[15px]">
							<Image src={setting} alt="setting" />
						</div>
						{settingI18}
					</button>
				</div>
				<div className="flex-1 sm:absolute sm:w-full justify-center z-40">
					<div className='flex justify-center  mr-0'>
						<h5 className="text-center font-500 lg:text-[18px] sm:text-[18px] xs:text-[16px] text-[16px] text-[#DDD] sm:mt-[7px]">{globalItems?.profileNickname || profileUser?.nickName}</h5>
					</div>
				</div>

				<div className="flex xs:justify-end sm:min-w-[260px] lg:min-w-[260px] z-50">
					{
						profileUser?.role === "TAMTAM" ?
							<button
								disabled={profileUser?.role !== "TAMTAM"}
								onClick={() => push("/art/createArtwork")}
								className={`flex sm:py-2 py-[5px] ${profileUser?.role !== "TAMTAM" ? "bg-[#FB3873]/10" : "bg-[#FB3873] hover:bg-[#FF5C8D]"
									} rounded-[4px] text-[#fff] px-[5px] sm:px-[11.5px] sm:text-[16px] text-[12px] items-center sm:gap-[9px] gap-[2px] lg:max-h-[36px] sm:max-h-[36px] max-h-[25px]`}>
								<div className="lg:w-[24px] lg:h-[24px] sm:w-[24px] sm:h-[24px] w-[15px] h-[15px]">
									<Image
										src="/stars.svg"
										alt="goto-create-artwork-image"
										width={24}
										height={24}
									/>
								</div>
								{addNewNftI18}
							</button> : <div className="sm:hidden min-h-[25px]"></div>
					}
				</div>
			</div>

			<div className="sm:mt-0 mt-[5px]">
				<p className="flex justify-center sm:mt-[10px] font-[400] text-[#7B7B7B] sm:text-[16px] text-[14px] text-center tracking-[-0.24px] sm:max-w-[732px] sm:m-auto">
					{profileUser?.description}
				</p>
				<div className="flex flex-row gap-2 justify-center items-center lg:mt-[20px] sm:mt-[20px] mt-[10px] sm:mb-[13px] mb-[10px] mr-0">
					{profileUser?.instagram && (
						<Link passHref href={profileUser?.instagramUrl}>
							<div className="border border-[#999999] hover:border-[#fff]  rounded-full p-[3px] cursor-pointer">
								<span className="flex justify-center items-center">
									<AiFillInstagram className="text-[#999999] hover:text-[#fff] sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]" />
								</span>
							</div>
						</Link>
					)}
					{profileUser?.twitter == true && (
						<Link passHref href={profileUser?.twitterUrl}>
							<div onMouseEnter={() => setIsHover(true)}
								onMouseLeave={() => setIsHover(false)} className='border border-[#999999] hover:border-[#fff] rounded-full p-[3px] cursor-pointer'>
								<span className='flex justify-center items-center sm:w-[20px] sm:h-[20px] w-[14px] h-[14px]'>
									{isHover ?
										<Image src={xWhiteIcon} alt="xWhiteIcon"/>
										:
										<Image src={xIcon} alt="xIcon" />
									}
								</span>
							</div>
						</Link>
					)}
					{profileUser?.facebook == true && (
						<Link passHref href={profileUser?.facebookUrl}>
							<div className="border border-[#999999] hover:border-[#fff]  rounded-full p-[3px] cursor-pointer">
								<span className="flex justify-center items-center">
									<FaFacebook className="text-[#999999] hover:text-[#fff] sm:w-[20px] sm:h-[20px] w-[14px] h-[14px]" />
								</span>
							</div>
						</Link>
					)}
				</div>
			</div>
			<div className="flex justify-center gap-2 z-50 sm:hidden">
				<button
					className="flex lg:justify-between border border-[#4A4A4A] py-1 bg-[#4A4A4A] rounded-[4px] text-[#fff] sm:px-[11.5px] px-[5px] items-center sm:gap-[9px] gap-[4px] lg:text-[16px] text-[12px]
						lg:max-h-[36px] sm:max-h-[36px] max-h-[25px] lg:min-w-[135px] sm:min-w-[135px] min-w-[85px]"
					onClick={() =>
						push(`/mypage?subpage=${pageType.SETTINGSPAGE}`)
					}>
					<div className="flex items-center justify-center lg:w-[24px] lg:h-[24px] sm:w-[24px] sm:h-[24px] w-[15px] h-[15px]">
						<Image src={edit} alt="edit" />
					</div>
					{editProfileI18}
				</button>
				<button
					className="flex lg:justify-between border border-[#4A4A4A] py-1 bg-[#4A4A4A] rounded-[4px] text-[#fff] sm:px-[11.5px] px-[5px] items-center sm:gap-[9px] gap-[4px] lg:text-[16px] text-[12px]
						lg:max-h-[36px] sm:max-h-[36px] max-h-[25px]"
					onClick={() =>
						push(`/mypage?subpage=${pageType.EDITPROFILEPAGE}`)
					}>
					<div className="flex items-center justify-center lg:w-[24px] lg:h-[24px] sm:w-[24px] sm:h-[24px] w-[15px] h-[15px]">
						<Image src={setting} alt="setting" />
					</div>
					{settingI18}
				</button>
			</div>
		</div >
	);
}

export default ProfileDesc;
