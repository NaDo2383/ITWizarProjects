import React, { useRef } from "react";
import useElementPosition from "common/window/useElementPosition";
import { useRouter } from "next/router";

function AdMenuItem(props) {
	const {
		columnId,
		mainText,
		mainHref,
		list,
		setIsOpenSubmenu,
		activeMenuIdx,
		setActiveMenuIdx
	} = props;
	const ref = useRef(null);
	const { push } = useRouter();
	const isActive = activeMenuIdx === columnId - 1;
	useElementPosition(ref, { globalName: "adMenuItem" });

	function handleClick() {
		setActiveMenuIdx(columnId - 1);
		setIsOpenSubmenu((prev) => !prev);
		if (list.length === 0) {
			setIsOpenSubmenu(false)
			push(mainHref);
		}
	}
	
	return (
		<li
			ref={ref}
			onClick={() => handleClick()}
			className={`${isActive ? "border-b-[2px] border-b-[#FB3873] " : "HeaderTab"} px-[14px] pt-[20px] text-center`}>
			<button className=" font-[500] text-[18px] text-[#E0E6E8] min-w-[50px]">
				{mainText}
			</button>
		</li>
	);
}

export default AdMenuItem;
