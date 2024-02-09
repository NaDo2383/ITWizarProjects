import React, { useEffect, useRef, useState } from "react";
import AdMenuItem from "./AdMenuItem";
import Link from "next/link";
import VmButton from "Components/ui/button/VmButton";
import Image from "next/image";
import whiteLogo from "public/whiteLogo.svg";
import useElementPosition from "common/window/useElementPosition";
import SubMenu from "./Submenu";
import useOnClickOutside from "common/mouse/useOnClickOutside";
import useCommonTranslation from "locale/useCommonTranslation";
import Burger from "Components/ui/burger/Burger";
import { useRouter } from "next/router";

function AdMenu() {
	const {
		menuTexts: {
			menu_market,
			menu_event,
			menu_about,
			menu_guide,
			submenu_nftMarket,
			submenu_artist,
			submenu_competition,
			submenu_notice,
			submenu_qa,
			submenu_IntroductionI18
		}
	} = useCommonTranslation();
	const { pathname } = useRouter();
	const bigMenuItems = [
		{
			columnId: 1,
			mainText: menu_market,
			mainHref: "/art/market",
			list: [
				{
					text: submenu_nftMarket,
					href: "/art/market",
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
	const wrapperRef = useRef();
	const [isOpenSubmenu, setIsOpenSubmenu] = useState(false);
	const [activeMenuIdx, setActiveMenuIdx] = useState(0);

	useOnClickOutside(wrapperRef, () => setIsOpenSubmenu(false));
	useElementPosition(menuRef, { globalName: "adMenu" });

	useEffect(() => {
		const url = pathname.split("/")[1];
		if (url === "" || url === "mypage") {
			setActiveMenuIdx(-1);
		}
	}, [pathname]);
	
	return (
		<div ref={wrapperRef}>
			<nav className="relative bg-[#181A1A] bg-opacity-[80%] backdrop-blur-[15px]  min-h-[73px] flex items-end sm:justify-between flex-row py-[10px] md:py-[15px] px-[16px] md:px-[30px] md:items-center border-t border-t-[#36383A] border-b border-b-[#36383A] lg:py-0">
				<div className="relative flex items-end min-h-[24px] w-[93px] md:w-[155px] h-[24px] md:h-[40px]">
					<Link href={"/"} passHref>
						<a>
							<Image  src={whiteLogo} objectFit="cover" layout="fill" alt="tamtam-logo" />
						</a>
					</Link>
				</div>
				<ul
					className="hidden relative md:flex md:gap-[5px] xl:gap-[65px] min-w-[50px]"
					ref={menuRef}>
					{bigMenuItems?.map((menu, idx) => (
						<AdMenuItem
							key={"adMenu" + idx}
							{...menu}
							isOpenSubmenu={isOpenSubmenu}
							setIsOpenSubmenu={setIsOpenSubmenu}
							activeMenuIdx={activeMenuIdx}
							setActiveMenuIdx={setActiveMenuIdx}
						/>
					))}
				</ul>
				<Burger />
				<div className="hidden md:flex min-w-[200px]">
					<VmButton />
				</div>
			</nav>
			<div
				onMouseEnter={() => setIsOpenSubmenu(true)}
				onMouseLeave={() => setIsOpenSubmenu(false)}>
				<SubMenu
					isOpen={isOpenSubmenu}
					setIsOpenSubmenu={setIsOpenSubmenu}
					bigMenuItems={bigMenuItems}
					setActiveMenuIdx={setActiveMenuIdx}
				/>
			</div>
		</div>
	);
}

export default AdMenu;
