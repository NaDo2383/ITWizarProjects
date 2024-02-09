/**
 * @createdBy Phill Anderson 2022/12/16
 */
import React, { useRef } from "react";
import Backdrop from "./BackDrop";
import useOnClickOutside from "common/mouse/useOnClickOutside";
import usePopup from "./usePopup";
import { useGlobalContext } from "common/global/useGlobalContext";

function MainPopup({ children, width, maxWidth, datePicker, maxHeight, height }) {
	const backRef = useRef(null);
	const { globalLoading } = useGlobalContext();
	const { hideModal, setGlobalModalState, globalModalState } = usePopup();
	const style = {
		width: `${width}px` || "auto",
		height: `${height}px` || "auto",
		maxWidth: `${maxWidth}px` || "80vw",
		maxHeight: `${maxHeight}px` || "80vw"
	};

	useOnClickOutside(backRef, () => {
		if (!globalLoading && !datePicker && globalModalState.staticBackdrop !== true) {
			hideModal();
			setGlobalModalState({});
		}
	});

	return (
		<Backdrop>
			<div
				style={style}
				ref={backRef}
				className="flex flex-col bg-[#181A1A] rounded-[20px] max-h-screen overflow-y-auto m-10">
				{children}
			</div>
		</Backdrop>
	);
}

export default MainPopup;
