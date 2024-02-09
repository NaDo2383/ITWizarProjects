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
import MobielEditProfile from "./MobielEditProfile";

const editProfileSubPages = [
	<EditTable key={'45fgegse'} />,
	<NotificationSetting key={'fawf3435'} />,
	<ResignMembership key={'5ij4f89438y'} />
]

function EditProfile() {
	const { notification_settingI18, withdrawalI18, headTitleI18 } = useMyPageTranslation();
	const { editPersonalInfoI18 } = useCommonTranslation();
	const [activeSubpage, setActiveSubpage] = useState(0)
	const editProfileSubMenu = [
		{
			text: editPersonalInfoI18,
			href: '/mypage?subpage=editProfile'
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
			case '' : setActiveSubpage(); break;
			case 'notification-settings': setActiveSubpage(1); break;
			case 'resign-membership' : setActiveSubpage(2); break;
			default: setActiveSubpage(0)
		}
	}, [query])

	return (
		<EditProfileProvider>
			<div className="hidden sm:flex sm:flex-row overflow-hidden ">
				<div className='flex flex-col w-[144px] text-center'>
					<div className='pb-[18px] border-b border-[#474747]'>
						<h3 className='text-[22px] text-[#D4D4D4] font-[600] '>{headTitleI18}</h3>
					</div>
					<div className='flex w-full justify-center'>
						<ul className='pt-[28px] text-left'>
							{
								editProfileSubMenu.map((item, idx) => (
									<EditProfileSubLink
										key={'edit-profile-menu-' + idx}
										{...item}
										id={idx}
										activeSubpage={activeSubpage}
										setActiveSubpage={setActiveSubpage}
									/>
								))
							}
						</ul>
					</div>
				</div>
				<div className='flex flex-col pl-[96px] w-full'>
					{editProfileSubPages[activeSubpage]}
				</div>
			</div>
			<MobielEditProfile />
		</EditProfileProvider>
	);
}

export default EditProfile;
