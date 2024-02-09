import useElementPosition from 'common/window/useElementPosition';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import { useGlobalContext } from 'common/global/useGlobalContext';
import Link from 'next/link';

export default function MobileMenuItems(props) {
    const {
		columnId,
		mainText,
		mainHref,
		list,
		isOpenSubmenu,
		setIsOpenSubmenu,
		activeMenuIdx,
		setActiveMenuIdx
	} = props;
    
	const ref = useRef(null);
	const { push } = useRouter();
	const isActive = activeMenuIdx === columnId - 1;
    const [dropdown, setDropdown] = useState(false);
    const { isOpenMobileMenu, setOpenMobileMenu } = useGlobalContext()

	useElementPosition(ref, { globalName: "adMenuItem" });

	function handleClick(event) {
        event.preventDefault();
		setActiveMenuIdx(columnId - 1);
        setDropdown(!dropdown);
		setIsOpenSubmenu((prev) => !prev);
		if (list.length === 0) {
			setIsOpenSubmenu((prev) => !prev);
			push(mainHref);
            setOpenMobileMenu(!isOpenMobileMenu)
		}
	}

	function handleOnClick() {
		setOpenMobileMenu(!isOpenMobileMenu)
	}

	return (
		<li
			ref={ref}
			className={``}>
			<button onClick={handleClick} className={` font-[500] text-[20px] -tracking-[0.015em] leading-[26px] text-[#E0E6E8]`}>
				{mainText}
			</button>
			<ul className=' flex flex-col gap-[8px] mt-[15px]'>
				{list && list?.map((list, index)=>{
					return(
						<li key={"list"+index} className='text-[#9898A8] text-[15px] font-mont'>
							<Link href={list.href} passHref>
								<a onClick={handleOnClick}>
									{list.text}
								</a>
							</Link>							
						</li>	
					)
				})}
			</ul>
		</li>
	);
}
