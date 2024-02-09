import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useCheckUser } from "Components/entities/user/auth/useAuthUser";
import useOnClickOutside from "common/mouse/useOnClickOutside";
import NotificationListUi from "Components/entities/notification/notificationList/NotificationListUi";
import { getLocal } from "utils/storage";
import useGlobal from "common/global/useGlobal";
import usePopup from "Components/ui/popup/usePopup";
import LanguageSwitcher from "Components/ui/_atoms/LanguageSwitcher";
import useCommonTranslation from "locale/useCommonTranslation";
import useAuthUser from "Components/entities/user/auth/useAuthUser"

function AdTopHeader() {
	const router = useRouter();
	const headerRef = useRef(null);
	const notificationRef = useRef(null);
	const { locale, push, pathname, query } = useRouter();
	const { MODAL_TYPES, handleShowModal } = usePopup();
	const { setAuthUser, authUser, profileUser, setProfileUser } = useGlobalContext();
	const { getNotificationCount, unreadNotiCount } = useGlobal();
	const { loginI18, logoutI18 } = useCommonTranslation();
	const { logOut } = useAuthUser()
	const [isHover, setIsHover] = useState(false)
	const [profileHover, setProfileHover] = useState(false)
	const [isOpenNotifications, setIsOpenNotifications] = useState(false);
	const { isLoggedIn } = useCheckUser()

	useOnClickOutside(headerRef, () => setIsOpenNotifications(false));

	function handClickBell() {
		setIsOpenNotifications((prev) => !prev);
	}

	function handleProfileBtn() {
		push("/mypage");
		return;
	}
	const isAuthenticated = isLoggedIn();
	// console.log('isAuthenticated', isAuthenticated)
	useEffect(() => {
		setIsOpenNotifications(false);
		if (authUser?.id) getNotificationCount();
		// console.log('ene ajilsan yumuu? ')
		// if( !isAuthenticated ) { 
		// 	logout()
		// }
	}, [pathname, locale]);

	useEffect(() => {
		const localStorageChanged = () => {
			const localUser = getLocal("user")?.result
			if (!localUser) {
				setAuthUser(null);
				return
			}
			setAuthUser(localUser);
		};

		if (typeof window !== "undefined") {
			window.addEventListener("storage", localStorageChanged);
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("storage", localStorageChanged);
			}
		};
	}, []);

	return (
		<div
			ref={headerRef}
			className="hidden md:flex gap-[14px]  justify-end relative lg:mx-[30px] mx-4 pt-[14px] pb-[6px]">
			<LanguageSwitcher />
			{!isAuthenticated ? (
				<>
					<button
						className=" text-[15px] text-[#969696] hover:text-[#fff] font-[700]"
						onClick={() => handleShowModal(MODAL_TYPES.LOGIN_POPUP)}>
						{loginI18}
					</button>
				</>
			) : (
				<>
					<button className="relative"
						onClick={handClickBell}
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}>
						{isHover ?
							<Image src={"/bell_white.svg"} width={20} height={20} alt="globe" />
							:
							<Image src={"/bell.svg"} width={20} height={20} alt="globe" />
						}
						{unreadNotiCount > 0 && (
							<div className="absolute top-0 right-[5px]">
								<div className=' bg-[#FB3873] rounded-full overflow-hidden w-[8px] h-[8px]' />
							</div>
						)}
					</button>
					<div className="relative"
						onMouseEnter={() => setProfileHover(true)}
						onMouseLeave={() => setProfileHover(false)}>
						<button className="peer" onClick={handleProfileBtn}>
							{profileHover ?
								<Image
									src={
										authUser?.profileImgUrl || "/default_user_profile_white.svg"
									}
									style={{
										verticalAlign: "middle",
										borderRadius: "50%",
										objectFit: "cover"
									}}
									className=" object-cover "
									width={24}
									height={24}
									alt="globe"
								/>
								:
								<Image
									src={
										authUser?.profileImgUrl || "/default_user_profile.svg"
									}
									style={{
										verticalAlign: "middle",
										borderRadius: "50%",
										objectFit: "cover"
									}}
									className=" object-cover "
									width={24}
									height={24}
									alt="globe"
								/>
							}
						</button>
						<div className="hidden w-full absolute peer-hover:flex hover:flex top-0 z-50 pt-8  ">
							<div className="relative">
								<div className="absolute bg-[##DCDCDCCC] text-opacity-[80%] font-light  w-[100px] gap-[12px] py-[15px] px-[15px] text-centers backdrop-blur-[4px] whitespace-nowrap rounded-[10px] -left-[75px] flex flex-col mr-[100px] items-center bg-[#080808D9] bg-opacity-[85%]  drop-shadow-lg">
									<div
										className="cursor-pointer  "
										onClick={() => router.push("/mypage")}>
										My page
									</div>
									<span className="h-[1px] w-[70px] rounded-[2px] bg-[#DDD]"></span>
									<div onClick={() => logOut()} className="cursor-pointer ">
										{logoutI18}
									</div>
								</div>
							</div>
						</div>
					</div>
					{isOpenNotifications && <NotificationListUi ref={notificationRef} />}
				</>
			)}
		</div>
	);
}

export default AdTopHeader;
