/**
 * @createdBy duka 2023/4
 * @maintainedBy Phill Anderson 2023/6/26
 */
import React, { useEffect, useState } from "react";
import EditTable from "./EditTable";
import { EditProfileProvider } from "./useEditProfileContext";
import NotificationSetting from "../notificationSetting/NotificationSetting";
import ResignMembership from "../resignMembership/ResignMembership";
import EditProfileSubLink from "./editProfileSubpages/EditProfileSubLink";
import useCommonTranslation from "locale/useCommonTranslation";
import useMyPageTranslation from "locale/useMypageTranslation";
import { useRouter } from "next/router";
import { FiChevronRight } from 'react-icons/fi';
import { useGlobalContext } from "common/global/useGlobalContext";

const editProfileSubPages = [
	<EditTable key={'45fgegse'} />,
	<NotificationSetting key={'fawf3435'} />,
	<ResignMembership key={'5ij4f89438y'} />
]

function MobielEditProfile() {
	const { notification_settingI18, withdrawalI18, headTitleI18 } = useMyPageTranslation();
	const { editPersonalInfoI18 } = useCommonTranslation();
	const [activeSubpage, setActiveSubpage] = useState(0);
	const { isOpenMobileEditProfile, setOpenMobileEditProfile} = useGlobalContext();
	const editProfileSubMenu = [
		{
			text: editPersonalInfoI18,
			href: '/mypage?subpage=editProfile&extrasubpage=edit-Table'
		},
		{
			text: notification_settingI18,
			href: '/mypage?subpage=editProfile&extrasubpage=notification-settings'
		},
		{
			text: withdrawalI18,
			href: '/mypage?subpage=editProfile&extrasubpage=resign-membership'
		},
	]
	const { query } = useRouter()
	useEffect(() => {
		// өөр хуудаснаас edit profile хуудасны extraSubpage - рүү үсрэх тохиргоог зөвхөн энд бичиж өгнө үү ;
		// console.log("query", query)
		switch (query.extrasubpage) {
			case 'edit-Table' : setActiveSubpage(0); break;
			case 'notification-settings': setActiveSubpage(1); break;
			case 'resign-membership' : setActiveSubpage(2); break;
			default: setActiveSubpage(0)
		}
		
	}, [query])



	return (
		<EditProfileProvider>
			<div className={`sm:hidden flex relative `}>
				<div className={`flex flex-col w-full text-center h-screen ${isOpenMobileEditProfile ? "translate-x-0" : "-translate-x-full"} absolute top-0 transition duration-1000 ease-in-out z-[99999999] bg-[#161717]`}>
					<div className='pb-[18px]'>
						<h3 className='text-[20px] text-[#D4D4D4] text-center font-[500] '>{headTitleI18}</h3>
					</div>
					<div className='flex w-full px-[16px]'>
						<ul className='pt-[28px] w-full'>
							{
								editProfileSubMenu.map((item, idx) => (
                                    <div className="flex justify-between border-y border-[#373737] py-[20px] px-[10px]" key={"editProfileSubMenu"+idx}>
									<EditProfileSubLink
										key={'edit-profile-menu-' + idx}
										{...item}
										id={idx}
										activeSubpage={activeSubpage}
										setActiveSubpage={setActiveSubpage}
									/>
                                    <FiChevronRight />
                                </div>
								))
							}
						</ul>
					</div>
				</div>
				<div className='flex flex-col max-w-[328px] mx-auto w-full'>
					{editProfileSubPages[activeSubpage]}
            	</div>
			</div>
		</EditProfileProvider>
	);
}

export default MobielEditProfile;
