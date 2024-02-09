import { useEffect, useRef, useState } from "react";
import useCommonTranslation from "locale/useCommonTranslation";
import { useGlobalContext } from "common/global/useGlobalContext";
import { CgClose } from "react-icons/cg";
import MobileMenuItems from "./MobileMenuItems";
import usePopup from "Components/ui/popup/usePopup";
import Image from "next/image";
import metaIco from "public/meta.svg";
import useAuthUser, { useCheckUser } from "Components/entities/user/auth/useAuthUser";
import useAuthMetamask from "common/metamask/useAuthMetamask";
import { useRouter } from "next/router";
import useProfile from "Components/entities/user/profile/useProfile";
import useMyPageTranslation from "locale/useMypageTranslation";
import Link from "next/link";
import { isMobile,isIOS } from 'react-device-detect';
import useAlertTranslation from "locale/useAlertTranslation";

function MobileMenu(props) {
	const { isOpenMobileMenu, setOpenMobileMenu, setAuthUser } = useGlobalContext();
	const [valid, setValid] = useState(false);
	const { handleShowModal, MODAL_TYPES, hideAllModals } = usePopup();
	const { 
		linkYourWalletI18,
		menuTexts: {
			menu_market,
			menu_event,
			menu_about,
			menu_guide,
			submenu_nftMarket,
			submenu_artist,
			submenu_bendingMachine,
			submenu_competition,
			submenu_notice,
			submenu_qa,
			submenu_IntroductionI18
		},
		logoutI18,
		connectMetaMaskI18,
		helloProfileI18,
	} = useCommonTranslation();
	const { plsInstallMetaMaskI18 } = useAlertTranslation()
	const { confirmValI18 } = useMyPageTranslation();

	const bigMenuItems = [
		{
			columnId: 1,
			mainText: menu_market,
			mainHref: "/art/market",
			list: [
				{
					text: submenu_nftMarket,
					href: "/art/market?page=0&sortID=0",
					onClick: (val) => setIsOpenSubmenu(val)
				}				
			]
		},
		{
			columnId: 2,
			mainText: menu_event,
			mainHref: "/events",
			list: [
				{
					text: "VM",
					href: "/events",
					onClick: (val) => setIsOpenSubmenu(val)
				},
				{
					text: submenu_competition,
					href: "/art/competitions",
					onClick: (val) => setIsOpenSubmenu(val)
				}
			]
		},
		{
			columnId: 3,
			mainText: menu_about,
			mainHref: "/about",
			list: [
				{
					text: submenu_IntroductionI18,
					href: "/about",
					onClick: (val) => setIsOpenSubmenu(val)
				},
				{
					text: submenu_artist,
					href: "/artist",
					onClick: (val) => setIsOpenSubmenu(val)
				}
			]
		},
		{
			columnId: 4,
			mainText: menu_guide,
			mainHref: "/guide",
			list: [
				{
					text: submenu_notice,
					href: "/notice",
					onClick: (val) => setIsOpenSubmenu(val)
				},
				{
					text: submenu_qa,
					href: "/faq",
					onClick: (val) => setIsOpenSubmenu(val)
				}
			]
		}
	];

	const menuRef = useRef();
	const [isOpenSubmenu, setIsOpenSubmenu] = useState(false);
	const [activeMenuIdx, setActiveMenuIdx] = useState(0);
	const {isLoggedIn} = useCheckUser();
	const isAuthenticated = isLoggedIn();
	const router = useRouter();
	const { profileUser, getUserProfile } = useProfile();
	const { onAuthMetamask } = useAuthMetamask();
	const { locale, asPath } = useRouter();
	const { logOut } = useAuthUser()
	

	useEffect(() => {
		if (typeof window !== "undefined" && localStorage.user) {
			setValid(true);
		}
		getUserProfile();
	}, []);

	function handleButtons(action){
		if (action === "logOut") {
			logOut()
			setOpenMobileMenu(false)
		} else if (action === "goToMyPage") {
			router.push("/mypage")
			setOpenMobileMenu(false)
		}
	}

	// async function handleLogin() {
	// 	await onAuthMetamask()
	// 		.then((res) => {
	// 			if (res.status === 404) {
	// 				handleShowModal(MODAL_TYPES.SERVICE_CONDITION_POPUP);
	// 			} else {
	// 				setAuthUser(res?.result);
	// 				hideAllModals();
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			alert(err.message);
	// 		});
	// }


	async function handleConnectMetamask() {
		if (!window.ethereum) {
			if (isMobile) {
				// router.push(process.env.DAPP_LINK);
				window.location.href = process.env.DAPP_LINK
				return;
			} else {
				const installMetamask = window.confirm(plsInstallMetaMaskI18);
				if(installMetamask){
					window.open(
						"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
					);
				}
			}
			return;
		} 
		await onAuthMetamask()
			.then((res) => {
				if (res.status === 404) {
					handleShowModal(MODAL_TYPES.SERVICE_CONDITION_POPUP);
				} else {
					setAuthUser(res?.result);
					hideAllModals();
				}
			})
			.catch((err) => {
				// alert(err.message);
				alert(err);
				console.log(err);
			});
		setOpenMobileMenu(false)
	}

	return (
		<div
			className={`h-screen ${
				isOpenMobileMenu ? "translate-x-0" : "translate-x-full" 
			} bg-[#161717] p-[120px_16px_0px_21px] md:hidden w-screen h-screen fixed bottom-0  overflow-y-scroll navScrolling transition duration-1000 ease-in-out mobileNav z-[999999999]`}>
			<div className="flex justify-between text-[#fff]">
				{!isAuthenticated ? (
					<div className="text-[20px] font-mont font-semibold leading-[134.9%]">{linkYourWalletI18}</div>
				):(
					<div className="text-[20px] font-mont font-semibold leading-[134.9%]">{profileUser?.nickName}{helloProfileI18}</div>	
				)}
				<button onClick={() => setOpenMobileMenu(false)}>
					<CgClose className="w-[24px] h-[24px] text-[#fff]"/>
				</button>
			</div>
			<div className="w-full flex mt-[55px] bg-[#161717] border-b border-[#646464] pb-[45px]">
				<ul
					onMouseEnter={() => setIsOpenSubmenu(true)}
					onMouseLeave={() => setIsOpenSubmenu(false)}
					className="relative flex flex-col gap-[40px] font-semibold leading-[134.9%] text-[20px] font-mont from-[#EDEDED] to-[#B6B6B6]"
					ref={menuRef}>
					{bigMenuItems?.map((menu, idx) => (
						<MobileMenuItems
							key={"adMenu" + idx}
							{...menu}
							isOpenSubmenu={isOpenSubmenu}
							setIsOpenSubmenu={setIsOpenSubmenu}
							activeMenuIdx={activeMenuIdx}
							setActiveMenuIdx={setActiveMenuIdx}
						/>
					))}
				</ul>
			</div>
			{
			!isAuthenticated ? (				
					<div
					onClick={handleConnectMetamask}
					style={{ backgroundColor: "#6319FF" }}
					className={`w-full text-white cursor-pointer rounded-[10px] flex items-center gap-[15px] p-[15px_0px_14px_20px] h-min mt-[30px]`}>
						<Image  src={metaIco} alt="metaIco" width={30} height={30} />
						<span className=" font-medium text-[16px] text-[#fff]">{connectMetaMaskI18}</span>
					</div>	
			):(
				<div>
					<div className="rounded-[8px] bg-[#404040] text-[#ccc] font-[16px] font-medium flex justify-center cursor-pointer p-[18px_0px_18px_0px] mt-[30px]" onClick={() => handleButtons("goToMyPage")}>
						{ confirmValI18 }
					</div>
					<div className="rounded-[8px] bg-[#000] text-[#ccc] font-[16px] font-medium flex justify-center cursor-pointer p-[18px_0px_18px_0px] mt-[10px]" onClick={() => handleButtons("logOut")}>
						{ logoutI18 }
					</div>			
				</div>
			)
			}
			<div className="flex justify-start my-[25px]">
				<Link href={asPath} locale={locale === "ko" ? "en" : "ko"}>
					<a className="flex gap-1 justify-center items-center">
						<div className="w-[13px] h-[13px] flex">
							<Image  src={"/globe.svg"} width={13} height={13} alt="globe" />
						</div>
						<h4 className={`text-[15px] font-[500] tracking-[-0.225px] ml-2 ${locale === "ko" ? "text-[#fff]" : "text-[#969696]"}`}>
							KOR
						</h4>
						<div className="flex bg-[#9898A8] h-[20px] w-[1px]"></div>
						<h4 className={`text-[15px] font-[500] tracking-[-0.225px] ${locale === "ko" ? "text-[#969696]" : "text-[#fff]" }`}>
							ENG
						</h4>
					</a>
				</Link>	
			</div>	
		</div>
	);
}

export default MobileMenu;
